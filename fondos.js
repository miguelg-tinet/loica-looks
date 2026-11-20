/*
  Catálogo de fondos de Atlas austral. index.html arma la galería y los filtros a partir de esta lista.

  PARA AGREGAR UN FONDO
  1. Copiar las cuatro imágenes con el mismo nombre de archivo (sin tildes ni espacios):
       Vistas/<archivo>.webp          vista previa, 1440 × 810
       Videollamadas/<archivo>.jpg    1920 × 1080, con logo
       Escritorio/QHD/<archivo>.jpg   2560 × 1440
       Escritorio/<archivo>.jpg       3840 × 2160
  2. Agregar una entrada al comienzo de FONDOS (los primeros se muestran primero).
  3. git add, commit y push. No hay que tocar index.html.

  CAMPOS
    archivo       nombre de archivo, sin extensión
    titulo        nombre visible
    marca         "Loica" o "Tinet"
    coleccion     serie a la que pertenece
    tecnica       técnica de ilustración
    temas         lista de temas; un fondo puede tener varios
    tono          "Claro" u "Oscuro"
    texto         descripción breve
    alt           descripción de la imagen para lectores de pantalla
    firma         opcional: reemplaza la marca en la etiqueta de la tarjeta
    videollamada  opcional: reemplaza el rótulo "Videollamada con logo"
    destacado     opcional: true en un solo fondo, el que abre la galería

  Los filtros salen solos de marca, coleccion, tecnica, temas y tono: una etiqueta nueva
  aparece como filtro apenas un fondo la usa. Conviene reutilizar las que ya existen,
  escritas igual. ETIQUETAS, al final, guarda el texto que acompaña a cada filtro (opcional).
*/

