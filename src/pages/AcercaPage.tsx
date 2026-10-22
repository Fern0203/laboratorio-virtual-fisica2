export default function AcercaPage() {
  return (
    <>
    <div className="band"><div className="wrap topic-band">
      <div className="topic-hero">
        <div className="eyebrow">Documentación</div>
        <h1>Acerca del proyecto</h1>
        <p className="lead">Por qué elegimos estos temas, cómo está construida la aplicación y de dónde sale la información.</p>
      </div>
    </div></div>
    <div className="wrap">
      <div className="about">
        <div className="box">
          <h3>Justificación de los temas</h3>
          <ul>
            <li><b>Ley de Coulomb (Módulo 1):</b> es la ley fundamental de la electrostática; de ella se derivan el campo eléctrico, el flujo y la Ley de Gauss.</li>
            <li><b>Capacitores (Módulo 2):</b> aplican directamente el potencial eléctrico y la capacitancia, y están en casi todo aparato electrónico.</li>
            <li><b>Ley de Ohm (Módulo 3):</b> es la herramienta básica para analizar cualquier circuito, desde una linterna hasta la instalación de una casa.</li>
          </ul>
        </div>
        <div className="box">
          <h3>Calculadoras propias</h3>
          <ul>
            <li>Calculan en tiempo real mientras escribes.</li>
            <li>Validan cada dato: no aceptan campos vacíos, texto, ni distancias, capacitancias, resistencias o voltajes de cero o negativos.</li>
            <li>Convierten unidades (µC, nC, cm, µF, pF, kΩ…) al SI antes de operar.</li>
            <li>Muestran el procedimiento con fórmulas y una verificación automática (suma de voltajes, cargas, corrientes o potencias).</li>
            <li>Dibujan el esquema del circuito y grafican los resultados.</li>
            <li>La lógica física está probada con 14 pruebas automáticas basadas en los ejemplos del curso.</li>
          </ul>
        </div>
        <div className="box">
          <h3>Tecnologías</h3>
          <div className="stack">
            {['React 18', 'TypeScript', 'Vite', 'React Router', 'Chart.js', 'KaTeX', 'Vitest', 'CSS propio'].map((t) => <span key={t}>{t}</span>)}
          </div>
          <p className="muted" style={{ fontSize: '.92rem' }}>Aplicación de una sola página (SPA) sin servidor: se puede publicar gratis en GitHub Pages, Netlify o Vercel y funciona en computadora y celular.</p>
          <pre className="tree">{`src/
├─ lib/          lógica física pura + pruebas
├─ components/   calculadoras, gráficas, quiz
├─ pages/        una página por módulo
├─ hooks/        tema, paleta, campos
└─ data/         preguntas de repaso`}</pre>
        </div>
        <div className="box">
          <h3>Diseño</h3>
          <ul>
            <li>Estilo de cuaderno de laboratorio sobre papel milimetrado.</li>
            <li>Colores con significado: rojo para carga positiva, azul para negativa, cobre para conductores.</li>
            <li>Modo claro y oscuro, navegación por módulos y diseño adaptable al celular.</li>
            <li>Accesible: navegación con teclado, etiquetas para lectores de pantalla y mensajes de error claros.</li>
          </ul>
        </div>
        <div className="box" style={{ gridColumn: '1 / -1' }}>
          <h3>Referencias</h3>
          <ol>
            <li>Serway, R. A. y Jewett, J. W. (2019). <i>Física para ciencias e ingeniería, Vol. 2</i> (10.ª ed.). Cengage Learning.</li>
            <li>Tippens, P. E. (2011). <i>Física: conceptos y aplicaciones</i> (7.ª ed.). McGraw-Hill.</li>
            <li>Young, H. D. y Freedman, R. A. (2018). <i>Física universitaria con física moderna, Vol. 2</i> (14.ª ed.). Pearson.</li>
            <li>Material del curso Física II: módulos 1 (Coulomb, campo, flujo y Gauss), 2 (potencial y capacitancia) y 3 (corriente y magnetismo).</li>
            <li>PhET Interactive Simulations, Universidad de Colorado Boulder: <a href="https://phet.colorado.edu/es/simulations/coulombs-law" target="_blank" rel="noopener noreferrer">Ley de Coulomb</a>, <a href="https://phet.colorado.edu/es/simulations/capacitor-lab-basics" target="_blank" rel="noopener noreferrer">Laboratorio de capacitores</a>, <a href="https://phet.colorado.edu/sims/html/circuit-construction-kit-dc-virtual-lab/latest/circuit-construction-kit-dc-virtual-lab_es.html" target="_blank" rel="noopener noreferrer">Kit de circuitos DC</a>.</li>
          </ol>
        </div>
      </div>
    </div>
    </>
  )
}
