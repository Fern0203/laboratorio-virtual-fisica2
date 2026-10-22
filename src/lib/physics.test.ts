import { describe, expect, it } from 'vitest'
import {
  campoElectrico, capacitanciaEquivalente, casiIgual, coulomb, fuerzaCoulomb,
  resistenciaEquivalente, resolverCapacitores, resolverResistencias, suma,
} from './physics'
import { cientifica, si } from './format'
import { validarNumero } from './validation'

/* Los valores esperados salen de los ejemplos resueltos del material del curso. */

describe('Ley de Coulomb', () => {
  it('3 µC y −8 µC a 2 m → 0.054 N de atracción', () => {
    const r = coulomb(3e-6, -8e-6, 2)
    expect(r.fuerza).toBeCloseTo(0.054, 6)
    expect(r.tipo).toBe('atraccion')
  })
  it('cumple la ley del inverso del cuadrado', () => {
    expect(fuerzaCoulomb(1e-6, 1e-6, 2) / fuerzaCoulomb(1e-6, 1e-6, 1)).toBeCloseTo(0.25, 10)
  })
  it('F = q₂·E', () => {
    expect(fuerzaCoulomb(3e-6, 5e-6, 0.1)).toBeCloseTo(5e-6 * campoElectrico(3e-6, 0.1), 10)
  })
  it('detecta repulsión y fuerza nula', () => {
    expect(coulomb(2e-6, 2e-6, 1).tipo).toBe('repulsion')
    expect(coulomb(0, 2e-6, 1).tipo).toBe('nula')
  })
  it('rechaza distancia cero', () => {
    expect(() => fuerzaCoulomb(1, 1, 0)).toThrow()
  })
})

describe('Capacitores', () => {
  it('2 µF y 4 µF en serie con 120 V (ejemplo del curso)', () => {
    const r = resolverCapacitores([2e-6, 4e-6], 120, 'serie')
    expect(r.equivalente).toBeCloseTo(1.3333e-6, 9)
    expect(r.cargaTotal).toBeCloseTo(160e-6, 9)
    expect(r.voltajes[1]).toBeCloseTo(40, 6) // tensión en el de 4 µF
    expect(casiIgual(suma(r.voltajes), 120)).toBe(true)
  })
  it('3 µF en paralelo con 1.33 µF → 4.33 µF', () => {
    const c23 = capacitanciaEquivalente([2e-6, 4e-6], 'serie')
    expect(capacitanciaEquivalente([3e-6, c23], 'paralelo')).toBeCloseTo(4.3333e-6, 9)
  })
  it('en paralelo las cargas suman la carga total', () => {
    const r = resolverCapacitores([3e-6, 6e-6, 1e-6], 12, 'paralelo')
    expect(casiIgual(suma(r.cargas), r.cargaTotal)).toBe(true)
  })
  it('rechaza capacitancias no positivas', () => {
    expect(() => capacitanciaEquivalente([2e-6, 0], 'serie')).toThrow()
  })
})

describe('Ley de Ohm', () => {
  it('400 Ω + (500 Ω ∥ 700 Ω) con 12 V', () => {
    const rp = resistenciaEquivalente([500, 700], 'paralelo')
    expect(rp).toBeCloseTo(291.67, 2)
    const total = resistenciaEquivalente([400, rp], 'serie')
    expect(12 / total).toBeCloseTo(0.01735, 5)
  })
  it('conserva la energía: potencia de la fuente = potencia disipada', () => {
    for (const conexion of ['serie', 'paralelo'] as const) {
      const r = resolverResistencias([10, 22, 47], 9, conexion)
      expect(casiIgual(suma(r.potencias), r.potenciaFuente)).toBe(true)
    }
  })
  it('foco de 60 W a 120 V tiene 240 Ω', () => {
    const r = resolverResistencias([240], 120, 'serie')
    expect(r.potenciaFuente).toBeCloseTo(60, 9)
  })
})

describe('Formato y validación', () => {
  it('formatea con prefijos del SI', () => {
    expect(si(160e-6, 'C')).toBe('160 µC')
    expect(si(4000, 'V/m')).toBe('4 kV/m')
    expect(cientifica(2.77e-14)).toBe('2.77 × 10⁻¹⁴')
  })
  it('valida campos', () => {
    expect(validarNumero('').ok).toBe(false)
    expect(validarNumero('abc').ok).toBe(false)
    expect(validarNumero('-3', { positivo: true }).ok).toBe(false)
    expect(validarNumero('2,5')).toEqual({ ok: true, valor: 2.5 })
  })
})
