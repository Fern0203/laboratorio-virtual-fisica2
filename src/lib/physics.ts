/**
 * Lógica física pura del laboratorio (sin React).
 * Todas las funciones reciben y devuelven valores en unidades del SI.
 */

/** Constante de Coulomb usada en el curso: k = 1/(4πε₀) ≈ 9 × 10⁹ N·m²/C² */
export const K = 9e9
/** Permitividad del vacío ε₀ en C²/(N·m²) */
export const EPSILON_0 = 8.85e-12

export type Conexion = 'serie' | 'paralelo'

/* ─────────────────────────── Ley de Coulomb ─────────────────────────── */

export type TipoFuerza = 'atraccion' | 'repulsion' | 'nula'

export interface ResultadoCoulomb {
  /** Magnitud de la fuerza (N) */
  fuerza: number
  /** Campo que produce q₁ en la posición de q₂ (N/C) */
  campoQ1: number
  tipo: TipoFuerza
}

/** F = k·|q₁·q₂| / r² */
export function fuerzaCoulomb(q1: number, q2: number, r: number): number {
  if (r <= 0) throw new RangeError('La distancia debe ser mayor que cero')
  return (K * Math.abs(q1 * q2)) / (r * r)
}

/** E = k·|Q| / r² */
export function campoElectrico(q: number, r: number): number {
  if (r <= 0) throw new RangeError('La distancia debe ser mayor que cero')
  return (K * Math.abs(q)) / (r * r)
}

export function tipoFuerza(q1: number, q2: number): TipoFuerza {
  const p = q1 * q2
  if (p === 0) return 'nula'
  return p > 0 ? 'repulsion' : 'atraccion'
}

export function coulomb(q1: number, q2: number, r: number): ResultadoCoulomb {
  return { fuerza: fuerzaCoulomb(q1, q2, r), campoQ1: campoElectrico(q1, r), tipo: tipoFuerza(q1, q2) }
}

/* ─────────────────────── Capacitores serie / paralelo ─────────────────────── */

export interface ResultadoCapacitores {
  conexion: Conexion
  /** Capacitancia equivalente (F) */
  equivalente: number
  /** Carga total (C) */
  cargaTotal: number
  voltaje: number
  /** Carga de cada capacitor (C) */
  cargas: number[]
  /** Voltaje de cada capacitor (V) */
  voltajes: number[]
  /** Energía total almacenada U = ½·Cₑ·V² (J) */
  energia: number
}

export function capacitanciaEquivalente(caps: number[], conexion: Conexion): number {
  validarLista(caps, 'capacitancia')
  return conexion === 'serie' ? 1 / caps.reduce((s, c) => s + 1 / c, 0) : caps.reduce((s, c) => s + c, 0)
}

export function resolverCapacitores(caps: number[], voltaje: number, conexion: Conexion): ResultadoCapacitores {
  if (!(voltaje > 0)) throw new RangeError('El voltaje debe ser mayor que cero')
  const equivalente = capacitanciaEquivalente(caps, conexion)
  const cargaTotal = equivalente * voltaje
  const cargas = conexion === 'serie' ? caps.map(() => cargaTotal) : caps.map((c) => c * voltaje)
  const voltajes = conexion === 'serie' ? caps.map((c) => cargaTotal / c) : caps.map(() => voltaje)
  return { conexion, equivalente, cargaTotal, voltaje, cargas, voltajes, energia: 0.5 * equivalente * voltaje ** 2 }
}

/* ─────────────────────── Resistencias / Ley de Ohm ─────────────────────── */

export interface ResultadoResistencias {
  conexion: Conexion
  /** Resistencia equivalente (Ω) */
  equivalente: number
  /** Corriente total que entrega la fuente (A) */
  corrienteTotal: number
  voltaje: number
  corrientes: number[]
  voltajes: number[]
  /** Potencia disipada en cada resistencia (W) */
  potencias: number[]
  /** Potencia que entrega la fuente P = V·I (W) */
  potenciaFuente: number
}

export function resistenciaEquivalente(res: number[], conexion: Conexion): number {
  validarLista(res, 'resistencia')
  return conexion === 'serie' ? res.reduce((s, r) => s + r, 0) : 1 / res.reduce((s, r) => s + 1 / r, 0)
}

export function resolverResistencias(res: number[], voltaje: number, conexion: Conexion): ResultadoResistencias {
  if (!(voltaje > 0)) throw new RangeError('El voltaje debe ser mayor que cero')
  const equivalente = resistenciaEquivalente(res, conexion)
  const corrienteTotal = voltaje / equivalente
  const corrientes = conexion === 'serie' ? res.map(() => corrienteTotal) : res.map((r) => voltaje / r)
  const voltajes = conexion === 'serie' ? res.map((r) => corrienteTotal * r) : res.map(() => voltaje)
  const potencias = res.map((r, i) => corrientes[i] ** 2 * r)
  return { conexion, equivalente, corrienteTotal, voltaje, corrientes, voltajes, potencias, potenciaFuente: voltaje * corrienteTotal }
}

/* ─────────────────────────── utilidades ─────────────────────────── */

function validarLista(valores: number[], nombre: string) {
  if (valores.length === 0) throw new RangeError(`Agrega al menos una ${nombre}`)
  if (valores.some((v) => !(v > 0) || !Number.isFinite(v))) throw new RangeError(`Cada ${nombre} debe ser mayor que cero`)
}

export const suma = (xs: number[]) => xs.reduce((a, b) => a + b, 0)

/** Compara dos valores con tolerancia relativa (para las verificaciones). */
export function casiIgual(a: number, b: number, tol = 1e-9): boolean {
  return Math.abs(a - b) <= tol * Math.max(Math.abs(a), Math.abs(b), Number.MIN_VALUE)
}
