import { Link } from 'react-router-dom'
import { MODULOS, type Tema } from '../data/temas'

/** Tarjeta de un tema para listados (inicio, módulo, resultados de búsqueda). */
export function TopicCard({ tema }: { tema: Tema }) {
  const mod = MODULOS[tema.modulo - 1]
  return (
    <Link to={`/tema/${tema.slug}`} className="topic-card">
      <span className="tag"><i className="dot" style={{ background: mod.color }} />Módulo {tema.modulo} · {mod.nombre}</span>
      <h3>{tema.titulo}</h3>
      <p>{tema.resumen}</p>
      <div className="chips">
        <span className="chip">3 ejercicios</span>
        <span className="chip">{tema.herramientas.length} herramientas</span>
        {tema.calculadora && <span className="chip accent">Calculadora + gráfica</span>}
      </div>
      <span className="go">Estudiar tema →</span>
    </Link>
  )
}