window.FONDOS = [
  // ── Oficio austral ──────────────────────────────────────────────────────────
  {
    archivo: "Bosque-a-lapiz",
    titulo: "Bosque a lápiz",
    marca: "Loica",
    coleccion: "Oficio austral",
    tecnica: "Trazo ingenuo",
    temas: ["Aves", "Paisaje"],
    tono: "Claro",
    texto: "Dos araucarias dibujadas a lápiz de color sobre papel crema, con una loica en la rama alta, copihues, helechos y hongos del bosque austral.",
    alt: "Dos araucarias dibujadas a lápiz de color con una loica de pecho rojo, copihues, helechos y hongos sobre papel crema."
  },
  {
    archivo: "Observatorio-al-pastel",
    titulo: "Observatorio al pastel",
    marca: "Tinet",
    coleccion: "Oficio austral",
    tecnica: "Trazo ingenuo",
    temas: ["Tecnología", "Paisaje"],
    tono: "Oscuro",
    texto: "Un observatorio de Atacama y su antena dibujados al pastel sobre cielo petróleo, enviando ondas magenta hacia las constelaciones.",
    alt: "Observatorio astronómico y antena en cerros nocturnos dibujados al pastel, con ondas magenta, constelaciones y luna creciente."
  },
  {
    archivo: "Nido-de-fieltro",
    titulo: "Nido de fieltro",
    marca: "Loica",
    coleccion: "Oficio austral",
    tecnica: "Táctil",
    temas: ["Aves"],
    tono: "Claro",
    texto: "Una loica modelada en lana afieltrada sobre una rama con hojas cosidas, junto a un nido de cordel con dos huevos moteados.",
    alt: "Loica de lana afieltrada sobre una rama con hojas de fieltro cosidas, junto a un nido de cordel con dos huevos moteados."
  },
  {
    archivo: "Faro-de-ceramica",
    titulo: "Faro de cerámica",
    marca: "Tinet",
    coleccion: "Oficio austral",
    tecnica: "Táctil",
    temas: ["Mar y costa"],
    tono: "Oscuro",
    texto: "Un faro austral de gres y barro oscuro rodeado de olas esmaltadas en petróleo, con un haz magenta suave desde su linterna.",
    alt: "Maqueta de faro de cerámica sobre rocas oscuras y olas esmaltadas en azul petróleo, emitiendo un haz de luz magenta."
  },
  {
    archivo: "Vuelo-en-tres-tintas",
    titulo: "Vuelo en tres tintas",
    marca: "Loica",
    coleccion: "Oficio austral",
    tecnica: "Risografía",
    temas: ["Aves", "Paisaje"],
    tono: "Claro",
    texto: "Una loica en pleno vuelo sobre lomas costeras y flora nativa, impresa en verde petróleo, bermellón y amarillo dorado con grano de risografía.",
    alt: "Impresión risográfica en verde petróleo, bermellón y amarillo: loica en vuelo sobre lomas y flora nativa frente a un sol de trama."
  },
  {
    archivo: "Puerto-en-duotono",
    titulo: "Puerto en duotono",
    marca: "Tinet",
    coleccion: "Oficio austral",
    tecnica: "Risografía",
    temas: ["Mar y costa", "Ciudad"],
    tono: "Claro",
    texto: "Grúas portuarias, contenedores y olas en trama de puntos a dos tintas: azul petróleo y magenta fluorescente sobre papel moteado.",
    alt: "Impresión risográfica en azul petróleo y magenta fluorescente de grúas portuarias, contenedores y olas frente a un sol de semitono."
  },
  {
    archivo: "Anatomia-del-vuelo",
    titulo: "Anatomía del vuelo",
    marca: "Loica",
    coleccion: "Oficio austral",
    tecnica: "Diagrama",
    temas: ["Aves"],
    tono: "Claro",
    texto: "Lámina aerodinámica de una loica con alas extendidas, líneas de corriente, detalle de pluma primaria y escala gráfica sobre papel milimetrado.",
    alt: "Lámina técnica de una loica en vuelo sobre papel milimetrado, con líneas de flujo aerodinámico, detalle de pluma y cotas."
  },
  {
    archivo: "Estacion-orbital",
    titulo: "Estación orbital",
    marca: "Tinet",
    coleccion: "Oficio austral",
    tecnica: "Diagrama",
    temas: ["Tecnología"],
    tono: "Oscuro",
    texto: "Esquema isométrico de una estación austral de telemetría con antena parabólica, paneles solares, nodos de cómputo y fibra troncal en magenta.",
    alt: "Esquema técnico isométrico de una estación de telemetría satelital sobre fondo azul petróleo, con fibra óptica y ondas en magenta."
  },
  {
    archivo: "Suite-loica-3d",
    titulo: "Suite Loica 3D",
    marca: "Loica",
    firma: "Suite Loica · GenDEV & GenQA",
    coleccion: "Oficio austral",
    tecnica: "Gradientes 3D",
    temas: ["Suite Loica"],
    tono: "Oscuro",
    videollamada: "Videollamada con logos",
    texto: "Cintas de vidrio esmerilado en coral y magenta sobre grafito profundo, con la marca de suite Loica by Tinet y las firmas B · Perspectiva de GenDEV y GenQA.",
    alt: "Fondo de gradientes 3D translúcidos en coral y magenta sobre grafito oscuro, con la firma de Suite Loica, GenDEV y GenQA."
  },

  // ── Taller austral ──────────────────────────────────────────────────────────
  {
    archivo: "Cuaderno-de-la-loica",
    titulo: "Cuaderno de la loica",
    marca: "Loica",
    coleccion: "Taller austral",
    tecnica: "Trazo ingenuo",
    temas: ["Aves"],
    tono: "Claro",
    texto: "Una loica posada en un poste, dibujada como en un cuaderno escolar. Los rellenos se corren de la línea y el pecho rojo está hecho a puro garabato.",
    alt: "Loica dibujada con crayón sobre un poste de cerco, con lomas verdes y un sol naranja."
  },
  {
    archivo: "Cerros-a-mano",
    titulo: "Cerros a mano",
    marca: "Tinet",
    coleccion: "Taller austral",
    tecnica: "Trazo ingenuo",
    temas: ["Ciudad", "Mar y costa"],
    tono: "Oscuro",
    texto: "Valparaíso de noche, dibujado con pasteles sobre papel azul. Casas de colores con ventanas encendidas, un ascensor magenta, banderines y un bote en la bahía.",
    alt: "Cerros nocturnos con casas de colores, un ascensor magenta y una luna creciente."
  },
  {
    archivo: "Cordillera-de-papel",
    titulo: "Cordillera de papel",
    marca: "Loica",
    coleccion: "Taller austral",
    tecnica: "Táctil",
    temas: ["Paisaje", "Aves"],
    tono: "Claro",
    texto: "Siete capas de papel rasgado arman la cordillera, del durazno al verde profundo. Un sol de fieltro rojo y una loica de papel recortado posada en una rama.",
    alt: "Capas de papel recortado en forma de cordillera, un sol de fieltro rojo y una loica de papel en una rama."
  },
  {
    archivo: "Red-de-greda",
    titulo: "Red de greda",
    marca: "Tinet",
    coleccion: "Taller austral",
    tecnica: "Táctil",
    temas: ["Tecnología", "Abstracto"],
    tono: "Oscuro",
    texto: "Una red modelada en greda: nodos esféricos con huellas de dedos y tubos que los conectan. La luz cae desde arriba y deja sombras suaves sobre el fondo petróleo.",
    alt: "Esferas de greda magenta, crema y petróleo unidas por tubos, sobre un fondo azul oscuro."
  },
  {
    archivo: "Loica-en-el-cardo",
    titulo: "Loica en el cardo",
    marca: "Loica",
    coleccion: "Taller austral",
    tecnica: "Risografía",
    temas: ["Aves"],
    tono: "Claro",
    texto: "Tres tintas risográficas: verde azulado, rojo y amarillo. La loica mira desde un poste frente a un sol grande, entre cardos y alambre de púas. El registro corrido deja ver cada pasada.",
    alt: "Impresión risográfica en verde azulado, rojo y amarillo: loica en un poste frente a un sol, con cardos y alambre de púas."
  },
  {
    archivo: "Torres-en-dos-tintas",
    titulo: "Torres en dos tintas",
    marca: "Tinet",
    coleccion: "Taller austral",
    tecnica: "Risografía",
    temas: ["Paisaje"],
    tono: "Claro",
    texto: "Las Torres del Paine impresas con dos tintas, azul y rosa fluorescente. Donde se cruzan aparece el violeta. El lago devuelve el reflejo en franjas.",
    alt: "Torres del Paine impresas en azul y rosa fluorescente, con un sol rosa y reflejos en el lago."
  },
  {
    archivo: "Lamina-de-campo",
    titulo: "Lámina de campo",
    marca: "Loica",
    coleccion: "Taller austral",
    tecnica: "Diagrama",
    temas: ["Aves"],
    tono: "Claro",
    texto: "Una lámina técnica de la Leistes loyca, con cotas, llamadas numeradas, el ala en despiece y el huevo medido. El único color es el rojo del pecho.",
    alt: "Lámina técnica de una loica con cotas, llamadas numeradas, ala en despiece y un huevo acotado."
  },
  {
    archivo: "Planta-de-datos",
    titulo: "Planta de datos",
    marca: "Tinet",
    coleccion: "Taller austral",
    tecnica: "Diagrama",
    temas: ["Tecnología"],
    tono: "Oscuro",
    texto: "Una planta de datos en vista isométrica, con racks de luces diminutas, ventiladores, estanques de agua fría y una antena de radio. Los conductos y la fibra troncal van en magenta.",
    alt: "Vista isométrica de una planta de datos con racks, enfriamiento, estanques y una antena, con etiquetas técnicas."
  },
  {
    archivo: "Grafo-y-vectores",
    titulo: "Grafo y vectores",
    marca: "Loica",
    coleccion: "Taller austral",
    tecnica: "Diagrama",
    temas: ["Suite Loica", "Tecnología"],
    tono: "Oscuro",
    texto: "La KDB en vista isométrica. El ingestor clona los repositorios y los recorre con tree-sitter. Luego escribe a dos almacenes: el grafo de código en Neo4j y los embeddings en Chroma. Una consulta trae los cinco vecinos más cercanos y recorre el grafo de función a repo.",
    alt: "Vista isométrica de la KDB: repositorios, un ingestor, un grafo de nodos flotantes y un cubo con una nube de puntos de embeddings."
  },
  {
    archivo: "Lamina-de-prueba",
    titulo: "Lámina de prueba",
    marca: "Loica",
    coleccion: "Taller austral",
    tecnica: "Diagrama",
    temas: ["Suite Loica"],
    tono: "Claro",
    texto: "GenQA analiza una pantalla de pago como si fuera una lámina técnica. Se ven el hint, el contexto y los extras que resuelven el botón, la acción, la validación del total con LLM y la evidencia de cada step.",
    alt: "Lámina técnica clara: una pantalla de pago con el botón Pagar marcado en rojo, llamadas numeradas, una tira de steps y diagramas de resolución."
  },
  {
    archivo: "Lamina-de-prueba-noche",
    titulo: "Lámina de prueba, noche",
    marca: "Loica",
    coleccion: "Taller austral",
    tecnica: "Diagrama",
    temas: ["Suite Loica"],
    tono: "Oscuro",
    texto: "La misma lámina en versión oscura: líneas claras sobre papel azul tinta, para escritorios y videollamadas con poca luz.",
    alt: "Versión oscura de la lámina técnica de GenQA, con líneas claras sobre fondo azul tinta y el botón Pagar en rojo."
  },
  {
    archivo: "Suite-loica",
    titulo: "Suite Loica",
    marca: "Loica",
    coleccion: "Taller austral",
    tecnica: "Gradientes 3D",
    temas: ["Suite Loica"],
    tono: "Oscuro",
    texto: "La suite con la marca nueva: el logo loica by tinet y sus dos plataformas, loica DEV (GenDev) y loica QA (GenQA), en tarjetas de vidrio. Al lado, un anillo 3D con degradé de coral a magenta y violeta.",
    alt: "Logo loica by tinet y tarjetas de vidrio con loica DEV y loica QA, junto a un anillo 3D con degradé de coral a violeta sobre fondo oscuro."
  },
  {
    archivo: "Suite-loica-clara",
    titulo: "Suite Loica, clara",
    marca: "Loica",
    coleccion: "Taller austral",
    tecnica: "Gradientes 3D",
    temas: ["Suite Loica"],
    tono: "Claro",
    texto: "La suite sobre fondo perla. El anillo 3D pasa del coral al rosa y al lila, con una sombra suave. Los logos van en grafito sobre tarjetas de vidrio blanco.",
    alt: "Logo loica by tinet en grafito y tarjetas de vidrio blanco con loica DEV y loica QA, junto a un anillo 3D en coral y lila sobre fondo perla."
  },
  {
    archivo: "Suite-loica-marea",
    titulo: "Suite Loica, marea",
    marca: "Loica",
    coleccion: "Taller austral",
    tecnica: "Gradientes 3D",
    temas: ["Suite Loica"],
    tono: "Oscuro",
    texto: "Otra versión oscura de la suite. Una cinta 3D torcida pasa del coral al azul petróleo, como una marea, sobre un fondo de noche verdosa.",
    alt: "Logo loica by tinet en blanco y tarjetas de vidrio con loica DEV y loica QA, junto a una cinta 3D torcida de coral a azul petróleo sobre fondo oscuro."
  },

  // ── Atlas austral ───────────────────────────────────────────────────────────
  {
    archivo: "Sobre-el-secano",
    titulo: "Sobre el secano",
    marca: "Loica",
    coleccion: "Atlas austral",
    tecnica: "Tinta plana",
    temas: ["Aves", "Paisaje"],
    tono: "Claro",
    destacado: true,
    texto: "Una loica planea sobre una llanura del secano chileno. Vista desde arriba, la hierba se convierte en un campo de tinta oliva. Las plumas abiertas y un destello rojo en el pecho dan la medida del vuelo.",
    alt: "Loica de alas extendidas sobre una llanura de pastos color oliva."
  },
  {
    archivo: "Ultima-luz",
    titulo: "Última luz",
    marca: "Tinet",
    coleccion: "Atlas austral",
    tecnica: "Tinta plana",
    temas: ["Paisaje"],
    tono: "Oscuro",
    texto: "La última luz de la tarde alcanza una arista de los Andes. Ese filo recoge el magenta de Tinet mientras las laderas se apagan en capas de azul petróleo.",
    alt: "Ladera andina azul con una arista iluminada en magenta."
  },
  {
    archivo: "Loica-del-secano",
    titulo: "Loica del secano",
    marca: "Loica",
    coleccion: "Atlas austral",
    tecnica: "Tinta plana",
    temas: ["Aves", "Paisaje"],
    tono: "Claro",
    texto: "Inspirada en las estampas de los cuadernos de campo, una loica mira desde un poste de cerco. Los cortes de tinta dibujan el plumaje y el pecho rojo destaca entre las lomas de salvia y los pastos secos.",
    alt: "Loica de pecho rojo posada sobre un cerco entre lomas verdes."
  },
  {
    archivo: "Corriente-austral",
    titulo: "Corriente austral",
    marca: "Loica",
    coleccion: "Atlas austral",
    tecnica: "Tinta plana",
    temas: ["Abstracto", "Mar y costa"],
    tono: "Oscuro",
    texto: "Un giro de las corrientes del Pacífico sur, llevado a la abstracción. Las bandas de jade y celadón rodean un núcleo azul tinta, y una franja bermellón acompaña la curva.",
    alt: "Bandas curvas verdes y bermellón sobre un campo azul oscuro."
  }
];

