/**
 * Contenido de todos los temas del curso (módulos 1, 2 y 3).
 * Cada tema trae: explicación, conceptos y pasos clave, fórmulas, 3 ejercicios resueltos
 * (tomados de las diapositivas del curso o, si no había, ejercicios de apoyo) y hasta 5 herramientas.
 * Constantes usadas: k = 9×10⁹ N·m²/C², ε₀ = 8.85×10⁻¹² C²/(N·m²), e = 1.602×10⁻¹⁹ C.
 */

export interface Paso { texto: string; tex?: string }
export interface Ejercicio {
  titulo: string
  fuente: 'diapositivas' | 'apoyo'
  enunciado: string
  pasos: Paso[]
  respuesta: string
}
export interface Herramienta { nombre: string; url: string; descripcion: string; tipo: string }
export interface Formula { tex: string; nota: string }

export interface Tema {
  slug: string
  modulo: 1 | 2 | 3
  titulo: string
  resumen: string
  descripcion: string[]
  conceptos: string[]
  formulas: Formula[]
  pasos: string[]
  ojo: string
  ejercicios: Ejercicio[]
  herramientas: Herramienta[]
  palabras: string[]
  calculadora?: boolean
}

export const MODULOS = [
  { n: 1 as const, nombre: 'Electrostática', descripcion: 'Cargas en reposo: cómo se cargan los cuerpos, la fuerza entre cargas, el campo que producen y la Ley de Gauss.', color: 'var(--pos)' },
  { n: 2 as const, nombre: 'Potencial eléctrico y capacitancia', descripcion: 'La energía por unidad de carga y los dispositivos que almacenan carga: los capacitores.', color: 'var(--copper)' },
  { n: 3 as const, nombre: 'Corriente eléctrica y magnetismo', descripcion: 'Cargas en movimiento: corriente, Ley de Ohm, circuitos y los efectos del campo magnético.', color: 'var(--teal)' },
]

const PHET = (sim: string) => `https://phet.colorado.edu/es/simulations/${sim}`

