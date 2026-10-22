import { TopicPage } from '../components/Layout'
import { NetworkCalculator, type Ejemplo } from '../components/NetworkCalculator'
import { Quiz } from '../components/Quiz'
import { Formula, Tex } from '../components/ui'
import { QUIZ_OHM } from '../data/quiz'

const EJEMPLOS: Ejemplo[] = [
  { nombre: 'Ejemplo del curso', conexion: 'paralelo', valores: [['500', 0], ['700', 0]], voltaje: '12' },
  { nombre: 'Focos en casa (120 V)', conexion: 'paralelo', valores: [['240', 0], ['240', 0], ['144', 0]], voltaje: '120' },
  { nombre: 'Serie de 3', conexion: 'serie', valores: [['10', 0], ['22', 0], ['47', 0]], voltaje: '9' },
]

export default function CircuitosPage() {
  return (
    <TopicPage
      dot="var(--teal)"
      modulo="Módulo 3 · Corriente eléctrica"
      titulo="Ley de Ohm y circuitos de resistencias"
      intro="Con la Ley de Ohm se resuelve cualquier circuito simple: qué corriente sale de la fuente, cuánto voltaje cae en cada resistencia y cuánta potencia se consume."
      repaso={<Quiz preguntas={QUIZ_OHM} />}
      laboratorio={
        <>
          <div className="theory">
            <div>
              <h2>Corriente y Ley de Ohm</h2>
              <p>La corriente eléctrica es la carga que cruza una sección del conductor por unidad de tiempo. En un conductor óhmico, la corriente es directamente proporcional a la diferencia de potencial aplicada; el cociente V/I es constante y se llama resistencia.</p>
            </div>
            <Formula tex="I=\frac{\Delta Q}{\Delta t}\qquad V=I\,R" nota="V en volts (V), I en amperes (A), R en ohms (Ω)." />
            <Formula tex="R=\rho\,\frac{l}{A}" nota="La resistencia crece con la longitud del conductor y disminuye con su área. ρ es la resistividad del material." />
            <div>
              <h2>Serie y paralelo</h2>
              <p>En <b>serie</b> pasa la misma corriente por todas las resistencias y los voltajes se suman. En <b>paralelo</b> todas tienen el mismo voltaje y las corrientes se suman.</p>
            </div>
            <Formula tex="R_e=R_1+R_2+\cdots\qquad\frac{1}{R_e}=\frac{1}{R_1}+\frac{1}{R_2}+\cdots" nota="Izquierda: serie. Derecha: paralelo." />
            <Formula tex="P=IV=I^2R=\frac{V^2}{R}" nota="Potencia en watts (W). La potencia que entrega la fuente es igual a la que disipan las resistencias." />
            <div className="callout"><b>Dato útil.</b> En Guatemala la red doméstica es de 120 V. Un foco de 60 W conectado ahí tiene R = V²/P = 240 Ω y consume I = 0.5 A. Prueba el ejemplo «Focos en casa».</div>
            <div className="worked">
              <h2 style={{ fontSize: '1.1rem' }}>Ejemplo resuelto del curso</h2>
              <p>Resistencias de 500 Ω y 700 Ω en paralelo:</p>
              <Tex block>{'R_P=\\frac{(500)(700)}{500+700}=291.7\\,\\Omega'}</Tex>
              <p className="muted">Ojo: la diapositiva redondea 1/R<sub>P</sub> a 0.0034 y obtiene 294 Ω. El valor exacto es 291.7 Ω.</p>
            </div>
            <div>
              <h2>¿Dónde la vemos?</h2>
              <div className="uses">
                <div className="use"><b>Instalación de tu casa</b>Los tomacorrientes están en paralelo: todos reciben 120 V.</div>
                <div className="use"><b>Recibo de luz</b>Se cobra la energía consumida: potencia por tiempo (kWh).</div>
                <div className="use"><b>Fusibles y breakers</b>Cortan el circuito si la corriente es demasiado alta.</div>
              </div>
            </div>
          </div>
          <NetworkCalculator tipo="R" ejemplos={EJEMPLOS} />
        </>
      }
    />
  )
}
