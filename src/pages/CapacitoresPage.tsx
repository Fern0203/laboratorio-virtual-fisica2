import { TopicPage } from '../components/Layout'
import { NetworkCalculator, type Ejemplo } from '../components/NetworkCalculator'
import { Quiz } from '../components/Quiz'
import { Formula, Tex } from '../components/ui'
import { QUIZ_CAPACITORES } from '../data/quiz'

const EJEMPLOS: Ejemplo[] = [
  { nombre: 'Ejemplo del curso', conexion: 'serie', valores: [['2', 0], ['4', 0]], voltaje: '120' },
  { nombre: 'Tres en paralelo', conexion: 'paralelo', valores: [['3', 0], ['6', 0], ['470', 1]], voltaje: '12' },
]

export default function CapacitoresPage() {
  return (
    <TopicPage
      dot="var(--copper)"
      modulo="Módulo 2 · Potencial eléctrico y capacitancia"
      titulo="Capacitores en serie y en paralelo"
      intro="Un capacitor almacena carga y energía gracias a una diferencia de potencial. Aquí se juntan los dos temas del módulo: el potencial eléctrico V y la capacitancia C = Q/V."
      repaso={<Quiz preguntas={QUIZ_CAPACITORES} />}
      laboratorio={
        <>
          <div className="theory">
            <div>
              <h2>Potencial y capacitancia</h2>
              <p>El potencial eléctrico es la energía potencial por unidad de carga (1 V = 1 J/C). Si enfrentamos dos placas conductoras separadas por un dieléctrico y les aplicamos un voltaje V, se forma un capacitor: la carga Q que almacena es proporcional a V.</p>
            </div>
            <Formula tex="C=\frac{Q}{V}\qquad C=\varepsilon_0\frac{A}{d}" nota="1 farad (F) = 1 C/V. La capacitancia crece con el área de las placas y disminuye con su separación." />
            <div>
              <h2>Conexión en serie</h2>
              <p>Todos los capacitores tienen la <b>misma carga</b> y el voltaje de la batería se reparte entre ellos.</p>
            </div>
            <Formula tex="\frac{1}{C_e}=\frac{1}{C_1}+\frac{1}{C_2}+\cdots" nota="Q = Q₁ = Q₂ = … · V = V₁ + V₂ + … · Para dos capacitores: Cₑ = C₁C₂/(C₁+C₂)" />
            <div>
              <h2>Conexión en paralelo</h2>
              <p>Todos los capacitores tienen el <b>mismo voltaje</b> y la carga total se reparte entre ellos.</p>
            </div>
            <Formula tex="C_e=C_1+C_2+\cdots" nota="V = V₁ = V₂ = … · Q = Q₁ + Q₂ + …" />
            <Formula tex="U=\tfrac12 CV^2" nota="Energía almacenada en el capacitor, en joules (J)." />
            <div className="callout copper"><b>Truco para recordar.</b> Los capacitores se combinan al revés que las resistencias: en serie se suman los inversos y en paralelo se suman directo.</div>
            <div className="worked">
              <h2 style={{ fontSize: '1.1rem' }}>Ejemplo resuelto del curso</h2>
              <p>Capacitores de 2 µF y 4 µF en serie conectados a 120 V:</p>
              <Tex block>{'C_e=\\frac{(2)(4)}{2+4}=1.33\\,\\mu\\text{F}\\qquad Q=(1.33\\,\\mu\\text{F})(120\\,\\text{V})=160\\,\\mu\\text{C}'}</Tex>
              <Tex block>{'V_{4\\mu F}=\\frac{160\\,\\mu\\text{C}}{4\\,\\mu\\text{F}}=40\\,\\text{V}'}</Tex>
            </div>
            <div>
              <h2>¿Dónde los vemos?</h2>
              <div className="uses">
                <div className="use"><b>Flash de la cámara</b>Un capacitor se carga despacio y se descarga de golpe.</div>
                <div className="use"><b>Desfibriladores</b>Entregan una descarga controlada que puede salvar vidas.</div>
                <div className="use"><b>Cargadores y fuentes</b>Suavizan el voltaje para proteger tus aparatos.</div>
              </div>
            </div>
          </div>
          <NetworkCalculator tipo="C" ejemplos={EJEMPLOS} />
        </>
      }
    />
  )
}
