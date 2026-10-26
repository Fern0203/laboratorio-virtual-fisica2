import { describe, expect, it } from 'vitest'
import { buscarTemas, TEMAS } from './temas'

describe('Contenido de los temas', () => {
  it('cada tema tiene exactamente 3 ejercicios', () => {
    for (const t of TEMAS) expect(t.ejercicios, t.slug).toHaveLength(3)
  })
  it('cada tema tiene entre 1 y 5 herramientas', () => {
    for (const t of TEMAS) {
      expect(t.herramientas.length, t.slug).toBeGreaterThan(0)
      expect(t.herramientas.length, t.slug).toBeLessThanOrEqual(5)
    }
  })
  it('solo un tema tiene calculadora propia', () => {
    expect(TEMAS.filter((t) => t.calculadora)).toHaveLength(1)
  })
  it('los slugs no se repiten', () => {
    expect(new Set(TEMAS.map((t) => t.slug)).size).toBe(TEMAS.length)
  })
})

describe('Buscador', () => {
  it('encuentra sin importar tildes ni mayúsculas', () => {
    expect(buscarTemas('magnetico').map((t) => t.slug)).toContain('fuerza-magnetica')
    expect(buscarTemas('GAUSS').map((t) => t.slug)).toContain('ley-de-gauss')
  })
  it('filtra por módulo', () => {
    const r = buscarTemas('módulo 2')
    expect(r.length).toBe(2)
    expect(r.every((t) => t.modulo === 2)).toBe(true)
  })
  it('devuelve todo si la búsqueda está vacía y nada si no hay coincidencias', () => {
    expect(buscarTemas('  ')).toHaveLength(TEMAS.length)
    expect(buscarTemas('zzzz')).toHaveLength(0)
  })
})
