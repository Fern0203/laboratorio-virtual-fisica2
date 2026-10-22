import { useState } from 'react'
import type { Pregunta } from '../data/quiz'

/** Cuestionario de repaso: una pregunta a la vez, con retroalimentación y puntaje final. */
export function Quiz({ preguntas }: { preguntas: Pregunta[] }) {
  const [i, setI] = useState(0)
  const [eleccion, setEleccion] = useState<number | null>(null)
  const [aciertos, setAciertos] = useState(0)
  const [fin, setFin] = useState(false)
  const q = preguntas[i]

  const elegir = (j: number) => {
    if (eleccion !== null) return
    setEleccion(j)
    if (j === q.correcta) setAciertos((a) => a + 1)
  }
  const siguiente = () => {
    if (i + 1 >= preguntas.length) setFin(true)
    else { setI(i + 1); setEleccion(null) }
  }
  const reiniciar = () => { setI(0); setEleccion(null); setAciertos(0); setFin(false) }

  if (fin) {
    const pct = Math.round((aciertos / preguntas.length) * 100)
    return (
      <div className="quiz">
        <div className="qcard" aria-live="polite">
          <span className="eyebrow">Resultado</span>
          <div className="score-big">{aciertos} / {preguntas.length}</div>
          <p>{pct === 100 ? '¡Excelente! Dominas el tema.' : pct >= 60 ? 'Buen trabajo. Repasa las preguntas que fallaste.' : 'Vuelve a la teoría y usa la calculadora para practicar.'}</p>
          <div className="row"><button type="button" className="btn primary" onClick={reiniciar}>Intentar de nuevo</button></div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span className="muted">Pregunta {i + 1} de {preguntas.length}</span>
        <span className="muted">Aciertos: {aciertos}</span>
      </div>
      <div className="progress" aria-hidden="true"><div style={{ width: `${(i / preguntas.length) * 100}%` }} /></div>
      <div className="qcard">
        <h3>{q.pregunta}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {q.opciones.map((op, j) => {
            const estado = eleccion === null ? '' : j === q.correcta ? ' right' : j === eleccion ? ' wrong' : ''
            return (
              <button key={j} type="button" className={`option${estado}`} disabled={eleccion !== null} onClick={() => elegir(j)}>
                <span className="letter">{String.fromCharCode(65 + j)}</span><span>{op}</span>
              </button>
            )
          })}
        </div>
        {eleccion !== null && (
          <div className={`feedback ${eleccion === q.correcta ? 'right' : 'wrong'}`} aria-live="polite">
            <b>{eleccion === q.correcta ? '¡Correcto! ' : 'No es correcto. '}</b>{q.explicacion}
          </div>
        )}
        <div className="row">
          <button type="button" className="btn primary" disabled={eleccion === null} onClick={siguiente}>
            {i + 1 >= preguntas.length ? 'Ver resultado' : 'Siguiente pregunta'}
          </button>
        </div>
      </div>
    </div>
  )
}
