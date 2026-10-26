import { Link, useParams } from 'react-router-dom'
import { TopicCard } from '../components/TopicCard'
import { MODULOS, TEMAS } from '../data/temas'
import NoEncontrada from './NoEncontrada'

export default function ModuloPage() {
  const { n } = useParams()
  const mod = MODULOS.find((m) => String(m.n) === n)
  if (!mod) return <NoEncontrada />
  const temas = TEMAS.filter((t) => t.modulo === mod.n)
  return (
    <>
      <div className="band"><div className="wrap topic-band">
        <div className="topic-hero">
          <nav className="crumbs" aria-label="Ruta"><Link to="/">Inicio</Link><span>/</span><span>Módulo {mod.n}</span></nav>
          <div className="eyebrow" style={{ '--dot': mod.color } as import('react').CSSProperties}>Módulo {mod.n}</div>
          <h1>{mod.nombre}</h1>
          <p className="lead">{mod.descripcion}</p>
        </div>
      </div></div>
      <div className="wrap panel">
        <p className="muted intro-line">{temas.length} temas en este módulo. Cada uno tiene explicación, 3 ejercicios resueltos y herramientas para practicar.</p>
        <div className="topic-grid">{temas.map((t) => <TopicCard key={t.slug} tema={t} />)}</div>
      </div>
    </>
  )
}
