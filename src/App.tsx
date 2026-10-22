import { lazy, Suspense } from 'react'
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import HomePage from './pages/HomePage'

// Cada módulo se carga solo cuando se visita (code splitting)
const CoulombPage = lazy(() => import('./pages/CoulombPage'))
const CapacitoresPage = lazy(() => import('./pages/CapacitoresPage'))
const CircuitosPage = lazy(() => import('./pages/CircuitosPage'))
const AcercaPage = lazy(() => import('./pages/AcercaPage'))

function NoEncontrada() {
  return (
    <div className="wrap notfound">
      <div className="eyebrow">Error 404</div>
      <h1>Esta página no existe</h1>
      <Link to="/" className="btn">Volver al inicio</Link>
    </div>
  )
}

const Cargando = () => <div className="wrap" style={{ paddingBlock: 60 }}><p className="muted">Cargando…</p></div>

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Cargando />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="coulomb" element={<CoulombPage />} />
            <Route path="capacitores" element={<CapacitoresPage />} />
            <Route path="circuitos" element={<CircuitosPage />} />
            <Route path="acerca" element={<AcercaPage />} />
            <Route path="*" element={<NoEncontrada />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
