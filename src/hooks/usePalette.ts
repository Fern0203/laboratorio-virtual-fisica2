import { useEffect, useState } from 'react'

export interface Paleta {
  ink: string; muted: string; paper: string; line: string; accent: string; copper: string
  pos: string; neg: string; ok: string; surface: string; violet: string; gold: string; teal: string
}

function leer(): Paleta {
  const s = getComputedStyle(document.documentElement)
  const v = (n: string) => s.getPropertyValue(`--${n}`).trim()
  return {
    ink: v('ink'), muted: v('muted'), paper: v('paper'), line: v('line'), accent: v('accent'), copper: v('copper'),
    pos: v('pos'), neg: v('neg'), ok: v('ok'), surface: v('surface'), violet: v('violet'), gold: v('gold'), teal: v('teal'),
  }
}

/** Colores actuales del tema (para Chart.js y SVG). Se actualiza al cambiar de tema. */
export function usePalette(): Paleta {
  const [p, setP] = useState<Paleta>(leer)
  useEffect(() => {
    const actualizar = () => requestAnimationFrame(() => setP(leer()))
    const mq = matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', actualizar)
    const obs = new MutationObserver(actualizar)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => { mq.removeEventListener('change', actualizar); obs.disconnect() }
  }, [])
  return p
}

export const coloresSerie = (p: Paleta) => [p.copper, p.ok, p.violet, p.gold, p.teal, p.pos]
