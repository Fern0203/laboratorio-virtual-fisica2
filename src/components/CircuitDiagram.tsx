import { usePalette } from '../hooks/usePalette'
import { si } from '../lib/format'
import type { Conexion } from '../lib/physics'

interface Props {
  tipo: 'C' | 'R'
  conexion: Conexion
  valores: number[]
  /** Voltaje de la fuente en V (solo para la etiqueta) */
  voltaje?: number
}

/** Esquema del circuito dibujado en SVG a partir de los datos de la calculadora. */
export function CircuitDiagram({ tipo, conexion, valores, voltaje }: Props) {
  const p = usePalette()
  const unidad = tipo === 'C' ? 'F' : 'Ω'
  const n = valores.length

  const Elemento = () =>
    tipo === 'R' ? (
      <path d="M-26 0H-16l3-8 6 16 6-16 6 16 6-16 3 8H26" fill="none" stroke={p.copper} strokeWidth={2.4} strokeLinejoin="round" />
    ) : (
      <>
        <path d="M-26 0H-5M5 0H26" stroke={p.ink} strokeWidth={2} />
        <path d="M-5 -14V14M5 -14V14" stroke={p.copper} strokeWidth={3.2} />
      </>
    )
  const Bateria = () => (
    <>
      <path d="M-26 0H-5M5 0H26" stroke={p.ink} strokeWidth={2} />
      <path d="M-5 -15V15" stroke={p.pos} strokeWidth={2.6} />
      <path d="M5 -8V8" stroke={p.neg} strokeWidth={4.5} />
    </>
  )
  const Txt = ({ x, y, children, anchor = 'middle', bold = false }: { x: number; y: number; children: string; anchor?: 'start' | 'middle' | 'end'; bold?: boolean }) => (
    <text x={x} y={y} textAnchor={anchor} fontFamily="Roboto Mono, monospace" fontSize={12} fontWeight={bold ? 600 : 400} fill={bold ? p.ink : p.muted}>{children}</text>
  )
  const etiquetaV = voltaje ? `V = ${si(voltaje, 'V')}` : 'V'

  if (conexion === 'serie') {
    const paso = 100, W = Math.max(340, 90 + n * paso), H = 180, top = 50, bot = 145, x0 = (W - n * paso) / 2
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={`Esquema de ${n} elementos en serie`}>
        <path d={`M30 ${top}H${W - 30}V${bot}H30Z`} fill="none" stroke={p.ink} strokeWidth={2} />
        {valores.map((v, i) => {
          const cx = x0 + paso * i + paso / 2
          return (
            <g key={i}>
              <rect x={cx - 28} y={top - 18} width={56} height={36} fill={p.paper} />
              <g transform={`translate(${cx} ${top})`}><Elemento /></g>
              <Txt x={cx} y={top - 24} bold>{`${tipo}${i + 1}`}</Txt>
              <Txt x={cx} y={top + 34}>{si(v, unidad)}</Txt>
            </g>
          )
        })}
        <rect x={W / 2 - 28} y={bot - 18} width={56} height={36} fill={p.paper} />
        <g transform={`translate(${W / 2} ${bot})`}><Bateria /></g>
        <Txt x={W / 2} y={bot + 30} bold>{etiquetaV}</Txt>
      </svg>
    )
  }

  const paso = 104, x0 = 60, top = 30, bot = 180, mid = (top + bot) / 2
  const xUlt = x0 + 70 + paso * (n - 1), W = Math.max(340, xUlt + 110), H = 210
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={`Esquema de ${n} elementos en paralelo`}>
      <path d={`M${x0} ${top}H${xUlt}M${x0} ${bot}H${xUlt}M${x0} ${top}V${bot}`} fill="none" stroke={p.ink} strokeWidth={2} />
      <rect x={x0 - 18} y={mid - 28} width={36} height={56} fill={p.paper} />
      <g transform={`translate(${x0} ${mid}) rotate(-90)`}><Bateria /></g>
      <Txt x={x0 - 22} y={mid + 4} anchor="end" bold>V</Txt>
      {valores.map((v, i) => {
        const x = x0 + 70 + paso * i
        return (
          <g key={i}>
            <path d={`M${x} ${top}V${bot}`} stroke={p.ink} strokeWidth={2} />
            <rect x={x - 18} y={mid - 28} width={36} height={56} fill={p.paper} />
            <g transform={`translate(${x} ${mid}) rotate(90)`}><Elemento /></g>
            <Txt x={x + 20} y={mid - 4} anchor="start" bold>{`${tipo}${i + 1}`}</Txt>
            <Txt x={x + 20} y={mid + 12} anchor="start">{si(v, unidad)}</Txt>
            <circle cx={x} cy={top} r={3.5} fill={p.ink} />
            <circle cx={x} cy={bot} r={3.5} fill={p.ink} />
          </g>
        )
      })}
    </svg>
  )
}
