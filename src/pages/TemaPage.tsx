import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NetworkCalculator, type Ejemplo } from '../components/NetworkCalculator'
import { Formula, Tex } from '../components/ui'
import { MODULOS, TEMAS, temaPorSlug, type Ejercicio, type Tema } from '../data/temas'
import NoEncontrada from './NoEncontrada'

export const EJEMPLOS_OHM: Ejemplo[] = [
  { nombre: 'Ejemplo del curso', conexion: 'paralelo', valores: [['500', 0], ['700', 0]], voltaje: '12' },
  { nombre: 'Focos en casa (120 V)', conexion: 'paralelo', valores: [['240', 0], ['240', 0], ['144', 0]], voltaje: '120' },
  { nombre: 'Serie de 3', conexion: 'serie', valores: [['10', 0], ['22', 0], ['47', 0]], voltaje: '9' },
]

type Pestana = 'explicacion' | 'ejercicios' | 'herramientas' | 'calculadora'

export default function TemaPage() {
  const { slug } = useParams()
  const tema = temaPorSlug(slug)
  if (!tema) return <NoEncontrada />
  return <TemaContenido key={tema.slug} tema={tema} />
}

function TemaContenido({ tema }: { tema: Tema }) {
  const [tab, setTab] = useState<Pestana>('explicacion')
  const mod = MODULOS[tema.modulo - 1]
  const i = TEMAS.indexOf(tema)
  const anterior = TEMAS[i - 1], siguiente = TEMAS[i + 1]
  const pestanas: { id: Pestana; label: string }[] = [
    { id: 'explicacion', label: 'Explicación' },
    { id: 'ejercicios', label: `Ejercicios (${tema.ejercicios.length})` },
    { id: 'herramientas', label: `Herramientas (${tema.herramientas.length})` },
    ...(tema.calculadora ? [{ id: 'calculadora' as const, label: 'Calculadora' }] : []),
  ]

  return (
    <>
      <div className="band"><div className="wrap topic-band">
        <div className="topic-hero">
          <nav className="crumbs" aria-label="Ruta">
            <Link to="/">Inicio</Link><span>/</span><Link to={`/modulo/${mod.n}`}>Módulo {mod.n}</Link><span>/</span><span>{tema.titulo}</span>
          </nav>
          <div className="eyebrow" style={{ '--dot': mod.color } as import('react').CSSProperties}>Módulo {mod.n} · {mod.nombre}</div>
          <h1>{tema.titulo}</h1>
          <p className="lead">{tema.resumen}</p>
        </div>
        <div className="tabs" role="tablist" aria-label="Secciones del tema">
          {pestanas.map((p) => (
            <button key={p.id} role="tab" aria-selected={tab === p.id} onClick={() => setTab(p.id)}>{p.label}</button>
          ))}
        </div>
      </div></div>

      <div className="wrap panel" role="tabpanel">
        {tab === 'explicacion' && <Explicacion tema={tema} irA={setTab} />}
        {tab === 'ejercicios' && <Ejercicios tema={tema} />}
        {tab === 'herramientas' && <Herramientas tema={tema} />}
        {tab === 'calculadora' && (
          <div className="calc-wrap"><NetworkCalculator tipo="R" ejemplos={EJEMPLOS_OHM} /></div>
        )}

        <nav className="pager" aria-label="Otros temas">
          {anterior ? <Link to={`/tema/${anterior.slug}`} className="pager-link"><small>← Tema anterior</small><b>{anterior.titulo}</b></Link> : <span />}
          {siguiente ? <Link to={`/tema/${siguiente.slug}`} className="pager-link next"><small>Tema siguiente →</small><b>{siguiente.titulo}</b></Link> : <span />}
        </nav>
      </div>
    </>
  )
}

function Explicacion({ tema, irA }: { tema: Tema; irA: (p: Pestana) => void }) {
  return (
    <div className="grid-2">
      <div className="theory">
        <div>
          <h2>¿De qué trata?</h2>
          <div className="prose">{tema.descripcion.map((p, i) => <p key={i}>{p}</p>)}</div>
        </div>
        <div>
          <h2>Conceptos clave</h2>
          <ul className="checklist">{tema.conceptos.map((c, i) => <li key={i}>{c}</li>)}</ul>
        </div>
      </div>
      <div className="theory">
        <div>
          <h2>Fórmulas</h2>
          <div className="stack-col">{tema.formulas.map((f, i) => <Formula key={i} tex={f.tex} nota={f.nota} />)}</div>
        </div>
        <div className="steps-card">
          <h2>Pasos para resolver ejercicios</h2>
          <ol className="numbered">{tema.pasos.map((p, i) => <li key={i}>{p}</li>)}</ol>
        </div>
        <div className="callout"><b>Ojo.</b> {tema.ojo}</div>
        <div className="row">
          <button type="button" className="btn primary" onClick={() => irA('ejercicios')}>Ver los 3 ejercicios resueltos</button>
          {tema.calculadora && <button type="button" className="btn" onClick={() => irA('calculadora')}>Abrir calculadora</button>}
        </div>
      </div>
    </div>
  )
}

function Ejercicios({ tema }: { tema: Tema }) {
  return (
    <div className="exercises">
      <p className="muted intro-line">Intenta resolver cada ejercicio por tu cuenta antes de abrir la solución. Los marcados como <b>diapositivas</b> salen del material del curso; los de <b>apoyo</b> complementan el tema.</p>
      {tema.ejercicios.map((e, i) => <EjercicioCard key={i} n={i + 1} e={e} />)}
    </div>
  )
}

function EjercicioCard({ n, e }: { n: number; e: Ejercicio }) {
  const [abierto, setAbierto] = useState(false)
  return (
    <article className="exercise">
      <header>
        <span className="num">{n}</span>
        <div>
          <span className={`pill ${e.fuente === 'diapositivas' ? 'att' : 'ok'}`}>{e.fuente === 'diapositivas' ? 'De las diapositivas' : 'Ejercicio de apoyo'}</span>
          <h3>{e.titulo}</h3>
        </div>
      </header>
      <p className="enunciado">{e.enunciado}</p>
      <button type="button" className="btn sm" aria-expanded={abierto} onClick={() => setAbierto(!abierto)}>
        {abierto ? 'Ocultar solución' : 'Ver solución paso a paso'}
      </button>
      {abierto && (
        <div className="solucion">
          <ol>
            {e.pasos.map((p, i) => (
              <li key={i}><div>{p.texto}</div>{p.tex && <Tex block>{p.tex}</Tex>}</li>
            ))}
          </ol>
          <div className="respuesta"><span>Respuesta</span><b>{e.respuesta}</b></div>
        </div>
      )}
    </article>
  )
}

function Herramientas({ tema }: { tema: Tema }) {
  return (
    <div>
      <p className="muted intro-line">{tema.herramientas.length} herramientas gratuitas recomendadas para practicar y resolver ejercicios de este tema.</p>
      <div className="tools">
        {tema.herramientas.map((h) => {
          const interna = h.url.startsWith('#/')
          const contenido = (
            <>
              <span className="pill att">{h.tipo}</span>
              <h3>{h.nombre}</h3>
              <p>{h.descripcion}</p>
              <span className="go">{interna ? 'Abrir aquí →' : 'Abrir herramienta ↗'}</span>
            </>
          )
          return interna
            ? <Link key={h.nombre} to={h.url.slice(1)} className="tool">{contenido}</Link>
            : <a key={h.nombre} href={h.url} target="_blank" rel="noopener noreferrer" className="tool">{contenido}</a>
        })}
      </div>
    </div>
  )
}
