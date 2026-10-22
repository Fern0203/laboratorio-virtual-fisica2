import { useMemo, useState } from 'react'
import { UNIDADES, type TipoUnidad } from '../lib/units'
import { validarNumero, type ReglaNumero } from '../lib/validation'

/** Estado de un campo numérico con unidad: texto escrito, unidad elegida y valor en SI ya validado. */
export function useMeasure(inicial: string, tipo: TipoUnidad, regla: ReglaNumero = {}, unidadInicial = 0) {
  const [texto, setTexto] = useState(inicial)
  const [unidad, setUnidad] = useState(unidadInicial)
  const validacion = useMemo(() => validarNumero(texto, regla), [texto, regla.positivo, regla.maxAbs]) // eslint-disable-line react-hooks/exhaustive-deps
  const factor = UNIDADES[tipo][unidad].factor
  const valorSI = validacion.ok ? validacion.valor * factor : NaN
  return { texto, setTexto, unidad, setUnidad, tipo, validacion, valorSI, simbolo: UNIDADES[tipo][unidad].simbolo }
}
export type Measure = ReturnType<typeof useMeasure>
