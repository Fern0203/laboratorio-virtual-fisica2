import { Link } from 'react-router-dom'
import { Tex } from '../components/ui'
import { usePalette } from '../hooks/usePalette'

const MODULOS = [
  { to: '/coulomb', dot: 'var(--pos)', tag: 'Módulo 1 · Electrostática', titulo: 'Ley de Coulomb', tex: 'F=k\\frac{|q_1q_2|}{r^2}', texto: 'Fuerza entre dos cargas y campo eléctrico. Simulador con gráfica de F contra r.', cta: 'Abrir simulador', ejemplo: '3 µC y −8 µC a 2 m', valor: '54 mN' },
  { to: '/capacitores', dot: 'var(--copper)', tag: 'Módulo 2 · Potencial y capacitancia', titulo: 'Capacitores', tex: 'C=\\frac{Q}{V}', texto: 'Capacitancia equivalente en serie y paralelo, carga, voltaje y energía. Gráfica de Q contra V.', cta: 'Abrir calculadora', ejemplo: '2 µF + 4 µF en serie, 120 V', valor: '1.333 µF' },
  { to: '/circuitos', dot: 'var(--teal)', tag: 'Módulo 3 · Corriente eléctrica', titulo: 'Ley de Ohm', tex: 'V=IR', texto: 'Resistencia equivalente, corriente, voltajes y potencia de cada elemento. Gráfica de V contra I.', cta: 'Abrir calculadora', ejemplo: '500 Ω ∥ 700 Ω, 12 V', valor: '291.7 Ω' },
]

export default function HomePage() {
  return (
    <>
      <div className="band">
        <section className="wrap hero">
          <span className="badge"><i>II</i>Proyecto final de Física II · Electricidad y magnetismo</span>
          <h1>Experimenta con la <em>electricidad</em> desde tu navegador</h1>
          <p className="lead">Tres temas clave del curso, uno por módulo, con teoría, simulador, calculadoras que validan tus datos, gráficas y preguntas de repaso.</p>
          <div className="hero-actions">
            <Link to="/coulomb" className="btn primary">Empezar por el Módulo 1</Link>
            <Link to="/acerca" className="btn">Cómo se hizo</Link>
          </div>
        </section>
        <div style={{ height: 40 }} />
      </div>

      <div className="wrap showcase">
        <div className="showcase-card">
          <div className="showcase-pane">
            <div className="pane-title">Líneas de campo de un dipolo <span>F = k|q₁q₂|/r²</span></div>
            <FieldLines />
          </div>
          <div className="showcase-pane">
            <div className="pane-title">Ejemplos del curso, ya resueltos <span>3 módulos</span></div>
            <div className="mini-list">
              {MODULOS.map((m) => (
                <Link key={m.to} to={m.to} className="mini">
                  <div><b><i className="dot" style={{ background: m.dot }} />{m.titulo}</b><small>{m.ejemplo}</small></div>
                  <span className="val">{m.valor}</span>
                </Link>
              ))}
            </div>
            <div className="stats">
              <div><b>3</b><span>calculadoras</span></div>
              <div><b>15</b><span>preguntas</span></div>
              <div><b>14</b><span>pruebas</span></div>
            </div>
          </div>
        </div>
      </div>

      <section className="wrap section">
        <div className="section-head">
          <h2>Un tema por módulo</h2>
          <p>Elegimos el tema que sostiene a los demás en cada módulo del curso. Cada uno trae su propia herramienta interactiva.</p>
        </div>
        <div className="modules">
          {MODULOS.map((m) => (
            <Link key={m.to} to={m.to} className="module-card">
              <span className="tag"><i className="dot" style={{ background: m.dot }} />{m.tag}</span>
              <h3>{m.titulo}</h3>
              <span className="formula-chip"><Tex>{m.tex}</Tex></span>
              <p>{m.texto}</p>
              <span className="go">{m.cta} →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

/** Líneas de campo de un dipolo, calculadas numéricamente con la Ley de Coulomb. */
function FieldLines() {
  const p = usePalette()
  const W = 460, H = 280
  const cargas = [{ x: 150, y: 140, q: 1 }, { x: 310, y: 140, q: -1 }]
  const lineas: string[] = []
  const N = 16
  for (let k = 0; k < N; k++) {
    const a = (2 * Math.PI * k) / N
    let x = cargas[0].x + 10 * Math.cos(a), y = cargas[0].y + 10 * Math.sin(a)
    let d = `M${x.toFixed(1)} ${y.toFixed(1)}`
    for (let s = 0; s < 900; s++) {
      let ex = 0, ey = 0
      for (const c of cargas) { const dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy, r3 = r2 * Math.sqrt(r2); ex += (c.q * dx) / r3; ey += (c.q * dy) / r3 }
      const m = Math.hypot(ex, ey); x += (ex / m) * 2.5; y += (ey / m) * 2.5
      d += `L${x.toFixed(1)} ${y.toFixed(1)}`
      if (Math.hypot(x - cargas[1].x, y - cargas[1].y) < 10 || x < -40 || x > W + 40 || y < -40 || y > H + 40) break
    }
    lineas.push(d)
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Líneas de campo eléctrico entre una carga positiva y una negativa">
      {lineas.map((d, i) => <path key={i} d={d} fill="none" stroke={p.accent} strokeOpacity={0.45} strokeWidth={1.5} />)}
      {cargas.map((c) => (
        <g key={c.x}>
          <circle cx={c.x} cy={c.y} r={20} fill={c.q > 0 ? p.pos : p.neg} />
          <text x={c.x} y={c.y + 8} textAnchor="middle" fontSize={24} fontWeight={600} fill="#fff">{c.q > 0 ? '+' : '−'}</text>
        </g>
      ))}
    </svg>
  )
}
