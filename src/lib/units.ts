/** Unidades disponibles en las calculadoras y su factor al SI. */
export interface Unidad {
  simbolo: string
  factor: number
}

export const UNIDADES = {
  carga: [
    { simbolo: 'µC', factor: 1e-6 },
    { simbolo: 'nC', factor: 1e-9 },
    { simbolo: 'pC', factor: 1e-12 },
    { simbolo: 'C', factor: 1 },
  ],
  distancia: [
    { simbolo: 'm', factor: 1 },
    { simbolo: 'cm', factor: 1e-2 },
    { simbolo: 'mm', factor: 1e-3 },
  ],
  capacitancia: [
    { simbolo: 'µF', factor: 1e-6 },
    { simbolo: 'nF', factor: 1e-9 },
    { simbolo: 'pF', factor: 1e-12 },
    { simbolo: 'F', factor: 1 },
  ],
  resistencia: [
    { simbolo: 'Ω', factor: 1 },
    { simbolo: 'kΩ', factor: 1e3 },
    { simbolo: 'MΩ', factor: 1e6 },
  ],
  voltaje: [
    { simbolo: 'V', factor: 1 },
    { simbolo: 'mV', factor: 1e-3 },
    { simbolo: 'kV', factor: 1e3 },
  ],
} satisfies Record<string, Unidad[]>

export type TipoUnidad = keyof typeof UNIDADES
