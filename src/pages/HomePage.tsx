import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TopicCard } from '../components/TopicCard'
import { buscarTemas, MODULOS, TEMAS } from '../data/temas'

const SUGERENCIAS = ['Coulomb', 'Gauss', 'capacitores', 'Ohm', 'magnético', 'Módulo 2']

export default function HomePage() {
  const [consulta, setConsulta] = useState('')
  const resultados = useMemo(() => buscarTemas(consulta), [consulta])
  const buscando = consulta.trim() !== ''
  const totalEjercicios = TEMAS.reduce((s, t) => s + t.ejercicios.length, 0)

  return (
    <>
      <div className="band">
        <section className="wrap hero">
          <h1>Proyecto Final · <em>Física II</em></h1>
          <p className="lead">Todos los temas del curso explicados paso a paso, con ejercicios resueltos por tema, las mejores herramientas para practicar y una calculadora de circuitos con gráfica.</p>

          <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <label htmlFor="buscador" className="sr-only">Buscar un tema o módulo</label>
            <input
              id="buscador" type="search" autoComplete="off" placeholder="Busca un tema o módulo: Gauss, capacitores, Módulo 3…"
              value={consulta} onChange={(e) => setConsulta(e.target.value)}
            />
            {buscando && <button type="button" className="clear" aria-label="Borrar búsqueda" onClick={() => setConsulta('')}>✕</button>}
          </form>
          <div className="suggest">
            <span>Prueba:</span>
            {SUGERENCIAS.map((s) => <button key={s} type="button" onClick={() => setConsulta(s)}>{s}</button>)}
          </div>

          <div className="hero-stats">
            <div><b>3</b><span>módulos</span></div>
            <div><b>{TEMAS.length}</b><span>temas</span></div>
            <div><b>{totalEjercicios}</b><span>ejercicios resueltos</span></div>
            <div><b>1</b><span>calculadora con gráfica</span></div>
          </div>
        </section>
        <div style={{ height: 32 }} />
      </div>

      <div className="wrap" id="temas">
        {buscando ? (
          <section className="section" aria-live="polite">
            <div className="results-head">
              <h2>{resultados.length === 0 ? 'Sin resultados' : `${resultados.length} ${resultados.length === 1 ? 'tema encontrado' : 'temas encontrados'}`}</h2>
              <p className="muted">para “{consulta}”</p>
            </div>
            {resultados.length === 0 ? (
              <div className="empty">
                <p>No encontramos temas con esa búsqueda. Prueba con otra palabra, por ejemplo <b>campo</b>, <b>potencial</b> o <b>corriente</b>.</p>
                <button type="button" className="btn" onClick={() => setConsulta('')}>Ver todos los temas</button>
              </div>
            ) : (
              <div className="topic-grid">{resultados.map((t) => <TopicCard key={t.slug} tema={t} />)}</div>
            )}
          </section>
        ) : (
          MODULOS.map((m) => (
            <section className="section module-block" key={m.n} aria-labelledby={`mod-${m.n}`}>
              <div className="module-head">
                <div>
                  <span className="tag"><i className="dot" style={{ background: m.color }} />Módulo {m.n}</span>
                  <h2 id={`mod-${m.n}`}>{m.nombre}</h2>
                  <p className="muted">{m.descripcion}</p>
                </div>
                <Link to={`/modulo/${m.n}`} className="btn sm">Ver módulo</Link>
              </div>
              <div className="topic-grid">{TEMAS.filter((t) => t.modulo === m.n).map((t) => <TopicCard key={t.slug} tema={t} />)}</div>
            </section>
          ))
        )}

        <section className="section">
          <Link to="/calculadora" className="calc-banner">
            <div>
              <span className="tag"><i className="dot" style={{ background: 'var(--teal)' }} />Calculadora propia · Módulo 3</span>
              <h2>Calculadora de circuitos con gráfica</h2>
              <p>Ingresa las resistencias y el voltaje: obtén la resistencia equivalente, la corriente, el voltaje y la potencia de cada elemento, con procedimiento paso a paso y gráfica de voltaje contra corriente.</p>
            </div>
            <span className="btn primary">Abrir calculadora →</span>
          </Link>
        </section>
        <div style={{ height: 80 }} />
      </div>
    </>
  )
}