export const TEMAS: Tema[] = [
  /* ═════════════════════════ MÓDULO 1 ═════════════════════════ */
  {
    slug: 'carga-electrica',
    modulo: 1,
    titulo: 'Carga eléctrica y electrización',
    resumen: 'Qué es la carga, cómo se cargan los cuerpos y por qué la carga se conserva.',
    descripcion: [
      'La materia está formada por átomos con protones (carga positiva) y electrones (carga negativa) de igual magnitud. Un cuerpo es neutro cuando tiene la misma cantidad de ambos; se carga cuando gana electrones (queda negativo) o los pierde (queda positivo). Los protones no se mueven: lo que se transfiere siempre son electrones.',
      'Los cuerpos se pueden electrizar por frotamiento, por contacto o por inducción. En el frotamiento, la serie triboeléctrica indica qué material queda positivo y cuál negativo. La carga se mide en coulombs (C) y siempre es un múltiplo de la carga del electrón.',
    ],
    conceptos: [
      'Cargas iguales se repelen; cargas opuestas se atraen.',
      'Conductores (metales) dejan mover los electrones; aislantes (plástico, vidrio) no.',
      'Frotamiento: un material le arranca electrones al otro (serie triboeléctrica: piel de conejo, vidrio, pelo… teflón).',
      'Contacto: dos conductores que se tocan se reparten la carga total.',
      'Inducción: se separan las cargas de un cuerpo sin tocarlo, solo acercando otro cargado.',
      'Conservación: la carga total de un sistema aislado no cambia, solo se reparte.',
    ],
    formulas: [
      { tex: 'q = n\\,e', nota: 'La carga está cuantizada: n electrones por e = 1.602 × 10⁻¹⁹ C.' },
      { tex: '1\\ \\text{C} = 6.24\\times10^{18}\\ \\text{electrones}', nota: 'Prefijos usados: 1 µC = 10⁻⁶ C, 1 nC = 10⁻⁹ C, 1 pC = 10⁻¹² C.' },
    ],
    pasos: [
      'Identifica si el cuerpo ganó electrones (carga negativa) o los perdió (carga positiva).',
      'Convierte la carga a coulombs (µC → ×10⁻⁶, nC → ×10⁻⁹).',
      'Usa n = q/e para pasar de carga a número de electrones.',
      'En contacto entre conductores iguales, suma las cargas (con signo) y divide entre el número de cuerpos.',
    ],
    ojo: 'La carga de los electrones es negativa. Si un cuerpo “gana 2 × 10¹³ electrones” su carga es negativa, no positiva.',
    ejercicios: [
      {
        titulo: 'Electrones en un coulomb',
        fuente: 'diapositivas',
        enunciado: '¿Cuántos electrones se necesitan para formar una carga de 1 C?',
        pasos: [
          { texto: 'Despejamos n de q = n·e:', tex: 'n=\\frac{q}{e}' },
          { texto: 'Sustituimos:', tex: 'n=\\frac{1\\ \\text{C}}{1.602\\times10^{-19}\\ \\text{C}}=6.24\\times10^{18}' },
        ],
        respuesta: 'n = 6.24 × 10¹⁸ electrones',
      },
      {
        titulo: 'Globo frotado con el pelo',
        fuente: 'apoyo',
        enunciado: 'Un globo frotado con el pelo queda con una carga de −3.2 µC. ¿Cuántos electrones ganó?',
        pasos: [
          { texto: 'Convertimos la carga a coulombs (usamos la magnitud):', tex: '|q| = 3.2\\times10^{-6}\\ \\text{C}' },
          { texto: 'Aplicamos n = q/e:', tex: 'n=\\frac{3.2\\times10^{-6}}{1.602\\times10^{-19}}=2.0\\times10^{13}' },
          { texto: 'Como la carga es negativa, el globo ganó esos electrones.' },
        ],
        respuesta: 'Ganó 2.0 × 10¹³ electrones',
      },
      {
        titulo: 'Esferas que se tocan',
        fuente: 'apoyo',
        enunciado: 'Dos esferas metálicas idénticas tienen +6 µC y −2 µC. Se ponen en contacto y luego se separan. ¿Qué carga queda en cada una?',
        pasos: [
          { texto: 'Por conservación, la carga total se mantiene:', tex: 'Q_{total}=(+6)+(-2)=+4\\ \\mu\\text{C}' },
          { texto: 'Como son idénticas, se reparten la carga por igual:', tex: 'q=\\frac{+4\\ \\mu\\text{C}}{2}=+2\\ \\mu\\text{C}' },
        ],
        respuesta: 'Cada esfera queda con +2 µC',
      },
    ],
    herramientas: [
      { nombre: 'PhET: Globos y electricidad estática', url: PHET('balloons-and-static-electricity'), descripcion: 'Frota un globo con un suéter y observa cómo se transfieren los electrones.', tipo: 'Simulador' },
      { nombre: 'PhET: John Travoltage', url: PHET('john-travoltage'), descripcion: 'Carga a una persona frotando el pie en la alfombra y provoca una descarga.', tipo: 'Simulador' },
      { nombre: 'PhET: Cargas y campos', url: PHET('charges-and-fields'), descripcion: 'Coloca cargas positivas y negativas y mira cómo interactúan.', tipo: 'Simulador' },
      { nombre: 'Wolfram Alpha', url: 'https://www.wolframalpha.com', descripcion: 'Comprueba conversiones como “3.2 microcoulomb / elementary charge”.', tipo: 'Calculadora' },
    ],
    palabras: ['carga', 'electron', 'proton', 'frotamiento', 'induccion', 'contacto', 'triboelectrica', 'conductor', 'aislante', 'coulomb'],
  },
  {
    slug: 'ley-de-coulomb',
    modulo: 1,
    titulo: 'Ley de Coulomb',
    resumen: 'La fuerza de atracción o repulsión entre dos cargas puntuales.',
    descripcion: [
      'La Ley de Coulomb dice que la fuerza entre dos cargas puntuales es directamente proporcional al producto de las cargas e inversamente proporcional al cuadrado de la distancia que las separa. Si las cargas son del mismo signo se repelen; si son de signo contrario se atraen.',
      'Es una ley del inverso del cuadrado: si la distancia se duplica, la fuerza se reduce a la cuarta parte. Cuando hay más de dos cargas, la fuerza sobre una de ellas es la suma vectorial de las fuerzas que le hace cada una de las demás (principio de superposición).',
    ],
    conceptos: [
      'La fuerza actúa sobre la línea que une las dos cargas.',
      'Las dos cargas sienten la misma fuerza en magnitud, en sentidos opuestos (3.ª ley de Newton).',
      'k = 1/(4πε₀) ≈ 9 × 10⁹ N·m²/C².',
      'Con varias cargas, se calcula cada fuerza por separado y se suman como vectores.',
    ],
    formulas: [
      { tex: 'F=k\\,\\frac{|q_1\\,q_2|}{r^2}', nota: 'F en newtons (N), q en coulombs (C), r en metros (m).' },
      { tex: '|q_2|=\\frac{F\\,r^2}{k\\,|q_1|}', nota: 'Despeje para encontrar una de las cargas.' },
    ],
    pasos: [
      'Anota los datos y convierte todo al SI (µC → C, cm → m).',
      'Usa la magnitud de las cargas en la fórmula; el signo solo dice si atraen o repelen.',
      'Eleva la distancia al cuadrado antes de dividir.',
      'Indica el tipo de fuerza: repulsión (mismo signo) o atracción (signos opuestos).',
      'Si hay tres o más cargas, dibuja las fuerzas y súmalas por componentes.',
    ],
    ojo: 'El error más común es olvidar elevar r al cuadrado o no convertir los µC a C.',
    ejercicios: [
      {
        titulo: 'Problema 1 de las diapositivas',
        fuente: 'diapositivas',
        enunciado: 'Una carga de 3 × 10⁻⁶ C se encuentra a 2 m de una carga de −8 × 10⁻⁶ C. ¿Cuál es la magnitud de la fuerza de atracción entre las cargas?',
        pasos: [
          { texto: 'Escribimos la ley:', tex: 'F=k\\frac{|q_1q_2|}{r^2}' },
          { texto: 'Sustituimos:', tex: 'F=(9\\times10^9)\\frac{(3\\times10^{-6})(8\\times10^{-6})}{(2)^2}' },
          { texto: 'Resolvemos:', tex: 'F=\\frac{0.216}{4}=0.054\\ \\text{N}' },
          { texto: 'Los signos son opuestos, por eso es atracción.' },
        ],
        respuesta: 'F = 0.054 N (5.4 × 10⁻² N), de atracción',
      },
      {
        titulo: 'Problema 2 de las diapositivas',
        fuente: 'diapositivas',
        enunciado: 'Una carga de −5 × 10⁻⁷ C ejerce una fuerza de 0.237 N sobre otra carga a una distancia de 3.5 m. ¿Cuál es el valor de la segunda carga?',
        pasos: [
          { texto: 'Despejamos q₂ de la Ley de Coulomb:', tex: '|q_2|=\\frac{F\\,r^2}{k\\,|q_1|}' },
          { texto: 'Sustituimos:', tex: '|q_2|=\\frac{(0.237)(3.5)^2}{(9\\times10^9)(5\\times10^{-7})}=\\frac{2.903}{4500}' },
          { texto: 'Resolvemos:', tex: '|q_2|=6.45\\times10^{-4}\\ \\text{C}' },
        ],
        respuesta: '|q₂| = 6.45 × 10⁻⁴ C (645 µC)',
      },
      {
        titulo: 'Dos cargas positivas',
        fuente: 'diapositivas',
        enunciado: 'Dos cargas puntuales de +50 µC y +40 µC están en el vacío separadas 2 m. Obtén la fuerza que se ejercen.',
        pasos: [
          { texto: 'Convertimos:', tex: 'q_1=50\\times10^{-6}\\ \\text{C},\\quad q_2=40\\times10^{-6}\\ \\text{C}' },
          { texto: 'Sustituimos:', tex: 'F=(9\\times10^9)\\frac{(50\\times10^{-6})(40\\times10^{-6})}{2^2}=4.5\\ \\text{N}' },
          { texto: 'Ambas son positivas, por eso se repelen.' },
        ],
        respuesta: 'F = 4.5 N, de repulsión',
      },
    ],
    herramientas: [
      { nombre: 'PhET: Ley de Coulomb', url: PHET('coulombs-law'), descripcion: 'Cambia las cargas y la distancia y mide la fuerza en tiempo real.', tipo: 'Simulador' },
      { nombre: 'PhET: Cargas y campos', url: PHET('charges-and-fields'), descripcion: 'Arma sistemas de varias cargas para practicar la superposición.', tipo: 'Simulador' },
      { nombre: 'Desmos', url: 'https://www.desmos.com/calculator', descripcion: 'Grafica F = k·q₁q₂/r² y comprueba la ley del inverso del cuadrado.', tipo: 'Graficadora' },
      { nombre: 'Wolfram Alpha', url: 'https://www.wolframalpha.com', descripcion: 'Resuelve y verifica la sustitución con unidades.', tipo: 'Calculadora' },
    ],
    palabras: ['coulomb', 'fuerza', 'cargas', 'atraccion', 'repulsion', 'inverso del cuadrado', 'superposicion'],
  },
  {
    slug: 'campo-electrico',
    modulo: 1,
    titulo: 'Campo eléctrico',
    resumen: 'La región alrededor de una carga donde otra carga siente una fuerza.',
    descripcion: [
      'Una carga modifica el espacio que la rodea creando un campo eléctrico. Si colocamos una carga de prueba positiva q₀ en un punto, el campo en ese punto es la fuerza que siente dividida entre q₀. Es un vector: tiene magnitud, dirección y sentido.',
      'Se representa con líneas de campo que salen de las cargas positivas y entran en las negativas. Donde las líneas están más juntas, el campo es más intenso. Con varias cargas, el campo total es la suma vectorial de los campos de cada una.',
    ],
    conceptos: [
      'El campo apunta hacia afuera de una carga positiva y hacia adentro de una negativa.',
      'Las líneas de campo nunca se cruzan.',
      'Unidad: N/C, equivalente a V/m.',
      'Si conoces E, la fuerza sobre cualquier carga es F = q·E.',
      'Entre dos placas paralelas cargadas el campo es uniforme.',
    ],
    formulas: [
      { tex: '\\vec E=\\frac{\\vec F}{q_0}', nota: 'Definición: fuerza por unidad de carga.' },
      { tex: 'E=k\\,\\frac{|Q|}{r^2}', nota: 'Campo de una carga puntual a una distancia r.' },
      { tex: '\\vec E_{total}=\\vec E_1+\\vec E_2+\\cdots', nota: 'Principio de superposición.' },
    ],
    pasos: [
      'Dibuja la carga fuente y el punto donde quieres el campo.',
      'Calcula la magnitud de cada campo con E = k|Q|/r².',
      'Dibuja la dirección: se aleja de las positivas y se acerca a las negativas.',
      'Si hay varias cargas, descompón en x e y y suma.',
      'Para la fuerza sobre una carga en ese punto, usa F = qE.',
    ],
    ojo: 'En el punto medio entre dos cargas iguales y de signo contrario, los campos no se anulan: se suman, porque ambos apuntan hacia la negativa.',
    ejercicios: [
      {
        titulo: 'Campo a varias distancias',
        fuente: 'diapositivas',
        enunciado: 'Halla la intensidad del campo eléctrico creado por una carga positiva de 1 µC a 1 m, 2 m, 3 m y 4 m de distancia, en el vacío.',
        pasos: [
          { texto: 'A 1 m:', tex: 'E=(9\\times10^9)\\frac{1\\times10^{-6}}{1^2}=9000\\ \\text{N/C}' },
          { texto: 'A 2 m (la distancia se duplica, E baja a la cuarta parte):', tex: 'E=\\frac{9000}{4}=2250\\ \\text{N/C}' },
          { texto: 'A 3 m y 4 m:', tex: 'E_3=\\frac{9000}{9}=1000\\ \\text{N/C},\\quad E_4=\\frac{9000}{16}=562.5\\ \\text{N/C}' },
        ],
        respuesta: '9000, 2250, 1000 y 562.5 N/C',
      },
      {
        titulo: 'Campo y fuerza a 30 cm',
        fuente: 'diapositivas',
        enunciado: 'Halla: a) la intensidad del campo eléctrico en el aire a 30 cm de q₁ = 5 × 10⁻⁹ C; b) la fuerza sobre q₂ = 4 × 10⁻¹⁰ C situada a 30 cm de q₁.',
        pasos: [
          { texto: 'a) Campo a r = 0.30 m:', tex: 'E=(9\\times10^9)\\frac{5\\times10^{-9}}{(0.30)^2}=500\\ \\text{N/C}' },
          { texto: 'b) Fuerza sobre q₂:', tex: 'F=q_2E=(4\\times10^{-10})(500)=2\\times10^{-7}\\ \\text{N}' },
        ],
        respuesta: 'a) E = 5 × 10² N/C; b) F = 2 × 10⁻⁷ N',
      },
      {
        titulo: 'Punto medio entre dos cargas',
        fuente: 'diapositivas',
        enunciado: 'Calcula la intensidad del campo eléctrico en el punto medio entre dos cargas de +10⁻⁸ C y −10⁻⁸ C separadas 6 m en el aire.',
        pasos: [
          { texto: 'Cada carga está a 3 m del punto medio. Campo de cada una:', tex: 'E_1=E_2=(9\\times10^9)\\frac{10^{-8}}{3^2}=10\\ \\text{N/C}' },
          { texto: 'El campo de la positiva se aleja de ella y el de la negativa apunta hacia ella: los dos van en el mismo sentido y se suman.', tex: 'E=10+10=20\\ \\text{N/C}' },
        ],
        respuesta: 'E = 20 N/C, dirigido hacia la carga negativa',
      },
    ],
    herramientas: [
      { nombre: 'PhET: Cargas y campos', url: PHET('charges-and-fields'), descripcion: 'Muestra el vector campo y las líneas equipotenciales de cualquier arreglo de cargas.', tipo: 'Simulador' },
      { nombre: 'Falstad: campos electrostáticos 2D', url: 'https://www.falstad.com/emstatic/', descripcion: 'Visualiza líneas de campo de dipolos, placas y otras distribuciones.', tipo: 'Simulador' },
      { nombre: 'GeoGebra', url: 'https://www.geogebra.org/calculator', descripcion: 'Dibuja vectores y suma componentes del campo de varias cargas.', tipo: 'Graficadora' },
      { nombre: 'Desmos', url: 'https://www.desmos.com/calculator', descripcion: 'Grafica E contra r para ver cómo cae con el cuadrado de la distancia.', tipo: 'Graficadora' },
    ],
    palabras: ['campo', 'electrico', 'lineas de campo', 'carga de prueba', 'n/c', 'superposicion', 'vector'],
  },
  {
    slug: 'flujo-electrico',
    modulo: 1,
    titulo: 'Flujo eléctrico',
    resumen: 'Cuántas líneas de campo eléctrico atraviesan una superficie.',
    descripcion: [
      'El flujo eléctrico mide la cantidad de líneas de campo que atraviesan una superficie. Imagina el campo como lluvia y la superficie como una cubeta: el flujo es el agua que entra. Depende de la intensidad del campo, del tamaño del área y de su orientación.',
      'La orientación se mide con el ángulo θ entre el campo y la normal (la línea perpendicular) a la superficie. Si la superficie está de frente al campo (θ = 0°) el flujo es máximo; si está de lado (θ = 90°), es cero.',
    ],
    conceptos: [
      'El área se trata como un vector perpendicular a la superficie.',
      'θ = 0° → flujo máximo, Φ = EA.',
      'θ = 90° → flujo nulo.',
      'Para superficies curvas o campos no uniformes se usa la integral.',
      'Unidad: N·m²/C.',
    ],
    formulas: [
      { tex: '\\Phi_E=E\\,A\\cos\\theta', nota: 'Campo uniforme sobre una superficie plana.' },
      { tex: '\\Phi_E=\\int \\vec E\\cdot d\\vec A', nota: 'Caso general.' },
    ],
    pasos: [
      'Calcula el área de la superficie (A = l², A = πr², A = base × altura).',
      'Identifica el ángulo entre el campo y la normal de la superficie, no entre el campo y la superficie.',
      'Sustituye en Φ = EA cos θ.',
      'Revisa el signo: si las líneas entran a una superficie cerrada, el flujo es negativo.',
    ],
    ojo: 'Si el problema da el ángulo entre el campo y la superficie, el ángulo con la normal es 90° menos ese valor.',
    ejercicios: [
      {
        titulo: 'Problema 1: la pirámide',
        fuente: 'diapositivas',
        enunciado: 'Una pirámide de base cuadrada horizontal de 6.00 m de lado y 4.00 m de altura está en un campo eléctrico vertical de 52.0 N/C. Calcula el flujo total a través de las cuatro caras inclinadas.',
        pasos: [
          { texto: 'Las líneas que entran por la base salen por las caras inclinadas, así que el flujo por las caras es igual al de la base. Área de la base:', tex: 'A=l^2=6^2=36\\ \\text{m}^2' },
          { texto: 'El campo es perpendicular a la base:', tex: '\\Phi_E=EA=(52.0)(36)=1872\\ \\text{N·m}^2/\\text{C}' },
        ],
        respuesta: 'Φ ≈ 1.87 × 10³ N·m²/C (la diapositiva redondea a 1870)',
      },
      {
        titulo: 'Rectángulo a distintos ángulos',
        fuente: 'apoyo',
        enunciado: 'Un campo uniforme de 3.5 × 10³ N/C atraviesa un rectángulo de 0.35 m × 0.70 m. Calcula el flujo si la normal del rectángulo forma con el campo: a) 0°, b) 60°, c) 90°.',
        pasos: [
          { texto: 'Área:', tex: 'A=(0.35)(0.70)=0.245\\ \\text{m}^2' },
          { texto: 'a) θ = 0°:', tex: '\\Phi=(3.5\\times10^3)(0.245)\\cos0^\\circ=857.5\\ \\text{N·m}^2/\\text{C}' },
          { texto: 'b) θ = 60°:', tex: '\\Phi=857.5\\cos60^\\circ=428.8\\ \\text{N·m}^2/\\text{C}' },
          { texto: 'c) θ = 90°: cos 90° = 0, ninguna línea atraviesa la superficie.', tex: '\\Phi=0' },
        ],
        respuesta: 'a) 858 N·m²/C; b) 429 N·m²/C; c) 0',
      },
      {
        titulo: 'Disco inclinado',
        fuente: 'apoyo',
        enunciado: 'Un disco de 10 cm de radio está en un campo uniforme de 2.0 × 10³ N/C. Su normal forma 30° con el campo. ¿Cuál es el flujo?',
        pasos: [
          { texto: 'Área del disco:', tex: 'A=\\pi r^2=\\pi(0.10)^2=0.0314\\ \\text{m}^2' },
          { texto: 'Flujo:', tex: '\\Phi=(2.0\\times10^3)(0.0314)\\cos30^\\circ=54.4\\ \\text{N·m}^2/\\text{C}' },
        ],
        respuesta: 'Φ ≈ 54 N·m²/C',
      },
    ],
    herramientas: [
      { nombre: 'Falstad: campos vectoriales 3D', url: 'https://www.falstad.com/vector3de/', descripcion: 'Muestra el campo de distintas distribuciones y el flujo a través de superficies.', tipo: 'Simulador' },
      { nombre: 'PhET: Cargas y campos', url: PHET('charges-and-fields'), descripcion: 'Observa la densidad de líneas que atraviesa una región.', tipo: 'Simulador' },
      { nombre: 'GeoGebra 3D', url: 'https://www.geogebra.org/3d', descripcion: 'Dibuja la superficie, su vector normal y el ángulo con el campo.', tipo: 'Graficadora' },
      { nombre: 'Wolfram Alpha', url: 'https://www.wolframalpha.com', descripcion: 'Calcula productos como E·A·cos θ e integrales de superficie.', tipo: 'Calculadora' },
    ],
    palabras: ['flujo', 'electrico', 'area', 'angulo', 'normal', 'superficie', 'lineas'],
  },
  {
    slug: 'ley-de-gauss',
    modulo: 1,
    titulo: 'Ley de Gauss',
    resumen: 'El flujo por una superficie cerrada depende solo de la carga que encierra.',
    descripcion: [
      'La Ley de Gauss es una de las cuatro ecuaciones de Maxwell. Dice que el flujo eléctrico neto a través de cualquier superficie cerrada (superficie gaussiana) es igual a la carga encerrada dividida entre ε₀. Las cargas que quedan afuera no cambian el flujo neto: sus líneas entran por un lado y salen por otro.',
      'Su gran utilidad es que, cuando hay simetría (esférica, cilíndrica o plana), convierte una integral difícil en una multiplicación sencilla y permite encontrar el campo eléctrico rápidamente.',
    ],
    conceptos: [
      'La superficie gaussiana es imaginaria; tú eliges su forma.',
      'Solo cuenta la carga de adentro: Q_enc = q₁ + q₂ + … (con signo).',
      'Si Q_enc = 0, el flujo neto es cero, aunque haya campo.',
      'En un conductor en equilibrio, toda la carga en exceso queda en la superficie.',
      'Aplicaciones: esferas cargadas, hilos infinitos y planos infinitos.',
    ],
    formulas: [
      { tex: '\\oint \\vec E\\cdot d\\vec A=\\frac{Q_{enc}}{\\varepsilon_0}', nota: 'ε₀ = 8.85 × 10⁻¹² C²/(N·m²).' },
      { tex: 'E\\,(4\\pi r^2)=\\frac{Q}{\\varepsilon_0}\\Rightarrow E=\\frac{Q}{4\\pi\\varepsilon_0 r^2}', nota: 'Esfera: se recupera la ley de Coulomb.' },
    ],
    pasos: [
      'Identifica la simetría del problema (esférica, cilíndrica o plana).',
      'Elige una superficie gaussiana con esa misma forma.',
      'Suma las cargas que quedan dentro de la superficie.',
      'Aplica la ley: Φ = Q_enc/ε₀.',
      'Si te piden el campo, despeja E (será constante sobre la superficie).',
    ],
    ojo: 'Una carga fuera de la superficie sí produce campo en ella, pero su flujo neto es cero. No la sumes en Q_enc.',
    ejercicios: [
      {
        titulo: 'Ejemplo conceptual: el dipolo',
        fuente: 'diapositivas',
        enunciado: 'Un dipolo tiene una carga +q y otra −q. La superficie A encierra solo +q, la B solo −q, la C encierra ambas y la D no encierra ninguna. Determina el flujo en cada una.',
        pasos: [
          { texto: 'Aplicamos Φ = Q_enc/ε₀ a cada superficie:', tex: '\\Phi_A=\\frac{+q}{\\varepsilon_0},\\quad \\Phi_B=\\frac{-q}{\\varepsilon_0}' },
          { texto: 'C encierra +q y −q, y D no encierra nada:', tex: '\\Phi_C=\\frac{q-q}{\\varepsilon_0}=0,\\quad \\Phi_D=0' },
        ],
        respuesta: 'A: +q/ε₀; B: −q/ε₀; C: 0; D: 0',
      },
      {
        titulo: 'Problema 2: el submarino',
        fuente: 'diapositivas',
        enunciado: 'Dentro de un submarino hay cargas de 5.00 mC, −9.00 mC, 27.0 mC y −84.0 mC. a) Calcula el flujo neto a través del casco. b) ¿Salen más líneas de las que entran?',
        pasos: [
          { texto: 'Sumamos las cargas encerradas:', tex: 'Q_{enc}=5-9+27-84=-61\\ \\text{mC}=-6.1\\times10^{-2}\\ \\text{C}' },
          { texto: 'Aplicamos la Ley de Gauss:', tex: '\\Phi=\\frac{-6.1\\times10^{-2}}{8.85\\times10^{-12}}=-6.89\\times10^{9}\\ \\text{N·m}^2/\\text{C}' },
          { texto: 'b) El flujo es negativo: entran más líneas de las que salen.' },
        ],
        respuesta: 'Φ = −6.89 × 10⁹ N·m²/C; entran más líneas de las que salen',
      },
      {
        titulo: 'Carga en el centro de un cubo',
        fuente: 'apoyo',
        enunciado: 'Una carga de 1.84 µC está en el centro de un cubo. ¿Cuál es el flujo total y cuánto pasa por cada cara?',
        pasos: [
          { texto: 'Flujo total por la Ley de Gauss:', tex: '\\Phi=\\frac{1.84\\times10^{-6}}{8.85\\times10^{-12}}=2.08\\times10^{5}\\ \\text{N·m}^2/\\text{C}' },
          { texto: 'Por simetría, las 6 caras reciben lo mismo:', tex: '\\Phi_{cara}=\\frac{2.08\\times10^5}{6}=3.47\\times10^{4}\\ \\text{N·m}^2/\\text{C}' },
        ],
        respuesta: 'Total 2.08 × 10⁵ N·m²/C; por cara 3.47 × 10⁴ N·m²/C',
      },
    ],
    herramientas: [
      { nombre: 'Falstad: campos vectoriales 3D', url: 'https://www.falstad.com/vector3de/', descripcion: 'Explora el campo de esferas, líneas y planos cargados en 3D.', tipo: 'Simulador' },
      { nombre: 'PhET: Cargas y campos', url: PHET('charges-and-fields'), descripcion: 'Comprueba que el campo de una esfera cargada se ve como el de una carga puntual.', tipo: 'Simulador' },
      { nombre: 'GeoGebra 3D', url: 'https://www.geogebra.org/3d', descripcion: 'Dibuja superficies gaussianas (esferas, cilindros) alrededor de la carga.', tipo: 'Graficadora' },
      { nombre: 'Wolfram Alpha', url: 'https://www.wolframalpha.com', descripcion: 'Verifica sumas de carga y divisiones entre ε₀.', tipo: 'Calculadora' },
    ],
    palabras: ['gauss', 'flujo', 'superficie gaussiana', 'carga encerrada', 'maxwell', 'simetria', 'epsilon'],
  },

  /* ═════════════════════════ MÓDULO 2 ═════════════════════════ */
  {
    slug: 'potencial-electrico',
    modulo: 2,
    titulo: 'Potencial eléctrico',
    resumen: 'La energía potencial por unidad de carga en cada punto del campo.',
    descripcion: [
      'Mover una carga dentro de un campo eléctrico cambia la energía potencial del sistema. Si dividimos esa energía entre la carga obtenemos el potencial eléctrico V, que depende solo de las cargas que crean el campo. Se mide en volts: 1 V = 1 J/C.',
      'Lo que importa en la práctica es la diferencia de potencial (el “voltaje”) entre dos puntos. Las líneas de campo siempre apuntan hacia donde el potencial disminuye, y los puntos con el mismo potencial forman superficies equipotenciales.',
    ],
    conceptos: [
      'Diferencia de potencial ≠ diferencia de energía potencial: ΔU = q·ΔV.',
      'El potencial es un escalar: con varias cargas se suman con su signo, sin vectores.',
      'Una carga positiva pierde energía potencial al moverse en la dirección del campo.',
      'En un campo uniforme: ΔV = −E·d.',
      '1 N/C = 1 V/m.',
    ],
    formulas: [
      { tex: 'V=k\\,\\frac{q}{r}', nota: 'Potencial de una carga puntual (con signo).' },
      { tex: '\\Delta V=-E\\,d\\qquad W=q\\,\\Delta V', nota: 'Campo uniforme y trabajo para mover una carga.' },
      { tex: 'U=k\\,\\frac{q_1q_2}{r}', nota: 'Energía potencial de un par de cargas.' },
    ],
    pasos: [
      'Calcula la distancia de cada carga al punto (usa Pitágoras si están en el plano).',
      'Calcula V de cada carga con su signo: V = kq/r.',
      'Suma los potenciales (son escalares).',
      'Para la energía o el trabajo, multiplica por la carga que se mueve: ΔU = qΔV.',
    ],
    ojo: 'En el potencial no se usa valor absoluto: una carga negativa produce un potencial negativo.',
    ejercicios: [
      {
        titulo: 'Campo entre placas paralelas',
        fuente: 'diapositivas',
        enunciado: 'Una batería de 12 V se conecta entre dos placas paralelas separadas 0.30 cm. Si el campo entre ellas es uniforme, ¿cuál es su magnitud?',
        pasos: [
          { texto: 'Convertimos la separación:', tex: 'd=0.30\\ \\text{cm}=3.0\\times10^{-3}\\ \\text{m}' },
          { texto: 'En un campo uniforme |ΔV| = E·d:', tex: 'E=\\frac{|\\Delta V|}{d}=\\frac{12}{3.0\\times10^{-3}}=4.0\\times10^{3}\\ \\text{V/m}' },
        ],
        respuesta: 'E = 4.0 × 10³ V/m',
      },
      {
        titulo: 'Potencial de dos cargas puntuales',
        fuente: 'diapositivas',
        enunciado: 'q₁ = 2.00 µC está en el origen y q₂ = −6.00 µC en (0, 3.00) m. a) Encuentra el potencial total en P (4.00, 0) m. b) ¿Cuánto cambia la energía potencial al traer q₃ = 3.00 µC desde el infinito hasta P?',
        pasos: [
          { texto: 'Distancias a P: r₁ = 4 m; r₂ por Pitágoras:', tex: 'r_2=\\sqrt{4^2+3^2}=5\\ \\text{m}' },
          { texto: 'a) Sumamos los potenciales:', tex: 'V_P=(9\\times10^9)\\left(\\frac{2\\times10^{-6}}{4}+\\frac{-6\\times10^{-6}}{5}\\right)=-6.30\\times10^{3}\\ \\text{V}' },
          { texto: 'b) El potencial en el infinito es cero:', tex: '\\Delta U=q_3V_P=(3\\times10^{-6})(-6.30\\times10^3)=-1.89\\times10^{-2}\\ \\text{J}' },
        ],
        respuesta: 'a) V_P = −6.30 × 10³ V; b) ΔU = −1.89 × 10⁻² J',
      },
      {
        titulo: 'Trabajo para acercar una carga',
        fuente: 'diapositivas',
        enunciado: 'Halla el trabajo necesario para trasladar una carga de 2 × 10⁻⁷ C desde un punto a 30 cm de una carga de 3 × 10⁻⁶ C hasta otro a 12 cm de la misma, en el vacío.',
        pasos: [
          { texto: 'Potenciales de la carga de 3 µC:', tex: 'V_{30}=\\frac{(9\\times10^9)(3\\times10^{-6})}{0.30}=9.0\\times10^4\\ \\text{V},\\quad V_{12}=\\frac{27000}{0.12}=2.25\\times10^5\\ \\text{V}' },
          { texto: 'Trabajo del agente externo:', tex: 'W=q\\,(V_{12}-V_{30})=(2\\times10^{-7})(1.35\\times10^5)=2.7\\times10^{-2}\\ \\text{J}' },
        ],
        respuesta: 'W = 2.7 × 10⁻² J',
      },
    ],
    herramientas: [
      { nombre: 'PhET: Cargas y campos', url: PHET('charges-and-fields'), descripcion: 'Mide el voltaje en cualquier punto y traza líneas equipotenciales.', tipo: 'Simulador' },
      { nombre: 'Falstad: campos electrostáticos 2D', url: 'https://www.falstad.com/emstatic/', descripcion: 'Muestra el potencial con colores y las superficies equipotenciales.', tipo: 'Simulador' },
      { nombre: 'GeoGebra', url: 'https://www.geogebra.org/calculator', descripcion: 'Calcula distancias entre puntos para sumar potenciales.', tipo: 'Graficadora' },
      { nombre: 'Desmos', url: 'https://www.desmos.com/calculator', descripcion: 'Grafica V = kq/r y compárala con E = kq/r².', tipo: 'Graficadora' },
    ],
    palabras: ['potencial', 'voltaje', 'volt', 'energia potencial', 'trabajo', 'equipotencial', 'diferencia de potencial'],
  },
  {
    slug: 'capacitancia',
    modulo: 2,
    titulo: 'Capacitancia y capacitores',
    resumen: 'Dispositivos que almacenan carga y energía; conexiones en serie y paralelo.',
    descripcion: [
      'Un capacitor son dos placas conductoras separadas por un dieléctrico. Al conectarlo a un voltaje V almacena una carga Q proporcional a V; la constante es la capacitancia C = Q/V, que se mide en farads (F). Crece con el área de las placas y disminuye con su separación.',
      'Varios capacitores se pueden reemplazar por uno equivalente. En serie todos tienen la misma carga y el voltaje se reparte; en paralelo todos tienen el mismo voltaje y la carga se reparte. Se combinan al revés que las resistencias.',
    ],
    conceptos: [
      '1 F = 1 C/V; en la práctica se usan µF, nF y pF.',
      'Serie: misma Q, V = V₁ + V₂ + …',
      'Paralelo: mismo V, Q = Q₁ + Q₂ + …',
      'Rigidez dieléctrica: campo máximo antes de que el aislante falle.',
      'Energía almacenada: U = ½CV².',
    ],
    formulas: [
      { tex: 'C=\\frac{Q}{V}\\qquad C=\\varepsilon_0\\frac{A}{d}', nota: 'Definición y capacitor de placas paralelas.' },
      { tex: '\\frac{1}{C_e}=\\frac{1}{C_1}+\\frac{1}{C_2}+\\cdots\\qquad C_e=C_1+C_2+\\cdots', nota: 'Izquierda: serie. Derecha: paralelo.' },
      { tex: 'C_e=\\frac{C_1C_2}{C_1+C_2}', nota: 'Atajo para dos capacitores en serie.' },
    ],
    pasos: [
      'Identifica qué capacitores están en serie y cuáles en paralelo.',
      'Reduce el circuito por partes hasta tener un solo capacitor equivalente.',
      'Calcula la carga total: Q = Cₑ·V.',
      'Regresa por las partes: en serie reparte el voltaje (V = Q/C); en paralelo reparte la carga (Q = CV).',
      'Verifica: los voltajes en serie deben sumar el de la batería.',
    ],
    ojo: 'En serie la capacitancia equivalente siempre es menor que la menor de las capacitancias.',
    ejercicios: [
      {
        titulo: 'Ejemplo del curso: circuito mixto',
        fuente: 'diapositivas',
        enunciado: 'C₁ = 3 µF está en paralelo con la combinación en serie de C₂ = 2 µF y C₃ = 4 µF, conectados a 120 V. Encuentra la capacitancia equivalente, la carga de cada capacitor y el voltaje en el de 4 µF.',
        pasos: [
          { texto: 'C₂ y C₃ en serie:', tex: 'C_{23}=\\frac{(2)(4)}{2+4}=1.33\\ \\mu\\text{F}' },
          { texto: 'En paralelo con C₁:', tex: 'C_e=3+1.33=4.33\\ \\mu\\text{F}' },
          { texto: 'Carga total y carga de C₁:', tex: 'Q=(4.33)(120)=520\\ \\mu\\text{C},\\quad Q_1=(3)(120)=360\\ \\mu\\text{C}' },
          { texto: 'El resto queda en la rama en serie:', tex: 'Q_2=Q_3=520-360=160\\ \\mu\\text{C}' },
          { texto: 'Voltaje en el de 4 µF:', tex: 'V_3=\\frac{160\\ \\mu\\text{C}}{4\\ \\mu\\text{F}}=40\\ \\text{V}' },
        ],
        respuesta: 'Cₑ = 4.33 µF; Q₁ = 360 µC; Q₂ = Q₃ = 160 µC; V₃ = 40 V',
      },
      {
        titulo: 'Tres capacitores en serie',
        fuente: 'apoyo',
        enunciado: 'Capacitores de 2 µF, 3 µF y 6 µF se conectan en serie a 12 V. Encuentra Cₑ, la carga y el voltaje de cada uno.',
        pasos: [
          { texto: 'Suma de inversos:', tex: '\\frac{1}{C_e}=\\frac12+\\frac13+\\frac16=1\\Rightarrow C_e=1\\ \\mu\\text{F}' },
          { texto: 'Carga (igual en todos):', tex: 'Q=(1\\ \\mu\\text{F})(12\\ \\text{V})=12\\ \\mu\\text{C}' },
          { texto: 'Voltajes:', tex: 'V_1=\\tfrac{12}{2}=6\\ \\text{V},\\ V_2=\\tfrac{12}{3}=4\\ \\text{V},\\ V_3=\\tfrac{12}{6}=2\\ \\text{V}' },
          { texto: 'Verificación: 6 + 4 + 2 = 12 V ✓' },
        ],
        respuesta: 'Cₑ = 1 µF; Q = 12 µC; V = 6 V, 4 V y 2 V',
      },
      {
        titulo: 'Capacitor de placas paralelas',
        fuente: 'apoyo',
        enunciado: 'Un capacitor de placas paralelas tiene placas de 2.00 cm² separadas 1.00 mm en el vacío. ¿Cuál es su capacitancia? (Serway)',
        pasos: [
          { texto: 'Convertimos al SI:', tex: 'A=2.00\\times10^{-4}\\ \\text{m}^2,\\quad d=1.00\\times10^{-3}\\ \\text{m}' },
          { texto: 'Aplicamos la fórmula:', tex: 'C=\\varepsilon_0\\frac{A}{d}=(8.85\\times10^{-12})\\frac{2.00\\times10^{-4}}{1.00\\times10^{-3}}=1.77\\times10^{-12}\\ \\text{F}' },
        ],
        respuesta: 'C = 1.77 pF',
      },
    ],
    herramientas: [
      { nombre: 'PhET: Laboratorio de capacitores', url: PHET('capacitor-lab-basics'), descripcion: 'Cambia el área y la separación de las placas y mide C, Q y la energía.', tipo: 'Simulador' },
      { nombre: 'Falstad: simulador de circuitos', url: 'https://www.falstad.com/circuit/circuitjs.html', descripcion: 'Arma capacitores en serie y paralelo y mide voltajes en cada uno.', tipo: 'Simulador' },
      { nombre: 'PhET: Kit de circuitos AC', url: PHET('circuit-construction-kit-ac'), descripcion: 'Incluye capacitores para ver cómo se cargan en un circuito.', tipo: 'Simulador' },
      { nombre: 'Wolfram Alpha', url: 'https://www.wolframalpha.com', descripcion: 'Verifica sumas de inversos como “1/(1/2+1/3+1/6)”.', tipo: 'Calculadora' },
    ],
    palabras: ['capacitor', 'capacitancia', 'condensador', 'farad', 'serie', 'paralelo', 'dielectrico', 'placas'],
  },

  /* ═════════════════════════ MÓDULO 3 ═════════════════════════ */
  {
    slug: 'ley-de-ohm',
    modulo: 3,
    titulo: 'Corriente eléctrica y Ley de Ohm',
    resumen: 'Corriente, resistencia, circuitos en serie y paralelo, y potencia eléctrica.',
    descripcion: [
      'La corriente eléctrica es el flujo de carga por un conductor; se produce cuando hay una diferencia de potencial entre sus extremos y una fuente (pila, batería) que la mantiene. Se mide en amperes: 1 A = 1 C/s. Por convención, su sentido es el de las cargas positivas.',
      'En los conductores óhmicos, la corriente es proporcional al voltaje: V = IR. La resistencia depende del material (resistividad), de la longitud y del área del conductor. Con la Ley de Ohm y las reglas de serie y paralelo se resuelve cualquier circuito simple.',
    ],
    conceptos: [
      'Serie: misma corriente en todas; los voltajes se suman.',
      'Paralelo: mismo voltaje en todas; las corrientes se suman.',
      'En paralelo, la resistencia equivalente es menor que la menor de ellas.',
      'Potencia: P = IV = I²R = V²/R, en watts.',
      'El amperímetro se conecta en serie y el voltímetro en paralelo.',
    ],
    formulas: [
      { tex: 'I=\\frac{\\Delta Q}{\\Delta t}\\qquad V=I\\,R\\qquad R=\\rho\\frac{l}{A}', nota: 'Corriente, Ley de Ohm y resistencia de un conductor.' },
      { tex: 'R_e=R_1+R_2+\\cdots\\qquad \\frac{1}{R_e}=\\frac{1}{R_1}+\\frac{1}{R_2}+\\cdots', nota: 'Izquierda: serie. Derecha: paralelo.' },
      { tex: 'P=IV=I^2R=\\frac{V^2}{R}', nota: 'Potencia suministrada = potencia disipada.' },
    ],
    pasos: [
      'Reduce las resistencias en paralelo y en serie hasta tener una sola Rₑ.',
      'Calcula la corriente total con I = V/Rₑ.',
      'Regresa por las partes: en serie usa V = IR; en paralelo usa I = V/R.',
      'Calcula la potencia de cada resistencia con P = I²R.',
      'Verifica que las potencias sumen la potencia de la fuente.',
    ],
    ojo: 'No redondees 1/Rₚ antes de invertir: en la diapositiva, redondear 0.003429 a 0.0034 cambió Rₚ de 291.7 Ω a 294 Ω.',
    ejercicios: [
      {
        titulo: 'Ejemplo del curso: 400 Ω + (500 Ω ∥ 700 Ω)',
        fuente: 'diapositivas',
        enunciado: 'Una batería de 12 V alimenta un resistor de 400 Ω en serie con dos resistores en paralelo de 500 Ω y 700 Ω. ¿Cuánta corriente sale de la batería y cuánta pasa por cada resistor en paralelo?',
        pasos: [
          { texto: 'Paralelo:', tex: 'R_P=\\frac{(500)(700)}{500+700}=291.7\\ \\Omega' },
          { texto: 'Serie con 400 Ω:', tex: 'R_e=400+291.7=691.7\\ \\Omega' },
          { texto: 'Corriente total:', tex: 'I=\\frac{12}{691.7}=0.0173\\ \\text{A}=17.3\\ \\text{mA}' },
          { texto: 'Voltaje en el paralelo:', tex: 'V_P=(0.0173)(291.7)=5.06\\ \\text{V}' },
          { texto: 'Corrientes de cada rama:', tex: 'I_{500}=\\frac{5.06}{500}=10.1\\ \\text{mA},\\quad I_{700}=\\frac{5.06}{700}=7.2\\ \\text{mA}' },
        ],
        respuesta: 'I = 17.3 mA; I₅₀₀ = 10.1 mA; I₇₀₀ = 7.2 mA',
      },
      {
        titulo: 'Tres resistencias iguales en paralelo',
        fuente: 'diapositivas',
        enunciado: 'Tres resistencias de 5 Ω se conectan en paralelo a una fuente de 10 V. ¿Qué corriente circula por cada una y cuál es la corriente total?',
        pasos: [
          { texto: 'En paralelo todas tienen 10 V:', tex: 'I_1=I_2=I_3=\\frac{10}{5}=2\\ \\text{A}' },
          { texto: 'Corriente total:', tex: 'I=2+2+2=6\\ \\text{A}' },
          { texto: 'Comprobación con Rₑ:', tex: 'R_e=\\frac{5}{3}=1.67\\ \\Omega,\\quad I=\\frac{10}{1.67}=6\\ \\text{A}' },
        ],
        respuesta: '2 A por cada resistencia; 6 A en total',
      },
      {
        titulo: 'Foco de 60 W en casa',
        fuente: 'apoyo',
        enunciado: 'Un foco de 60 W se conecta a la red de 120 V de una casa en Guatemala. ¿Cuál es su resistencia, qué corriente consume y cuánta energía gasta si se usa 5 h diarias durante 30 días?',
        pasos: [
          { texto: 'Resistencia:', tex: 'R=\\frac{V^2}{P}=\\frac{120^2}{60}=240\\ \\Omega' },
          { texto: 'Corriente:', tex: 'I=\\frac{P}{V}=\\frac{60}{120}=0.5\\ \\text{A}' },
          { texto: 'Energía (lo que cobra el recibo de luz):', tex: 'E=P\\,t=(0.060\\ \\text{kW})(5\\times30\\ \\text{h})=9\\ \\text{kWh}' },
        ],
        respuesta: 'R = 240 Ω; I = 0.5 A; 9 kWh al mes',
      },
    ],
    herramientas: [
      { nombre: 'Calculadora de circuitos (esta página)', url: '#/calculadora', descripcion: 'Resuelve circuitos en serie o paralelo con procedimiento y gráfica V–I.', tipo: 'Calculadora propia' },
      { nombre: 'PhET: Ley de Ohm', url: PHET('ohms-law'), descripcion: 'Cambia V y R y observa cómo cambia la corriente.', tipo: 'Simulador' },
      { nombre: 'PhET: Kit de circuitos DC', url: PHET('circuit-construction-kit-dc'), descripcion: 'Arma circuitos con pilas, focos y medidores.', tipo: 'Simulador' },
      { nombre: 'Falstad: simulador de circuitos', url: 'https://www.falstad.com/circuit/circuitjs.html', descripcion: 'Simula circuitos complejos y muestra la corriente en movimiento.', tipo: 'Simulador' },
      { nombre: 'PhET: Resistencia en un alambre', url: PHET('resistance-in-a-wire'), descripcion: 'Comprueba R = ρl/A cambiando la longitud y el área.', tipo: 'Simulador' },
    ],
    palabras: ['corriente', 'ohm', 'resistencia', 'voltaje', 'circuito', 'serie', 'paralelo', 'potencia', 'amperio', 'watt', 'fem'],
    calculadora: true,
  },
  {
    slug: 'fuerza-magnetica',
    modulo: 3,
    titulo: 'Campo y fuerza magnética',
    resumen: 'La fuerza que un campo magnético ejerce sobre una carga en movimiento.',
    descripcion: [
      'Además del campo eléctrico, toda carga en movimiento (y todo imán) crea a su alrededor un campo magnético B, que se mide en teslas (T). Fuera de un imán, las líneas de campo salen del polo norte y entran al polo sur.',
      'Una carga que se mueve dentro de un campo magnético siente una fuerza perpendicular tanto a su velocidad como al campo. Por eso no cambia su rapidez, solo su dirección: si la velocidad es perpendicular a B, la partícula describe un círculo.',
    ],
    conceptos: [
      'Una carga en reposo no siente fuerza magnética.',
      'F es máxima si v ⊥ B (θ = 90°) y cero si v ∥ B.',
      'La dirección se obtiene con la regla de la mano derecha; para cargas negativas se invierte.',
      '1 T = 1 N/(A·m) = 10⁴ gauss.',
      'Movimiento circular: r = mv/(|q|B); frecuencia de ciclotrón ω = |q|B/m.',
    ],
    formulas: [
      { tex: '\\vec F_B=q\\,\\vec v\\times\\vec B\\qquad F_B=|q|\\,v\\,B\\sin\\theta', nota: 'θ es el menor ángulo entre v y B.' },
      { tex: 'r=\\frac{mv}{|q|B}\\qquad \\omega=\\frac{|q|B}{m}\\qquad T=\\frac{2\\pi m}{|q|B}', nota: 'Partícula con v perpendicular a B.' },
    ],
    pasos: [
      'Identifica q, v, B y el ángulo entre v y B.',
      'Calcula la magnitud con F = |q|vB sen θ.',
      'Encuentra la dirección con la regla de la mano derecha (v hacia B).',
      'Si la carga es negativa, invierte la dirección.',
      'Para movimiento circular, iguala la fuerza magnética a la centrípeta: |q|vB = mv²/r.',
    ],
    ojo: 'Para el electrón la dirección de la fuerza es contraria a la que da la regla de la mano derecha.',
    ejercicios: [
      {
        titulo: 'Electrón en un cinescopio',
        fuente: 'diapositivas',
        enunciado: 'Un electrón se mueve a 8.0 × 10⁶ m/s a lo largo del eje x. Hay un campo magnético de 0.025 T a 60° del eje x en el plano xy. Calcula la fuerza magnética sobre el electrón.',
        pasos: [
          { texto: 'Magnitud:', tex: 'F=|q|vB\\sin\\theta=(1.6\\times10^{-19})(8.0\\times10^6)(0.025)\\sin60^\\circ' },
          { texto: 'Resolvemos:', tex: 'F=2.8\\times10^{-14}\\ \\text{N}' },
          { texto: 'v × B apunta hacia +z; como el electrón es negativo, la fuerza va hacia −z.' },
        ],
        respuesta: 'F = 2.8 × 10⁻¹⁴ N en dirección −z',
      },
      {
        titulo: 'Protón en órbita circular',
        fuente: 'diapositivas',
        enunciado: 'Un protón se mueve en una órbita circular de 14 cm de radio en un campo magnético uniforme de 0.35 T perpendicular a su velocidad. Encuentra su rapidez.',
        pasos: [
          { texto: 'Despejamos v de r = mv/(qB):', tex: 'v=\\frac{qBr}{m}' },
          { texto: 'Sustituimos (mₚ = 1.67 × 10⁻²⁷ kg):', tex: 'v=\\frac{(1.6\\times10^{-19})(0.35)(0.14)}{1.67\\times10^{-27}}=4.7\\times10^{6}\\ \\text{m/s}' },
        ],
        respuesta: 'v = 4.7 × 10⁶ m/s',
      },
      {
        titulo: 'Frecuencia de ciclotrón',
        fuente: 'apoyo',
        enunciado: 'Para el protón del ejercicio anterior (B = 0.35 T), calcula la rapidez angular y el tiempo que tarda en dar una vuelta.',
        pasos: [
          { texto: 'Rapidez angular:', tex: '\\omega=\\frac{qB}{m}=\\frac{(1.6\\times10^{-19})(0.35)}{1.67\\times10^{-27}}=3.4\\times10^{7}\\ \\text{rad/s}' },
          { texto: 'Periodo:', tex: 'T=\\frac{2\\pi}{\\omega}=1.9\\times10^{-7}\\ \\text{s}' },
          { texto: 'Dato curioso: ni ω ni T dependen de la rapidez ni del radio.' },
        ],
        respuesta: 'ω = 3.4 × 10⁷ rad/s; T = 1.9 × 10⁻⁷ s',
      },
    ],
    herramientas: [
      { nombre: 'PhET: Imanes y electroimanes', url: PHET('magnets-and-electromagnets'), descripcion: 'Explora el campo de un imán y de una bobina con brújula.', tipo: 'Simulador' },
      { nombre: 'oPhysics: simulaciones de electromagnetismo', url: 'https://ophysics.com/em.html', descripcion: 'Incluye una partícula cargada en un campo magnético: observa su trayectoria circular o en espiral.', tipo: 'Simulador' },
      { nombre: 'GeoGebra 3D', url: 'https://www.geogebra.org/3d', descripcion: 'Dibuja v, B y su producto cruz para la regla de la mano derecha.', tipo: 'Graficadora' },
      { nombre: 'Wolfram Alpha', url: 'https://www.wolframalpha.com', descripcion: 'Calcula productos cruz como “cross product (8e6,0,0) (0.0125,0.0217,0)”.', tipo: 'Calculadora' },
    ],
    palabras: ['magnetico', 'fuerza magnetica', 'tesla', 'iman', 'ciclotron', 'mano derecha', 'lorentz', 'campo magnetico'],
  },
  {
    slug: 'flujo-magnetico',
    modulo: 3,
    titulo: 'Flujo magnético',
    resumen: 'Cuántas líneas de campo magnético atraviesan una superficie.',
    descripcion: [
      'El flujo magnético se define igual que el eléctrico: mide cuántas líneas de campo magnético atraviesan una superficie. Depende de la intensidad del campo, del área y del ángulo θ entre el campo y la normal a la superficie.',
      'Su unidad es el weber (1 Wb = 1 T·m²). Es la base de la inducción electromagnética: cuando el flujo cambia, se genera un voltaje, que es como funcionan los generadores y transformadores.',
    ],
    conceptos: [
      'θ = 0° → campo perpendicular a la superficie → flujo máximo.',
      'θ = 90° → campo paralelo a la superficie → flujo cero.',
      'θ = 180° → campo opuesto → flujo negativo.',
      'Ley de Gauss magnética: el flujo por cualquier superficie cerrada es cero (no existen monopolos).',
    ],
    formulas: [
      { tex: '\\Phi_B=B\\,A\\cos\\theta', nota: 'Campo uniforme sobre una superficie plana.' },
      { tex: '\\Phi_B=\\int\\vec B\\cdot d\\vec A\\qquad \\oint\\vec B\\cdot d\\vec A=0', nota: 'Caso general y Ley de Gauss del magnetismo.' },
    ],
    pasos: [
      'Calcula el área de la espira o superficie.',
      'Identifica el ángulo entre B y la normal del área.',
      'Sustituye en Φ = BA cos θ.',
      'Si el ángulo cambia, calcula el flujo inicial y el final y réstalos: ΔΦ = Φ₂ − Φ₁.',
    ],
    ojo: 'Igual que en el flujo eléctrico, θ se mide desde la normal y no desde la superficie.',
    ejercicios: [
      {
        titulo: 'Ejemplo 1: flujo máximo y mínimo',
        fuente: 'diapositivas',
        enunciado: 'B = 0.30 T y A = 0.25 m². Calcula el flujo si: a) θ = 0°, b) θ = 90°.',
        pasos: [
          { texto: 'a) Campo perpendicular a la superficie:', tex: '\\Phi=(0.30)(0.25)\\cos0^\\circ=0.075\\ \\text{Wb}' },
          { texto: 'b) Campo paralelo a la superficie:', tex: '\\Phi=(0.30)(0.25)\\cos90^\\circ=0' },
        ],
        respuesta: 'a) 0.075 Wb (máximo); b) 0 Wb (nulo)',
      },
      {
        titulo: 'Ejemplo 2: campo inclinado',
        fuente: 'diapositivas',
        enunciado: 'B = 0.50 T, A = 0.40 m² y θ = 60°. Calcula el flujo magnético.',
        pasos: [
          { texto: 'Sustituimos:', tex: '\\Phi=(0.50)(0.40)\\cos60^\\circ=(0.20)(0.5)=0.10\\ \\text{Wb}' },
        ],
        respuesta: 'Φ = 0.10 Wb',
      },
      {
        titulo: 'Ejemplo 3: variación del flujo',
        fuente: 'diapositivas',
        enunciado: 'B = 0.25 T y A = 0.15 m². El ángulo cambia de 0° a 60°. Calcula Φ₁, Φ₂ y ΔΦ.',
        pasos: [
          { texto: 'Flujo inicial:', tex: '\\Phi_1=(0.25)(0.15)\\cos0^\\circ=0.0375\\ \\text{Wb}' },
          { texto: 'Flujo final:', tex: '\\Phi_2=(0.25)(0.15)\\cos60^\\circ=0.01875\\ \\text{Wb}' },
          { texto: 'Variación:', tex: '\\Delta\\Phi=0.01875-0.0375=-0.01875\\ \\text{Wb}' },
        ],
        respuesta: 'Φ₁ = 0.0375 Wb; Φ₂ = 0.0188 Wb; ΔΦ = −0.0188 Wb',
      },
    ],
    herramientas: [
      { nombre: 'PhET: Ley de Faraday', url: PHET('faradays-law'), descripcion: 'Mueve un imán dentro de una bobina y observa cómo el cambio de flujo enciende un foco.', tipo: 'Simulador' },
      { nombre: 'PhET: Imanes y electroimanes', url: PHET('magnets-and-electromagnets'), descripcion: 'Visualiza las líneas de campo que atraviesan una espira.', tipo: 'Simulador' },
      { nombre: 'Desmos', url: 'https://www.desmos.com/calculator', descripcion: 'Grafica Φ = BA cos θ para ver cómo cambia con el ángulo.', tipo: 'Graficadora' },
      { nombre: 'Wolfram Alpha', url: 'https://www.wolframalpha.com', descripcion: 'Calcula cosenos y productos con unidades (T·m² → Wb).', tipo: 'Calculadora' },
    ],
    palabras: ['flujo magnetico', 'weber', 'tesla', 'espira', 'induccion', 'faraday', 'angulo'],
  },
]

/** Quita tildes y pasa a minúsculas para que la búsqueda no dependa de acentos. */
export const normalizar = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

/** Busca temas por título, módulo, resumen y palabras clave. */
export function buscarTemas(consulta: string): Tema[] {
  const q = normalizar(consulta.trim())
  if (!q) return TEMAS
  const terminos = q.split(/\s+/)
  return TEMAS.filter((t) => {
    const mod = MODULOS[t.modulo - 1]
    const texto = normalizar([t.titulo, t.resumen, `modulo ${t.modulo}`, mod.nombre, ...t.palabras, ...t.descripcion].join(' '))
    return terminos.every((w) => texto.includes(w))
  })
}

export const temaPorSlug = (slug?: string) => TEMAS.find((t) => t.slug === slug)
