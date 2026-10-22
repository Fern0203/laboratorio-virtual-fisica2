import { CoulombLab } from '../components/CoulombLab'
import { TopicPage } from '../components/Layout'
import { Quiz } from '../components/Quiz'
import { Formula, Tex } from '../components/ui'
import { QUIZ_COULOMB } from '../data/quiz'

export default function CoulombPage() {
  return (
    <TopicPage
      dot="var(--pos)"
      modulo="Módulo 1 · Electrostática"
      titulo="Ley de Coulomb y campo eléctrico"
      intro="Es la base de toda la electrostática: describe la fuerza entre dos cargas puntuales. De ella salen el campo eléctrico, el flujo y la Ley de Gauss."
      repaso={<Quiz preguntas={QUIZ_COULOMB} />}
      laboratorio={
        <>
          <div className="theory">
            <div>
              <h2>¿Qué dice la ley?</h2>
              <p>La fuerza eléctrica entre dos cargas puntuales es directamente proporcional al producto de las cargas e inversamente proporcional al cuadrado de la distancia que las separa. Las cargas del mismo signo se repelen y las de signo contrario se atraen.</p>
            </div>
            <Formula tex="F = k\,\frac{|q_1\,q_2|}{r^2}" nota="con k = 1/(4πε₀) ≈ 9 × 10⁹ N·m²/C²" />
            <table className="vars">
              <tbody>
                <tr><td><Tex>F</Tex></td><td>Fuerza eléctrica</td><td>N</td></tr>
                <tr><td><Tex>{'q_1,\\,q_2'}</Tex></td><td>Cargas eléctricas</td><td>C</td></tr>
                <tr><td><Tex>r</Tex></td><td>Distancia entre las cargas</td><td>m</td></tr>
                <tr><td><Tex>{'\\varepsilon_0'}</Tex></td><td>Permitividad del vacío, 8.85 × 10⁻¹²</td><td>C²/(N·m²)</td></tr>
              </tbody>
            </table>
            <div>
              <h2>Del Coulomb al campo eléctrico</h2>
              <p>Si dividimos la fuerza entre una carga de prueba q₀ obtenemos el campo eléctrico que produce una carga Q a una distancia r. El campo sale de las cargas positivas y entra en las negativas.</p>
            </div>
            <Formula tex="\vec E = \frac{\vec F}{q_0}\qquad E = k\,\frac{|Q|}{r^2}" nota="Unidad: N/C, equivalente a V/m" />
            <div className="callout"><b>Ley del inverso del cuadrado.</b> Si duplicas la distancia, la fuerza baja a la cuarta parte; si la triplicas, a la novena parte. Compruébalo con el deslizador del simulador.</div>
            <div className="worked">
              <h2 style={{ fontSize: '1.1rem' }}>Ejemplo resuelto del curso</h2>
              <p>Dos cargas de 3 µC y −8 µC están separadas 2 m. ¿Qué fuerza actúa entre ellas?</p>
              <Tex block>{'F=(9\\times10^9)\\frac{(3\\times10^{-6})(8\\times10^{-6})}{(2)^2}=0.054\\ \\text{N}'}</Tex>
              <p className="muted">Como los signos son opuestos, la fuerza es de atracción.</p>
            </div>
            <div>
              <h2>¿Dónde la vemos?</h2>
              <div className="uses">
                <div className="use"><b>Fotocopiadoras</b>El tóner se pega al papel por atracción electrostática.</div>
                <div className="use"><b>Pintura electrostática</b>Las gotas cargadas se adhieren mejor a carros y electrodomésticos.</div>
                <div className="use"><b>Filtros de aire</b>Atrapan polvo y humo cargando las partículas.</div>
              </div>
            </div>
          </div>
          <CoulombLab />
        </>
      }
    />
  )
}
