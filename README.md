# Laboratorio Virtual de Física II

Aplicación web educativa para el proyecto final de **Física II**. Reúne un tema clave de cada módulo del curso, con teoría, ejemplos resueltos, simulador o calculadora, gráficas y un cuestionario de repaso.

| Módulo | Tema | Herramienta |
|---|---|---|
| 1 · Electrostática | Ley de Coulomb y campo eléctrico | Simulador de dos cargas + gráfica F contra r |
| 2 · Potencial y capacitancia | Capacitores en serie y paralelo | Calculadora + esquema del circuito + gráfica Q contra V |
| 3 · Corriente eléctrica | Ley de Ohm y circuitos de resistencias | Calculadora + esquema del circuito + gráfica V contra I |

## Tecnologías

- **React 18 + TypeScript**: interfaz por componentes con tipado estático.
- **Vite**: servidor de desarrollo y empaquetado para producción.
- **React Router**: una ruta por módulo (`/#/coulomb`, `/#/capacitores`, `/#/circuitos`, `/#/acerca`), con carga diferida de cada página.
- **Chart.js** (con `react-chartjs-2`): gráficas X-Y que respetan el modo claro/oscuro.
- **KaTeX**: fórmulas matemáticas bien renderizadas.
- **Vitest**: pruebas automáticas de la lógica física.

## Requisitos

- Node.js 18 o superior
- pnpm (o npm)

## Cómo ejecutarlo

```bash
pnpm install      # instala dependencias
pnpm dev          # modo desarrollo en http://localhost:5173
pnpm test         # corre las 14 pruebas de la lógica física
pnpm build        # genera la versión de producción en dist/
pnpm preview      # sirve dist/ para revisarla
```

Con npm: `npm install`, `npm run dev`, `npm test`, `npm run build`.

## Estructura

```
src/
├─ lib/
│  ├─ physics.ts        Fórmulas: Coulomb, capacitores, resistencias (funciones puras, SI)
│  ├─ physics.test.ts   Pruebas con los ejemplos resueltos del curso
│  ├─ format.ts         Prefijos SI (µ, n, k…) y notación científica
│  ├─ units.ts          Unidades disponibles y su factor al SI
│  └─ validation.ts     Validación de los datos del usuario
├─ components/
│  ├─ CoulombLab.tsx        Simulador de la Ley de Coulomb
│  ├─ NetworkCalculator.tsx Calculadora serie/paralelo (capacitores y resistencias)
│  ├─ CircuitDiagram.tsx    Esquema del circuito en SVG generado con los datos
│  ├─ XYChart.tsx           Gráfica X-Y con Chart.js
│  ├─ Quiz.tsx              Cuestionario con retroalimentación y puntaje
│  ├─ Layout.tsx            Navegación, pie de página y plantilla de cada tema
│  └─ ui.tsx                Fórmulas (KaTeX), campos, resultados, pasos
├─ pages/               Una página por módulo + inicio + acerca
├─ hooks/               Tema claro/oscuro, colores para gráficas, campos con unidad
├─ data/quiz.ts         15 preguntas de repaso
└─ styles/global.css    Sistema de diseño (variables de color y tipografía)
```

La lógica física (`src/lib`) está separada de la interfaz: se puede probar sola y la interfaz solo muestra resultados.

## Calculadoras: funcionamiento y validación

1. El usuario escribe valores con su unidad (µC, cm, µF, kΩ, etc.).
2. Cada campo se valida al escribir: no se aceptan campos vacíos ni texto, y las distancias, capacitancias, resistencias y voltajes deben ser mayores que cero. Se aceptan decimales con punto o coma.
3. Los valores se convierten al SI y se resuelven con las fórmulas del curso.
4. Se muestran los resultados, una tabla por elemento, el procedimiento paso a paso con fórmulas y una **verificación automática**:
   - Capacitores en serie: V₁ + V₂ + … = V. En paralelo: Q₁ + Q₂ + … = Q.
   - Resistencias en serie: V₁ + V₂ + … = V. En paralelo: I₁ + I₂ + … = I.
   - Conservación de la energía: P de la fuente = Σ I²R.
5. Se grafica el resultado y se pueden copiar los resultados al portapapeles.

Constantes: k = 9 × 10⁹ N·m²/C², ε₀ = 8.85 × 10⁻¹² C²/(N·m²).

## Publicarlo en internet (gratis)

**Netlify o Vercel:** subir el repositorio a GitHub, importarlo en Netlify/Vercel. Comando de build: `pnpm build`. Carpeta de salida: `dist`.

**GitHub Pages:** ejecutar `pnpm build` y subir el contenido de `dist/` a la rama `gh-pages` (o usar la acción de GitHub para Vite). La configuración `base: './'` y el enrutamiento con `#` hacen que funcione en cualquier carpeta.

## Referencias

- Serway, R. A. y Jewett, J. W. (2019). *Física para ciencias e ingeniería, Vol. 2* (10.ª ed.). Cengage Learning.
- Tippens, P. E. (2011). *Física: conceptos y aplicaciones* (7.ª ed.). McGraw-Hill.
- Young, H. D. y Freedman, R. A. (2018). *Física universitaria con física moderna, Vol. 2* (14.ª ed.). Pearson.
- Material del curso Física II, módulos 1, 2 y 3.
- PhET Interactive Simulations, Universidad de Colorado Boulder.
