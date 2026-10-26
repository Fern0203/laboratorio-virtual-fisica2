import { Link } from 'react-router-dom'

export default function NoEncontrada() {
  return (
    <div className="wrap notfound">
      <div className="eyebrow">Error 404</div>
      <h1>Esta página no existe</h1>
      <p className="muted">Puede que el enlace esté mal escrito. Busca el tema desde el inicio.</p>
      <Link to="/" className="btn primary">Volver al inicio</Link>
    </div>
  )
}
