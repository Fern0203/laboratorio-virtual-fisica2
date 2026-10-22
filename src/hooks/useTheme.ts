import { useCallback, useEffect, useState } from 'react'

export type Tema = 'system' | 'light' | 'dark'
const CLAVE = 'lab-fisica2:tema'

function leerGuardado(): Tema {
  try {
    const t = localStorage.getItem(CLAVE)
    return t === 'light' || t === 'dark' ? t : 'system'
  } catch {
    return 'system'
  }
}

/** Tema claro/oscuro/sistema. Escribe data-theme en <html> y lo recuerda en el navegador. */
export function useTheme() {
  const [tema, setTema] = useState<Tema>(leerGuardado)
  useEffect(() => {
    const root = document.documentElement
    if (tema === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', tema)
    try { localStorage.setItem(CLAVE, tema) } catch { /* almacenamiento no disponible */ }
  }, [tema])
  const alternar = useCallback(() => {
    setTema((t) => {
      const oscuroAhora = t === 'dark' || (t === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
      return oscuroAhora ? 'light' : 'dark'
    })
  }, [])
  return { tema, alternar }
}