// Texto que se muestra al elegir un filtro. Opcional: una etiqueta sin texto funciona igual.
window.ETIQUETAS = {
  "Oficio austral": "Tercera colección. Nuevos motivos de 2026 en trazo ingenuo, oficio táctil, risografía y lámina técnica, en clave Loica y Tinet.",
  "Taller austral": "Segunda colección. Cuatro técnicas de ilustración de 2026, cada una en clave Loica y en clave Tinet.",
  "Atlas austral": "Primera colección. Paisajes y loicas del sur en planos de tinta.",
  "Trazo ingenuo": "Crayón, lápiz de color y pastel graso. Líneas que tiemblan y rellenos que se salen del borde, como un cuaderno de dibujo.",
  "Táctil": "Papel recortado, fieltro, greda y cerámica. Capas con volumen y sombra, a medio camino entre la artesanía y el 3D.",
  "Risografía": "Tintas planas superpuestas, trama de puntos, registro corrido y grano de impresión.",
  "Diagrama": "Láminas técnicas, cotas, despieces y etiquetas diminutas. Precisión de plano con alma de cuaderno de campo.",
  "Gradientes 3D": "Gradientes 3D y vidrio esmerilado para presentar la suite Loica y sus dos plataformas.",
  "Tinta plana": "Planos de color y tinta, entre la estampa y el afiche.",
  "Suite Loica": "La suite y sus plataformas: loica DEV (GenDev), loica QA (GenQA) y la KDB."
};
