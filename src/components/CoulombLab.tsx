import { useMemo } from 'react'
import { useMeasure } from '../hooks/useMeasure'
import { usePalette } from '../hooks/usePalette'
import { cientifica, redondear, si, texNum } from '../lib/format'
import { casiIgual, coulomb, fuerzaCoulomb } from '../lib/physics'
import { Check, CopyButton, MeasureField, Stat, Steps, type Paso } from './ui'
import { XYChart } from './XYChart'

/** Simulador + calculadora de la Ley de Coulomb. */
export function CoulombLab() {
  const p = usePalette()
  const q1 = useMeasure('3', 'carga', { maxAbs: 1e9 })
  const q2 = useMeasure('-8', 'carga', { maxAbs: 1e9 })
  const r = useMeasure('2', 'distancia', { positivo: true, maxAbs: 1e9 })

  const errores = [
    ...(q1.validacion.ok ? [] : [`q₁: ${q1.validacion.error}`]),
    ...(q2.validacion.ok ? [] : [`q₂: ${q2.validacion.error}`]),
    ...(r.validacion.ok ? [] : [`r: ${r.validacion.error}`]),
  ]
  const valido = errores.length === 0
  const res = useMemo(() => (valido ? coulomb(q1.valorSI, q2.valorSI, r.valorSI) : null), [valido, q1.valorSI, q2.valorSI, r.valorSI])

  const ejemplo = (a: string, b: string, d: string, ud = 0) => { q1.setTexto(a); q1.setUnidad(0); q2.setTexto(b); q2.setUnidad(0); r.setTexto(d); r.setUnidad(ud) }

  const rNum = r.validacion.ok ? r.validacion.valor : 1
  const sliderMax = Math.max(5, Math.ceil(rNum * 2))

  const pasos: Paso[] = res ? [
    { texto: 'Convertimos los datos a unidades del SI:', tex: `q_1=${texNum(q1.valorSI)}\\,\\text{C},\\; q_2=${texNum(q2.valorSI)}\\,\\text{C},\\; r=${texNum(r.valorSI)}\\,\\text{m}` },
    { texto: 'Escribimos la Ley de Coulomb:', tex: 'F=k\\,\\frac{|q_1q_2|}{r^2}' },
    { texto: 'Sustituimos con k = 9 × 10⁹ N·m²/C²:', tex: `F=(9\\times10^{9})\\frac{|(${texNum(q1.valorSI)})(${texNum(q2.valorSI)})|}{(${texNum(r.valorSI)})^2}=${texNum(res.fuerza)}\\,\\text{N}` },
    { texto: res.tipo === 'repulsion' ? 'Las cargas tienen el mismo signo, por eso la fuerza es de repulsión.' : res.tipo === 'atraccion' ? 'Las cargas tienen signos opuestos, por eso la fuerza es de atracción.' : 'Una de las cargas es cero: no hay fuerza.' },
    { texto: 'Campo eléctrico que produce q₁ en el lugar donde está q₂:', tex: `E=k\\frac{|q_1|}{r^2}=${texNum(res.campoQ1)}\\,\\text{N/C}` },
    { texto: <>Comprobación con F = |q₂|·E. <Check ok={casiIgual(Math.abs(q2.valorSI) * res.campoQ1, res.fuerza)} /></>, tex: `|q_2|E=${texNum(Math.abs(q2.valorSI) * res.campoQ1)}\\,\\text{N}` },
  ] : []

  const curva = useMemo(() => {
    if (!res) return []
    const R = r.valorSI, pts = []
    for (let i = 0; i <= 120; i++) { const x = R * 0.3 + (R * 2.7 * i) / 120; pts.push({ x, y: fuerzaCoulomb(q1.valorSI, q2.valorSI, x) }) }
    return pts
  }, [res, q1.valorSI, q2.valorSI, r.valorSI])

  return (
    <div className="lab">
      <div className="lab-head">
        <div><div className="eyebrow">Simulador y calculadora</div><h2>Fuerza entre dos cargas</h2></div>
        <div className="row">
          <button type="button" className="btn ghost sm" onClick={() => ejemplo('3', '-8', '2')}>Ejemplo del curso</button>
          <button type="button" className="btn ghost sm" onClick={() => ejemplo('3', '3', '10', 1)}>Cargas iguales</button>
        </div>
      </div>
      <div className="fields">
        <MeasureField label="Carga q₁" m={q1} />
        <MeasureField label="Carga q₂" m={q2} />
        <MeasureField label="Distancia r" m={r} />
      </div>
      <div className="field">
        <label htmlFor="r-slider">Mueve la distancia: <b style={{ fontFamily: 'var(--f-mono)' }}>{redondear(rNum)} {r.simbolo}</b></label>
        <input id="r-slider" type="range" min={0.1} max={sliderMax} step={0.05} value={rNum} onChange={(e) => r.setTexto(e.target.value)} />
      </div>

      {!valido && <div className="alert" role="alert"><b>Revisa los datos:</b> {errores.join(' · ')}</div>}

      {res && (
        <>
          <div className="figure"><ChargesDiagram q1={q1.valorSI} q2={q2.valorSI} r={r.valorSI} fraccion={rNum / sliderMax} fuerza={res.fuerza} p={p} /></div>
          <div className="results">
            <Stat main label="Fuerza F" value={si(res.fuerza, 'N')} />
            <Stat label="Tipo de fuerza" value={<span className={`pill ${res.tipo === 'repulsion' ? 'rep' : res.tipo === 'atraccion' ? 'att' : 'ok'}`}>{res.tipo === 'repulsion' ? 'Repulsión' : res.tipo === 'atraccion' ? 'Atracción' : 'Sin fuerza'}</span>} />
            <Stat label="Campo de q₁ en q₂" value={si(res.campoQ1, 'N/C')} />
          </div>
          <Steps pasos={pasos} />
          <XYChart
            ariaLabel="Gráfica de fuerza contra distancia" ejeX="Distancia r" ejeY="Fuerza F"
            fmtX={(v) => si(v, 'm')} fmtY={(v) => si(v, 'N')}
            series={[
              { label: 'F = k|q₁q₂|/r²', puntos: curva, color: p.accent, estilo: 'principal' },
              { label: 'Valor actual', puntos: [{ x: r.valorSI, y: res.fuerza }], color: p.copper, estilo: 'punto' },
            ]}
          />
          <p className="caption">La curva muestra cómo cambia F cuando solo varías r: al duplicar la distancia, la fuerza baja a la cuarta parte.</p>
          <div className="row"><CopyButton texto={() => `q₁ = ${si(q1.valorSI, 'C')}, q₂ = ${si(q2.valorSI, 'C')}, r = ${si(r.valorSI, 'm')}\nF = ${cientifica(res.fuerza)} N (${res.tipo})\nE de q₁ en q₂ = ${cientifica(res.campoQ1)} N/C`} /></div>
        </>
      )}
    </div>
  )
}

