export interface Pregunta {
  pregunta: string
  opciones: string[]
  correcta: number
  explicacion: string
}

export const QUIZ_COULOMB: Pregunta[] = [
  { pregunta: 'Si la distancia entre dos cargas se duplica, ¿qué pasa con la fuerza?', opciones: ['Se duplica', 'Se reduce a la mitad', 'Se reduce a la cuarta parte', 'No cambia'], correcta: 2, explicacion: 'F depende de 1/r². Con 2r queda 1/(2r)² = 1/4 de la fuerza original.' },
  { pregunta: 'Una carga de +3 µC y otra de −8 µC…', opciones: ['Se repelen', 'Se atraen', 'No interactúan'], correcta: 1, explicacion: 'Tienen signos opuestos, por eso se atraen.' },
  { pregunta: '¿En qué unidad se mide el campo eléctrico?', opciones: ['N/C', 'C/N', 'N·m²/C²', 'J'], correcta: 0, explicacion: 'E = F/q₀, así que se mide en newton por coulomb (equivalente a V/m).' },
  { pregunta: 'Si una de las cargas se triplica y la distancia no cambia, la fuerza…', opciones: ['Se triplica', 'Se multiplica por 9', 'Se reduce a 1/3', 'No cambia'], correcta: 0, explicacion: 'F es directamente proporcional a cada carga: si q₁ se triplica, F se triplica.' },
  { pregunta: 'Las líneas de campo eléctrico…', opciones: ['Entran en las cargas positivas', 'Salen de las cargas positivas y entran en las negativas', 'Son siempre circulares'], correcta: 1, explicacion: 'Por convención salen de las cargas positivas y terminan en las negativas.' },
]

export const QUIZ_CAPACITORES: Pregunta[] = [
  { pregunta: 'En una conexión en serie, ¿qué tienen igual todos los capacitores?', opciones: ['El voltaje', 'La carga', 'La capacitancia'], correcta: 1, explicacion: 'En serie la carga es la misma en todos y el voltaje se reparte.' },
  { pregunta: 'Dos capacitores de 6 µF en paralelo equivalen a…', opciones: ['3 µF', '6 µF', '12 µF', '36 µF'], correcta: 2, explicacion: 'En paralelo se suman directo: 6 + 6 = 12 µF.' },
  { pregunta: 'Dos capacitores de 6 µF en serie equivalen a…', opciones: ['3 µF', '6 µF', '12 µF'], correcta: 0, explicacion: 'En serie: Cₑ = C₁C₂/(C₁+C₂) = 36/12 = 3 µF.' },
  { pregunta: '¿Qué es 1 farad?', opciones: ['1 C/V', '1 V/C', '1 J/C', '1 N/C'], correcta: 0, explicacion: 'C = Q/V, así que 1 F = 1 coulomb por volt.' },
  { pregunta: 'Si se duplica el voltaje aplicado a un capacitor, la carga almacenada…', opciones: ['Se duplica', 'Se reduce a la mitad', 'No cambia'], correcta: 0, explicacion: 'Q = C·V: con C constante, Q es proporcional a V.' },
]

export const QUIZ_OHM: Pregunta[] = [
  { pregunta: 'Una resistencia de 6 Ω conectada a 12 V. ¿Qué corriente pasa?', opciones: ['72 A', '2 A', '0.5 A', '18 A'], correcta: 1, explicacion: 'I = V/R = 12/6 = 2 A.' },
  { pregunta: 'Dos focos iguales a la misma fuente, ¿cómo dan más luz?', opciones: ['En serie', 'En paralelo', 'Igual en ambos casos'], correcta: 1, explicacion: 'En paralelo la resistencia equivalente es menor (R/2), circula más corriente y cada foco recibe todo el voltaje.' },
  { pregunta: 'Los tomacorrientes de una casa están conectados en…', opciones: ['Serie', 'Paralelo'], correcta: 1, explicacion: 'En paralelo, para que todos reciban 120 V y uno pueda desconectarse sin afectar a los demás.' },
  { pregunta: '¿Cuál es la potencia de una resistencia de 10 Ω por la que pasan 2 A?', opciones: ['20 W', '5 W', '40 W', '200 W'], correcta: 2, explicacion: 'P = I²R = 2² · 10 = 40 W.' },
  { pregunta: 'En resistencias en paralelo, la resistencia equivalente es…', opciones: ['Mayor que la mayor', 'Menor que la menor', 'Igual al promedio'], correcta: 1, explicacion: 'Al agregar caminos para la corriente, la resistencia total baja: siempre es menor que la menor de las resistencias.' },
]
