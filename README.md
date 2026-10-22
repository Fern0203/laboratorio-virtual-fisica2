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

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) 18 o superior (recomendado: versión LTS)
- **pnpm 11.25.0**. Usa siempre pnpm, no npm: npm ignora el `pnpm-lock.yaml` e instala versiones distintas.

Para comprobar lo que tienes instalado:

```bash
git --version
node --version
pnpm --version
```

## Instalación (primera vez)

**1. Instalar la versión correcta de pnpm**

```bash
npm install -g pnpm@11.25.0
```

**2. Clonar el repositorio**

Desde la terminal:

```bash
git clone https://github.com/Fern0203/laboratorio-virtual-fisica2.git
cd laboratorio-virtual-fisica2
```

O con GitHub Desktop: **File → Clone repository** → `Fern0203/laboratorio-virtual-fisica2` → **Clone** → **Repository → Open in Visual Studio Code**.

**3. Instalar las dependencias**

```bash
pnpm install --frozen-lockfile
```

`--frozen-lockfile` instala exactamente las versiones del `pnpm-lock.yaml`, para que todo el equipo tenga lo mismo.

**4. Abrir la aplicación**

```bash
pnpm dev
```

Abre en el navegador: http://localhost:5173

## Comandos disponibles

```bash
pnpm dev          # modo desarrollo en http://localhost:5173
pnpm test         # corre las 14 pruebas de la lógica física
pnpm build        # genera la versión de producción en dist/
pnpm preview      # sirve dist/ para revisarla
```

## Trabajo en equipo

- **Antes de empezar:** `git pull` (o **Fetch origin → Pull origin** en GitHub Desktop).
- **Al terminar:** `git add .` → `git commit -m "qué cambiaste"` → `git push` (o **Commit to main → Push origin**).
- Si agregas una librería con `pnpm add`, sube también el `pnpm-lock.yaml` actualizado.
- No subas `node_modules` ni `dist`; el `.gitignore` ya los excluye.

## Solución de problemas

**`ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION`**
pnpm bloquea paquetes publicados hace menos de un día. Asegúrate de usar pnpm 11.25.0 y `pnpm install --frozen-lockfile`. Si aun así aparece, borra el lockfile y vuelve a instalar:

```bash
rm pnpm-lock.yaml
pnpm install
```

Después avisa al equipo y sube el nuevo `pnpm-lock.yaml`.

**`pnpm: command not found`**
Vuelve a instalarlo con `npm install -g pnpm@11.25.0` y cierra y abre la terminal.

**El puerto 5173 está ocupado**
Vite usará otro puerto (5174, 5175…). Revisa la dirección que aparece en la terminal.

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