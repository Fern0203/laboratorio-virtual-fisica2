/** Validación de los datos que escribe el usuario en las calculadoras. */

export interface ReglaNumero {
  /** El valor debe ser estrictamente mayor que cero */
  positivo?: boolean
  /** Límite absoluto razonable para evitar desbordes */
  maxAbs?: number
}

export type Validacion = { ok: true; valor: number } | { ok: false; error: string }

export function validarNumero(texto: string, regla: ReglaNumero = {}): Validacion {
  const limpio = texto.trim().replace(',', '.')
  if (limpio === '') return { ok: false, error: 'Este campo es obligatorio.' }
  const valor = Number(limpio)
  if (!Number.isFinite(valor)) return { ok: false, error: 'Escribe un número válido.' }
  if (regla.positivo && valor <= 0) return { ok: false, error: 'Debe ser mayor que cero.' }
  if (regla.maxAbs !== undefined && Math.abs(valor) > regla.maxAbs)
    return { ok: false, error: `El valor es demasiado grande (máximo ${regla.maxAbs}).` }
  return { ok: true, valor }
}
