import { Link } from 'react-router-dom'
import { NetworkCalculator } from '../components/NetworkCalculator'
import { Formula } from '../components/ui'
import { EJEMPLOS_OHM } from './TemaPage'

export default function CalculadoraPage() {
  return (
    <>
      <div className="band"><div className="wrap topic-band">
        <div className="topic-hero">
          <nav className="crumbs" aria-label="Ruta"><Link to="/">Inicio</Link><span>/</span><Link to="/modulo/3">Módulo 3</Link><span>/</span><span>Calculadora</span></nav>
          <div className="eyebrow" style={{ '--dot': 'var(--teal)' } as import('react').CSSProperties}>Calculadora propia · Corriente eléctrica y Ley de Ohm</div>
          <h1>Calculadora de circuitos</h1>
          <p className="lead">Resuelve circuitos de resistencias en serie o en paralelo. Valida tus datos, muestra el procedimiento con fórmulas, verifica el resultado y grafica la curva V–I.</p>
        </div>
      </div></div>
      <div className="wrap panel">
        <div className="grid-2 calc-layout">
          <div className="theory">
            <div>
              <h2>Cómo usarla</h2>
              <ol className="numbered">
                <li>Elige si las resistencias están en serie o en paralelo.</li>
                <li>Escribe el valor de cada resistencia y su unidad (Ω, kΩ o MΩ). Puedes tener de 2 a 6.</li>
                <li>Escribe el voltaje de la fuente.</li>
                <li>Revisa los resultados, la tabla por elemento, el procedimiento y la gráfica.</li>
              </ol>
            </div>
            <Formula tex="V=I\,R" nota="Ley de Ohm" />
            <Formula tex="R_e=\sum R_i\qquad \frac{1}{R_e}=\sum\frac{1}{R_i}" nota="Serie (izquierda) y paralelo (derecha)" />
            <Formula tex="P=I^2R" nota="Potencia disipada en cada resistencia" />
            <div className="callout"><b>Cómo leer la gráfica.</b> Cada recta es V = R·I: su pendiente es la resistencia. Cuanto más inclinada, mayor resistencia. El punto marca el voltaje y la corriente total del circuito.</div>
            <Link to="/tema/ley-de-ohm" className="btn">Repasar el tema y sus ejercicios</Link>
          </div>
          <NetworkCalculator tipo="R" ejemplos={EJEMPLOS_OHM} />
        </div>
      </div>
    </>
  )
}
