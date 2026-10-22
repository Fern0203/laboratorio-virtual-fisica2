/** Formato de números para mostrar resultados físicos. */

const PREFIJOS: Record<number, string> = { [-12]: 'p', [-9]: 'n', [-6]: 'µ', [-3]: 'm', 0: '', 3: 'k', 6: 'M', 9: 'G' }

/** Redondea a 4 cifras significativas y quita ceros sobrantes. */
export function redondear(x: number, cifras = 4): string {
  return parseFloat(x.toPrecision(cifras)).toString()
}

/** Formato con prefijo del SI: 0.00016 C → "160 µC" */
export function si(valor: number, unidad: string): string {
  if (!Number.isFinite(valor)) return '—'
  if (valor === 0) return `0 ${unidad}`
  let e = Math.floor(Math.log10(Math.abs(valor)) / 3) * 3
  e = Math.max(-12, Math.min(9, e))
  return `${redondear(valor / 10 ** e)} ${PREFIJOS[e]}${unidad}`
}

const SUP: Record<string, string> = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }

/** Notación científica legible: 0.00016 → "1.6 × 10⁻⁴" */
export function cientifica(valor: number): string {
  if (valor === 0) return '0'
  if (!Number.isFinite(valor)) return '—'
  const e = Math.floor(Math.log10(Math.abs(valor)))
  if (e >= -2 && e <= 3) return redondear(valor)
  const m = valor / 10 ** e
  return `${redondear(m)} × 10${String(e).split('').map((c) => SUP[c]).join('')}`
}

/** Notación científica en LaTeX: 0.00016 → "1.6\\times10^{-4}" */
export function texNum(valor: number): string {
  if (valor === 0) return '0'
  const e = Math.floor(Math.log10(Math.abs(valor)))
  if (e >= -2 && e <= 3) return redondear(valor)
  return `${redondear(valor / 10 ** e)}\\times10^{${e}}`
}