function ChargesDiagram({ q1, q2, r, fraccion, fuerza, p }: { q1: number; q2: number; r: number; fraccion: number; fuerza: number; p: ReturnType<typeof usePalette> }) {
  const W = 620, H = 170, y = 82
  const gap = 70 + (W - 230) * Math.min(1, Math.max(0, fraccion))
  const x1 = (W - gap) / 2, x2 = x1 + gap
  const rep = q1 * q2 > 0, nula = q1 * q2 === 0
  const len = nula ? 0 : Math.max(16, Math.min(64, 14 + 7 * Math.log10(fuerza / 1e-9 + 1)))
  const color = (q: number) => (q > 0 ? p.pos : q < 0 ? p.neg : p.muted)
  const Flecha = ({ x, dir }: { x: number; dir: number }) => (
    <g>
      <line x1={x} y1={y} x2={x + dir * len} y2={y} stroke={p.accent} strokeWidth={3.5} />
      <path d={`M${x + dir * (len + 12)} ${y}L${x + dir * len} ${y - 7}L${x + dir * len} ${y + 7}Z`} fill={p.accent} />
    </g>
  )
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`Dos cargas separadas ${si(r, 'm')}; ${nula ? 'sin fuerza' : rep ? 'se repelen' : 'se atraen'}`}>
      <text x={14} y={22} fontFamily="Inter, sans-serif" fontWeight={600} fontSize={13} fill={p.accent}>{nula ? 'Sin fuerza' : rep ? 'Se repelen' : 'Se atraen'}</text>
      <line x1={x1} y1={y + 46} x2={x2} y2={y + 46} stroke={p.muted} strokeDasharray="4 4" />
      <text x={(x1 + x2) / 2} y={y + 64} textAnchor="middle" fontFamily="Roboto Mono, monospace" fontSize={12} fill={p.muted}>r = {si(r, 'm')}</text>
      {!nula && <><Flecha x={x1 + (rep ? -26 : 26)} dir={rep ? -1 : 1} /><Flecha x={x2 + (rep ? 26 : -26)} dir={rep ? 1 : -1} /></>}
      {[[x1, q1, 'q₁'], [x2, q2, 'q₂']].map(([x, q, lab]) => (
        <g key={lab as string}>
          <circle cx={x as number} cy={y} r={22} fill={color(q as number)} />
          <text x={x as number} y={y + 8} textAnchor="middle" fontSize={24} fontWeight={600} fill="#fff">{(q as number) > 0 ? '+' : (q as number) < 0 ? '−' : '0'}</text>
          <text x={x as number} y={y - 32} textAnchor="middle" fontFamily="Roboto Mono, monospace" fontSize={12} fill={p.ink}>{lab as string} = {si(q as number, 'C')}</text>
        </g>
      ))}
    </svg>
  )
}
