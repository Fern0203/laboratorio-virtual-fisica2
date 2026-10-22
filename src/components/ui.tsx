import katex from 'katex'
import { useId, useMemo, type ReactNode } from 'react'
import { UNIDADES } from '../lib/units'
import type { Measure } from '../hooks/useMeasure'

/* ───────── Fórmulas con KaTeX ───────── */
export function Tex({ children, block = false }: { children: string; block?: boolean }) {
  const html = useMemo(
    () => katex.renderToString(children, { displayMode: block, throwOnError: false, strict: false }),
    [children, block],
  )
  return <span className={block ? 'tex' : undefined} dangerouslySetInnerHTML={{ __html: html }} />
}

export function Formula({ tex, nota }: { tex: string; nota?: ReactNode }) {
  return (
    <div className="formula">
      <Tex block>{tex}</Tex>
      {nota && <small>{nota}</small>}
    </div>
  )
}

/* ───────── Campo numérico con unidad y validación ───────── */
export function MeasureField({ label, m, compact = false }: { label: string; m: Measure; compact?: boolean }) {
  const id = useId()
  const err = m.validacion.ok ? '' : m.validacion.error
  return (
    <div className="field">
      {!compact && <label htmlFor={id}>{label}</label>}
      <div className={`inrow${err ? ' invalid' : ''}`}>
        <input
          id={id} type="text" inputMode="decimal" autoComplete="off" value={m.texto}
          aria-label={compact ? label : undefined} aria-invalid={!!err} aria-describedby={`${id}-h`}
          onChange={(e) => m.setTexto(e.target.value)}
        />
        <select aria-label={`Unidad de ${label}`} value={m.unidad} onChange={(e) => m.setUnidad(Number(e.target.value))}>
          {UNIDADES[m.tipo].map((u, i) => <option key={u.simbolo} value={i}>{u.simbolo}</option>)}
        </select>
      </div>
      <span className="hint" id={`${id}-h`} role={err ? 'alert' : undefined}>{err}</span>
    </div>
  )
}

/* ───────── Resultados ───────── */
export function Stat({ label, value, main = false }: { label: string; value: ReactNode; main?: boolean }) {
  return <div className={`stat${main ? ' main' : ''}`}><span>{label}</span><b>{value}</b></div>
}

export function Check({ ok }: { ok: boolean }) {
  return <span className={`pill ${ok ? 'ok' : 'bad'}`}>{ok ? '✓ Cumple' : '✗ No cumple'}</span>
}

export interface Paso { texto: ReactNode; tex?: string }
export function Steps({ pasos, abierto = false }: { pasos: Paso[]; abierto?: boolean }) {
  return (
    <details className="steps" open={abierto}>
      <summary>Procedimiento paso a paso</summary>
      <ol>
        {pasos.map((p, i) => (
          <li key={i}>
            <div>{p.texto}</div>
            {p.tex && <Tex block>{p.tex}</Tex>}
          </li>
        ))}
      </ol>
    </details>
  )
}

export function Segmented<T extends string>({ value, options, onChange, label }: {
  value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; label: string
}) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  )
}

export function CopyButton({ texto }: { texto: () => string }) {
  return (
    <button
      type="button" className="btn ghost sm"
      onClick={async (e) => {
        const b = e.currentTarget
        try { await navigator.clipboard.writeText(texto()); b.textContent = '✓ Copiado' }
        catch { b.textContent = 'No se pudo copiar' }
        setTimeout(() => { b.textContent = 'Copiar resultados' }, 1800)
      }}
    >Copiar resultados</button>
  )
}

/* ───────── Íconos simples ───────── */
export const Icon = {
  bolt: <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor" /></svg>,
  sun: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>,
  moon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>,
  menu: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>,
}
