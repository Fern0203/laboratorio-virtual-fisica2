import {
  Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Tooltip, type ChartDataset, type ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { usePalette } from '../hooks/usePalette'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

export interface Serie {
  label: string
  puntos: { x: number; y: number }[]
  color: string
  estilo?: 'principal' | 'secundaria' | 'punto'
}

interface Props {
  series: Serie[]
  ejeX: string
  ejeY: string
  fmtX: (v: number) => string
  fmtY: (v: number) => string
  maxX?: number
  maxY?: number
  ariaLabel: string
}

/** Gráfica X-Y (lineal) que respeta los colores del tema claro/oscuro. */
export function XYChart({ series, ejeX, ejeY, fmtX, fmtY, maxX, maxY, ariaLabel }: Props) {
  const p = usePalette()
  const datasets: ChartDataset<'line', { x: number; y: number }[]>[] = series.map((s) => {
    const base = { label: s.label, data: s.puntos, borderColor: s.color, backgroundColor: s.color, tension: 0 }
    if (s.estilo === 'punto') return { ...base, showLine: false, pointRadius: 7, pointHoverRadius: 9, pointBorderColor: p.surface, pointBorderWidth: 2 }
    if (s.estilo === 'secundaria') return { ...base, borderWidth: 1.6, borderDash: [6, 4], pointRadius: 0 }
    return { ...base, borderWidth: 3, pointRadius: 0, fill: 'origin', backgroundColor: s.color + '1f' }
  })
  const options: ChartOptions<'line'> = {
    responsive: true, maintainAspectRatio: false, animation: false, parsing: false,
    interaction: { mode: 'nearest', intersect: false },
    plugins: {
      legend: { position: 'bottom', labels: { color: p.ink, boxWidth: 14, boxHeight: 3, padding: 14, font: { family: 'Inter', size: 12 } } },
      tooltip: { backgroundColor: '#020520', padding: 10, cornerRadius: 8, titleFont: { family: 'Inter' }, bodyFont: { family: 'Roboto Mono' }, callbacks: { label: (c) => `${c.dataset.label}: (${fmtX(c.parsed.x)}, ${fmtY(c.parsed.y)})` } },
    },
    scales: {
      x: { type: 'linear', min: 0, max: maxX, title: { display: true, text: ejeX, color: p.muted }, ticks: { color: p.muted, maxTicksLimit: 7, callback: (v) => fmtX(Number(v)) }, grid: { color: p.line } },
      y: { type: 'linear', min: 0, max: maxY, title: { display: true, text: ejeY, color: p.muted }, ticks: { color: p.muted, maxTicksLimit: 7, callback: (v) => fmtY(Number(v)) }, grid: { color: p.line } },
    },
  }
  return (
    <div className="chart-box" role="img" aria-label={ariaLabel}>
      <Line data={{ datasets }} options={options} />
    </div>
  )
}
