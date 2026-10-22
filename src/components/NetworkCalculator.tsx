import { useMemo, useRef, useState } from 'react'
import { coloresSerie, usePalette } from '../hooks/usePalette'
import { useMeasure, type Measure } from '../hooks/useMeasure'
import { cientifica, si, texNum } from '../lib/format'
import {
  casiIgual, resolverCapacitores, resolverResistencias, suma, type Conexion,
} from '../lib/physics'
import { UNIDADES } from '../lib/units'
import { validarNumero } from '../lib/validation'
import { CircuitDiagram } from './CircuitDiagram'
import { Check, CopyButton, MeasureField, Segmented, Stat, Steps, type Paso } from './ui'
import { XYChart } from './XYChart'

type Tipo = 'C' | 'R'
interface Elem { id: number; texto: string; unidad: number }
export interface Ejemplo { nombre: string; conexion: Conexion; valores: [string, number][]; voltaje: string }

const MAX = 6

/**
 * Calculadora de redes en serie o paralelo.
 * tipo 'C' → capacitores (C = Q/V); tipo 'R' → resistencias (Ley de Ohm).
 */
export function NetworkCalculator({ tipo, ejemplos }: { tipo: Tipo; ejemplos: Ejemplo[] }) {
  const p = usePalette()
  const tipoUnidad = tipo === 'C' ? 'capacitancia' : 'resistencia'
  const unidadSI = tipo === 'C' ? 'F' : 'Ω'
  const sigId = useRef(100)
  const inicial = ejemplos[0]
  const [conexion, setConexion] = useState<Conexion>(inicial.conexion)
  const [elems, setElems] = useState<Elem[]>(() => inicial.valores.map(([t, u], i) => ({ id: i, texto: t, unidad: u })))
  const V = useMeasure(inicial.voltaje, 'voltaje', { positivo: true, maxAbs: 1e6 })

  const cargarEjemplo = (e: Ejemplo) => {
    setConexion(e.conexion)
    setElems(e.valores.map(([t, u]) => ({ id: sigId.current++, texto: t, unidad: u })))
    V.setTexto(e.voltaje); V.setUnidad(0)
  }
  const actualizar = (id: number, cambios: Partial<Elem>) => setElems((xs) => xs.map((x) => (x.id === id ? { ...x, ...cambios } : x)))
  const agregar = () => setElems((xs) => [...xs, { id: sigId.current++, texto: tipo === 'C' ? '1' : '100', unidad: 0 }])
  const quitar = (id: number) => setElems((xs) => xs.filter((x) => x.id !== id))

  const validaciones = elems.map((e) => validarNumero(e.texto, { positivo: true, maxAbs: 1e12 }))
  const valoresSI = elems.map((e, i) => {
    const v = validaciones[i]
    return v.ok ? v.valor * UNIDADES[tipoUnidad][e.unidad].factor : NaN
  })
  const errores = [
    ...validaciones.flatMap((v, i) => (v.ok ? [] : [`${tipo}${i + 1}: ${v.error}`])),
    ...(V.validacion.ok ? [] : [`Voltaje: ${V.validacion.error}`]),
  ]
  const valido = errores.length === 0

  const salida = useMemo(() => {
    if (!valido) return null
    return tipo === 'C' ? construirCapacitores(valoresSI, V.valorSI, conexion) : construirResistencias(valoresSI, V.valorSI, conexion)
  }, [valido, tipo, valoresSI.join('|'), V.valorSI, conexion]) // eslint-disable-line react-hooks/exhaustive-deps

  const colores = coloresSerie(p)

  return (
    <div className="lab">
      <div className="lab-head">
        <div>
          <div className="eyebrow">Calculadora</div>
          <h2>{tipo === 'C' ? 'Capacitancia equivalente' : 'Circuito de resistencias'}</h2>
        </div>
        <div className="row">
          {ejemplos.map((e) => <button key={e.nombre} type="button" className="btn ghost sm" onClick={() => cargarEjemplo(e)}>{e.nombre}</button>)}
        </div>
      </div>

      <Segmented label="Tipo de conexión" value={conexion} onChange={setConexion}
        options={[{ value: 'serie', label: 'En serie' }, { value: 'paralelo', label: 'En paralelo' }]} />

      <div className="elements">
        {elems.map((e, i) => {
          const m: Measure = {
            texto: e.texto, setTexto: (t) => actualizar(e.id, { texto: typeof t === 'function' ? t(e.texto) : t }),
            unidad: e.unidad, setUnidad: (u) => actualizar(e.id, { unidad: typeof u === 'function' ? u(e.unidad) : u }),
            tipo: tipoUnidad, validacion: validaciones[i], valorSI: valoresSI[i], simbolo: UNIDADES[tipoUnidad][e.unidad].simbolo,
          }
          return (
            <div className="element" key={e.id}>
              <span className="tagname">{tipo}{i + 1}</span>
              <MeasureField label={`${tipo}${i + 1}`} m={m} compact />
              <button type="button" className="icon-btn rm" aria-label={`Quitar ${tipo}${i + 1}`} disabled={elems.length <= 2} onClick={() => quitar(e.id)}>✕</button>
            </div>
          )
        })}
      </div>
      <div className="row">
        <button type="button" className="btn ghost sm" onClick={agregar} disabled={elems.length >= MAX}>
          + Agregar {tipo === 'C' ? 'capacitor' : 'resistencia'}
        </button>
        <span className="caption">De 2 a {MAX} elementos</span>
      </div>
      <div className="fields"><MeasureField label={tipo === 'C' ? 'Voltaje de la batería' : 'Voltaje de la fuente'} m={V} /></div>

      {!valido && <div className="alert" role="alert"><b>Revisa los datos:</b> {errores.join(' · ')}</div>}

      {valido && salida && (
        <>
          <div className="figure"><CircuitDiagram tipo={tipo} conexion={conexion} valores={valoresSI} voltaje={V.valorSI} /></div>
          <div className="results">{salida.stats.map((s, i) => <Stat key={s.label} label={s.label} value={s.valor} main={i === 0} />)}</div>
          <div className="table-wrap">
            <table>
              <thead><tr>{salida.tabla.cabecera.map((h) => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {salida.tabla.filas.map((f, i) => <tr key={i}>{f.map((c, j) => <td key={j}>{c}</td>)}</tr>)}
                <tr className="total">{salida.tabla.total.map((c, j) => <td key={j}>{c}</td>)}</tr>
              </tbody>
            </table>
          </div>
          <Steps pasos={salida.pasos} />
          <XYChart
            ariaLabel={tipo === 'C' ? 'Gráfica de carga contra voltaje' : 'Gráfica de voltaje contra corriente'}
            ejeX={salida.grafica.ejeX} ejeY={salida.grafica.ejeY} fmtX={salida.grafica.fmtX} fmtY={salida.grafica.fmtY}
            maxX={salida.grafica.maxX} maxY={salida.grafica.maxY}
            series={[
              ...valoresSI.map((v, i) => ({ label: `${tipo}${i + 1} = ${si(v, unidadSI)}`, color: colores[i % colores.length], estilo: 'secundaria' as const, puntos: [{ x: 0, y: 0 }, { x: salida.grafica.maxX, y: salida.grafica.pendiente(v) * salida.grafica.maxX }] })),
              { label: `Equivalente = ${si(salida.equivalente, unidadSI)}`, color: p.accent, estilo: 'principal' as const, puntos: [{ x: 0, y: 0 }, { x: salida.grafica.maxX, y: salida.grafica.pendiente(salida.equivalente) * salida.grafica.maxX }] },
              { label: 'Punto de operación', color: p.accent, estilo: 'punto' as const, puntos: [salida.grafica.punto] },
            ]}
          />
          <p className="caption">{salida.grafica.nota}</p>
          <div className="row"><CopyButton texto={() => salida.textoCopia} /></div>
        </>
      )}
    </div>
  )
}

/* ─────────── Construcción de resultados ─────────── */

interface Salida {
  equivalente: number
  stats: { label: string; valor: React.ReactNode }[]
  tabla: { cabecera: string[]; filas: string[][]; total: string[] }
  pasos: Paso[]
  grafica: { ejeX: string; ejeY: string; fmtX: (v: number) => string; fmtY: (v: number) => string; maxX: number; maxY?: number; pendiente: (v: number) => number; punto: { x: number; y: number }; nota: string }
  textoCopia: string
}

const lista = (pref: string, xs: number[], u: string) => xs.map((x, i) => `${pref}_{${i + 1}}=${texNum(x)}\\,\\text{${u}}`).join(',\\;')

function construirCapacitores(C: number[], V: number, conexion: Conexion): Salida {
  const r = resolverCapacitores(C, V, conexion)
  const pasos: Paso[] = [{ texto: 'Escribimos los datos en unidades del SI:', tex: `${lista('C', C, 'F')},\\; V=${texNum(V)}\\,\\text{V}` }]
  if (conexion === 'serie') {
    const inv = suma(C.map((c) => 1 / c))
    pasos.push({ texto: 'En serie se suman los inversos de las capacitancias:', tex: `\\frac{1}{C_e}=${C.map((_, i) => `\\frac{1}{C_{${i + 1}}}`).join('+')}=${texNum(inv)}\\,\\text{F}^{-1}` })
    pasos.push({ texto: 'Despejamos la capacitancia equivalente:', tex: `C_e=\\frac{1}{${texNum(inv)}}=${texNum(r.equivalente)}\\,\\text{F}` })
    pasos.push({ texto: 'Carga total. En serie todos los capacitores tienen esta misma carga:', tex: `Q=C_eV=(${texNum(r.equivalente)})(${texNum(V)})=${texNum(r.cargaTotal)}\\,\\text{C}` })
    pasos.push({ texto: 'Voltaje de cada capacitor con V = Q/C:', tex: lista('V', r.voltajes, 'V') })
    pasos.push({ texto: <>Verificación: la suma de voltajes debe dar el voltaje de la batería. <Check ok={casiIgual(suma(r.voltajes), V)} /></>, tex: `${r.voltajes.map((_, i) => `V_{${i + 1}}`).join('+')}=${texNum(suma(r.voltajes))}\\,\\text{V}` })
  } else {
    pasos.push({ texto: 'En paralelo las capacitancias se suman directamente:', tex: `C_e=${C.map((_, i) => `C_{${i + 1}}`).join('+')}=${texNum(r.equivalente)}\\,\\text{F}` })
    pasos.push({ texto: 'Carga total:', tex: `Q=C_eV=(${texNum(r.equivalente)})(${texNum(V)})=${texNum(r.cargaTotal)}\\,\\text{C}` })
    pasos.push({ texto: 'En paralelo todos tienen el mismo voltaje. Carga de cada uno con Q = C·V:', tex: lista('Q', r.cargas, 'C') })
    pasos.push({ texto: <>Verificación: la suma de cargas debe dar la carga total. <Check ok={casiIgual(suma(r.cargas), r.cargaTotal)} /></>, tex: `${r.cargas.map((_, i) => `Q_{${i + 1}}`).join('+')}=${texNum(suma(r.cargas))}\\,\\text{C}` })
  }
  pasos.push({ texto: 'Energía almacenada en el sistema:', tex: `U=\\tfrac{1}{2}C_eV^2=${texNum(r.energia)}\\,\\text{J}` })
  return {
    equivalente: r.equivalente,
    stats: [
      { label: 'Capacitancia equivalente', valor: si(r.equivalente, 'F') },
      { label: 'Carga total Q', valor: si(r.cargaTotal, 'C') },
      { label: 'Energía almacenada', valor: si(r.energia, 'J') },
    ],
    tabla: {
      cabecera: ['Capacitor', 'C', 'Carga Q', 'Voltaje V'],
      filas: C.map((c, i) => [`C${i + 1}`, si(c, 'F'), si(r.cargas[i], 'C'), si(r.voltajes[i], 'V')]),
      total: ['Equivalente', si(r.equivalente, 'F'), si(r.cargaTotal, 'C'), si(V, 'V')],
    },
    pasos,
    grafica: {
      ejeX: 'Voltaje V', ejeY: 'Carga Q', fmtX: (v) => si(v, 'V'), fmtY: (v) => si(v, 'C'),
      maxX: V * 1.25, pendiente: (c) => c, punto: { x: V, y: r.cargaTotal },
      nota: 'Q contra V: cada recta tiene pendiente igual a su capacitancia (C = Q/V). El punto marca la carga total con el voltaje aplicado.',
    },
    textoCopia: [`Capacitores en ${conexion}, V = ${si(V, 'V')}`, ...C.map((c, i) => `C${i + 1} = ${si(c, 'F')} → Q = ${si(r.cargas[i], 'C')}, V = ${si(r.voltajes[i], 'V')}`),
      `Cₑ = ${si(r.equivalente, 'F')}, Q total = ${si(r.cargaTotal, 'C')}, U = ${cientifica(r.energia)} J`].join('\n'),
  }
}

function construirResistencias(R: number[], V: number, conexion: Conexion): Salida {
  const r = resolverResistencias(R, V, conexion)
  const pasos: Paso[] = [{ texto: 'Escribimos los datos en unidades del SI:', tex: `${lista('R', R, 'Ω')},\\; V=${texNum(V)}\\,\\text{V}` }]
  if (conexion === 'serie') {
    pasos.push({ texto: 'En serie las resistencias se suman:', tex: `R_e=${R.map((_, i) => `R_{${i + 1}}`).join('+')}=${texNum(r.equivalente)}\\,\\Omega` })
    pasos.push({ texto: 'Ley de Ohm para la corriente total. Es la misma en todas las resistencias:', tex: `I=\\frac{V}{R_e}=\\frac{${texNum(V)}}{${texNum(r.equivalente)}}=${texNum(r.corrienteTotal)}\\,\\text{A}` })
    pasos.push({ texto: 'Voltaje en cada resistencia con V = I·R:', tex: lista('V', r.voltajes, 'V') })
    pasos.push({ texto: <>Verificación (ley de voltajes): la suma debe dar el voltaje de la fuente. <Check ok={casiIgual(suma(r.voltajes), V)} /></>, tex: `${r.voltajes.map((_, i) => `V_{${i + 1}}`).join('+')}=${texNum(suma(r.voltajes))}\\,\\text{V}` })
  } else {
    const inv = suma(R.map((x) => 1 / x))
    pasos.push({ texto: 'En paralelo se suman los inversos:', tex: `\\frac{1}{R_e}=${R.map((_, i) => `\\frac{1}{R_{${i + 1}}}`).join('+')}=${texNum(inv)}\\,\\Omega^{-1}` })
    pasos.push({ texto: 'Despejamos la resistencia equivalente:', tex: `R_e=\\frac{1}{${texNum(inv)}}=${texNum(r.equivalente)}\\,\\Omega` })
    pasos.push({ texto: 'Ley de Ohm para la corriente total:', tex: `I=\\frac{V}{R_e}=\\frac{${texNum(V)}}{${texNum(r.equivalente)}}=${texNum(r.corrienteTotal)}\\,\\text{A}` })
    pasos.push({ texto: 'Todas tienen el mismo voltaje. Corriente en cada rama con I = V/R:', tex: lista('I', r.corrientes, 'A') })
    pasos.push({ texto: <>Verificación (ley de corrientes): la suma debe dar la corriente total. <Check ok={casiIgual(suma(r.corrientes), r.corrienteTotal)} /></>, tex: `${r.corrientes.map((_, i) => `I_{${i + 1}}`).join('+')}=${texNum(suma(r.corrientes))}\\,\\text{A}` })
  }
  pasos.push({ texto: <>Conservación de la energía: potencia de la fuente = potencia disipada. <Check ok={casiIgual(suma(r.potencias), r.potenciaFuente)} /></>, tex: `P=VI=${texNum(r.potenciaFuente)}\\,\\text{W}\\quad\\textstyle\\sum I_i^2R_i=${texNum(suma(r.potencias))}\\,\\text{W}` })
  const maxX = r.corrienteTotal * 1.25
  return {
    equivalente: r.equivalente,
    stats: [
      { label: 'Resistencia equivalente', valor: si(r.equivalente, 'Ω') },
      { label: 'Corriente total I', valor: si(r.corrienteTotal, 'A') },
      { label: 'Potencia total P', valor: si(r.potenciaFuente, 'W') },
    ],
    tabla: {
      cabecera: ['Resistencia', 'R', 'Corriente I', 'Voltaje V', 'Potencia P'],
      filas: R.map((x, i) => [`R${i + 1}`, si(x, 'Ω'), si(r.corrientes[i], 'A'), si(r.voltajes[i], 'V'), si(r.potencias[i], 'W')]),
      total: ['Equivalente', si(r.equivalente, 'Ω'), si(r.corrienteTotal, 'A'), si(V, 'V'), si(r.potenciaFuente, 'W')],
    },
    pasos,
    grafica: {
      ejeX: 'Corriente I', ejeY: 'Voltaje V', fmtX: (v) => si(v, 'A'), fmtY: (v) => si(v, 'V'),
      maxX, maxY: Math.min(Math.max(...R, r.equivalente) * maxX, V * 3), pendiente: (x) => x, punto: { x: r.corrienteTotal, y: V },
      nota: 'Curva característica V contra I: cada recta tiene pendiente igual a su resistencia (R = V/I). El punto marca el punto de operación del circuito.',
    },
    textoCopia: [`Resistencias en ${conexion}, V = ${si(V, 'V')}`, ...R.map((x, i) => `R${i + 1} = ${si(x, 'Ω')} → I = ${si(r.corrientes[i], 'A')}, V = ${si(r.voltajes[i], 'V')}, P = ${si(r.potencias[i], 'W')}`),
      `Rₑ = ${si(r.equivalente, 'Ω')}, I total = ${si(r.corrienteTotal, 'A')}, P total = ${si(r.potenciaFuente, 'W')}`].join('\n'),
  }
}
