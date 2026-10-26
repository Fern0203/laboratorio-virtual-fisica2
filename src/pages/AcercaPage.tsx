import { MODULOS, TEMAS } from '../data/temas'

/** Escriban aquí los datos de cada integrante del grupo. */
const INTEGRANTES = [
  { nombre: 'Fernando José Batz Marroquín', carne: '0903-23-463' },
  { nombre: 'Sherly Zayuri Laparra Velásquez', carne: '0903-24-16793' },
  { nombre: 'Breyson Enihel Vargas Bartolón', carne: '0903-23-11160' },
  { nombre: 'David Leonardo Velasquez Roblero', carne: '0903-24-22880' },
]

export default function AcercaPage() {
  const ejercicios = TEMAS.flatMap((t) => t.ejercicios)
  const deDiapositivas = ejercicios.filter((e) => e.fuente === 'diapositivas').length
  return (
    <>
      <div className="band"><div className="wrap topic-band">
        <div className="topic-hero">
          <div className="eyebrow">Documentación</div>
          <h1>Acerca del proyecto</h1>
          <p className="lead">Qué contiene la aplicación, cómo se organizó el contenido y con qué tecnologías se construyó.</p>
        </div>
      </div></div>
      <div className="wrap">
        <section className="caratula" aria-label="Carátula del proyecto">
          <img src={`${import.meta.env.BASE_URL}logo-umg.png`} alt="Escudo de la Universidad Mariano Gálvez de Guatemala" width={150} height={150} />
          <div className="caratula-text">
            <p className="inst">Universidad Mariano Gálvez de Guatemala</p>
            <p className="sede">Extensión Universitaria San Pedro Sacatepéquez, San Marcos</p>
            <p className="carrera">Ingeniería en Sistemas de la Información y Ciencias de la Computación</p>
            <dl className="curso">
              <div><dt>Curso</dt><dd>Física 2</dd></div>
              <div><dt>Catedrática</dt><dd>Inga. Edna Feliciano</dd></div>
              <div><dt>Proyecto</dt><dd>Ohmnia · Proyecto final</dd></div>
            </dl>
          </div>
          <div className="integrantes">
            <h3>Integrantes</h3>
            <table>
              <thead><tr><th>Nombre</th><th>Carné</th></tr></thead>
              <tbody>
                {INTEGRANTES.map((p) => <tr key={p.carne}><td>{p.nombre}</td><td>{p.carne}</td></tr>)}
              </tbody>
            </table>
          </div>
        </section>
        <div className="about">
          <div className="box">
            <h3>Contenido</h3>
            <ul>
              {MODULOS.map((m) => (
                <li key={m.n}><b>Módulo {m.n} · {m.nombre}:</b> {TEMAS.filter((t) => t.modulo === m.n).map((t) => t.titulo).join(', ')}.</li>
              ))}
            </ul>
          </div>
          <div className="box">
            <h3>Cada tema incluye</h3>
            <ul>
              <li><b>Explicación</b> clara del tema, conceptos clave y fórmulas.</li>
              <li><b>Pasos</b> para resolver ejercicios y los errores más comunes.</li>
              <li><b>3 ejercicios resueltos</b> paso a paso: {deDiapositivas} de los {ejercicios.length} salen de las diapositivas del curso y el resto son ejercicios de apoyo.</li>
              <li><b>Herramientas</b> recomendadas (máximo 5 por tema): simuladores PhET y Falstad, graficadoras y calculadoras.</li>
            </ul>
          </div>
          <div className="box">
            <h3>Calculadora propia</h3>
            <ul>
              <li>Elegimos el tema <b>Corriente eléctrica y Ley de Ohm</b> porque es el que más se usa en la vida diaria: la instalación de una casa, el recibo de luz y cualquier aparato.</li>
              <li>Resuelve circuitos en serie y en paralelo con 2 a 6 resistencias.</li>
              <li>Valida los datos: no acepta campos vacíos, texto ni valores de cero o negativos.</li>
              <li>Convierte unidades (Ω, kΩ, MΩ, mV, kV) y muestra el procedimiento con fórmulas.</li>
              <li>Verifica el resultado (suma de voltajes o corrientes y conservación de la potencia), dibuja el circuito y grafica la curva V–I.</li>
            </ul>
          </div>
          <div className="box">
            <h3>Tecnologías</h3>
            <div className="stack">
              {['React 18', 'TypeScript', 'Vite', 'React Router', 'Chart.js', 'KaTeX', 'Vitest', 'Netlify'].map((t) => <span key={t}>{t}</span>)}
            </div>
            <pre className="tree">{`src/
├─ data/temas.ts   contenido de los ${TEMAS.length} temas
├─ lib/            lógica física + pruebas
├─ components/     calculadora, gráfica, tarjetas
└─ pages/          inicio, módulo, tema, calculadora`}</pre>
          </div>
          <div className="box">
            <h3>Referencias</h3>
            <ol>
              <li>Serway, R. A. y Jewett, J. W. (2019). <i>Física para ciencias e ingeniería, Vol. 2</i> (10.ª ed.). Cengage Learning.</li>
              <li>Tippens, P. E. (2011). <i>Física: conceptos y aplicaciones</i> (7.ª ed.). McGraw-Hill.</li>
              <li>Young, H. D. y Freedman, R. A. (2018). <i>Física universitaria con física moderna, Vol. 2</i> (14.ª ed.). Pearson.</li>
              <li>Material del curso Física II, módulos 1, 2 y 3.</li>
              <li>PhET Interactive Simulations, Universidad de Colorado Boulder.</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}
