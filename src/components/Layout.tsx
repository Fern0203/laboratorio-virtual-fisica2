import React, { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './ui'

export const RUTAS = [
  { to: '/coulomb', num: '01', label: 'Ley de Coulomb' },
  { to: '/capacitores', num: '02', label: 'Capacitores' },
  { to: '/circuitos', num: '03', label: 'Ley de Ohm' },
  { to: '/acerca', num: '', label: 'Acerca del proyecto' },
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
            <span>Laboratorio Virtual <span className="muted" style={{ fontWeight: 500 }}>· Física II</span></span>
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

/** Plantilla común de las páginas de cada módulo: encabezado + pestañas. */
export function TopicPage({ modulo, titulo, intro, laboratorio, repaso, dot = 'var(--accent)' }: {
  dot?: string; modulo: string; titulo: string; intro: string; laboratorio: ReactNode; repaso: ReactNode
}) {
  const [tab, setTab] = useState<'lab' | 'quiz'>('lab')
  return (
    <>
    <div className="band"><div className="wrap topic-band">
      <div className="topic-hero">
        <nav className="crumbs" aria-label="Ruta"><Link to="/">Inicio</Link><span>/</span><span>{modulo}</span></nav>
        <div className="eyebrow" style={{ '--dot': dot } as React.CSSProperties}>{modulo}</div>
        <h1>{titulo}</h1>
        <p className="lead">{intro}</p>
      </div>
      <div className="tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'lab'} onClick={() => setTab('lab')}>Teoría y calculadora</button>
        <button role="tab" aria-selected={tab === 'quiz'} onClick={() => setTab('quiz')}>Pon a prueba lo aprendido</button>
      </div>
    </div></div>
    <div className="wrap panel" role="tabpanel">{tab === 'lab' ? <div className="grid-2">{laboratorio}</div> : repaso}</div>
    </>
  )
}
