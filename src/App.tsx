import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import HomePage from './pages/HomePage'
import NoEncontrada from './pages/NoEncontrada'

// Cada página se carga solo cuando se visita (code splitting)
const TemaPage = lazy(() => import('./pages/TemaPage'))
const ModuloPage = lazy(() => import('./pages/ModuloPage'))
const CalculadoraPage = lazy(() => import('./pages/CalculadoraPage'))
const AcercaPage = lazy(() => import('./pages/AcercaPage'))

const Cargando = () => <div className="wrap" style={{ paddingBlock: 60 }}><p className="muted">Cargando…</p></div>

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Cargando />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="tema/:slug" element={<TemaPage />} />
            <Route path="modulo/:n" element={<ModuloPage />} />
            <Route path="calculadora" element={<CalculadoraPage />} />
            <Route path="acerca" element={<AcercaPage />} />
            <Route path="*" element={<NoEncontrada />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
