import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './ui'

export const RUTAS = [
  { to: '/modulo/1', num: '', label: 'Módulo 1' },
  { to: '/modulo/2', num: '', label: 'Módulo 2' },
  { to: '/modulo/3', num: '', label: 'Módulo 3' },
  { to: '/calculadora', num: '', label: 'Calculadora' },
  { to: '/acerca', num: '', label: 'Acerca' },
]

export function Layout() {
  const { alternar } = useTheme()
  const [abierto, setAbierto] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setAbierto(false); window.scrollTo({ top: 0 }) }, [pathname])

  return (
    <>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <header className="nav">
        <div className="wrap" style={{ position: 'relative' }}>
          <Link to="/" className="brand">
            <span className="brand-mark">{Icon.bolt}</span>
            <span>Ohmnia</span>
          </Link>
          <button type="button" className="icon-btn menu-btn" aria-label="Abrir menú" aria-expanded={abierto} onClick={() => setAbierto(!abierto)}>{Icon.menu}</button>
          <nav className={`nav-links${abierto ? ' open' : ''}`} aria-label="Principal">
            {RUTAS.map((r) => (
              <NavLink key={r.to} to={r.to}>{r.num && <span className="num">{r.num}</span>}{r.label}</NavLink>
            ))}
          </nav>
          <button type="button" className="icon-btn" aria-label="Cambiar tema claro u oscuro" onClick={alternar}>
            <span className="theme-icon">{Icon.moon}</span>
          </button>
        </div>
      </header>
      <main id="contenido"><Outlet /></main>
      <footer>
        <div className="wrap">
          <span><b>Laboratorio Virtual</b> · Proyecto final de Física II</span>
          <span>k = 9 × 10⁹ N·m²/C² · ε₀ = 8.85 × 10⁻¹² C²/(N·m²)</span>
        </div>
      </footer>
    </>
  )
}

