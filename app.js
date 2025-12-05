//  DATOS DE TUTORIALES

const listaTutoriales = [
  {
    titulo: "Conoce la interfaz de Blender en 15 minutos",
    categoria: "basico",
    nivel: "Principiante",
    duracion: "15 min",
    descripcion:
      "Tour por las áreas principales de Blender y cómo personalizar tu espacio de trabajo.",
    // https://www.youtube.com/watch?v=KAT0Ss1ioS0
    videoId: "KAT0Ss1ioS0",
    pasos: [
      "Abrir Blender y elegir la opción General.",
      "Identificar el 3D Viewport, Outliner, Properties y Timeline.",
      "Cambiar el idioma de la interfaz si lo necesitas.",
      "Guardar tu layout preferido como pantalla por defecto."
    ]
  },
  {
    titulo: "Navegación 3D y atajos esenciales",
    categoria: "basico",
    nivel: "Principiante",
    duracion: "12 min",
    descripcion:
      "Aprende a orbitar, hacer zoom y moverte en la vista 3D usando el ratón y el teclado.",
    // https://www.youtube.com/watch?v=sgMfEq3pDE0
    videoId: "sgMfEq3pDE0",
    pasos: [
      "Practicar orbitar con botón central del ratón.",
      "Usar la rueda del ratón para acercar y alejar.",
      "Desplazarse lateralmente con Shift + botón central.",
      "Cambiar entre vistas con el Numpad (1, 3, 7)."
    ]
  },
  {
    titulo: "Modelando una taza low-poly",
    categoria: "modelado",
    nivel: "Básico",
    duracion: "25 min",
    descripcion:
      "Extrusiones, cortes de bucle y modificadores para crear una taza lista para renderizar.",
    // https://www.youtube.com/watch?v=zGYbflc8pmo
    videoId: "zGYbflc8pmo",
    pasos: [
      "Añadir un cilindro y ajustar sus vértices.",
      "Entrar en modo edición y extruir hacia arriba.",
      "Hacer el hueco interior usando Inset y Extrude.",
      "Crear el asa con un torus o un cubo deformado.",
      "Aplicar Subdivision Surface para suavizar."
    ]
  },
  {
    titulo: "Modelado de una habitación sencilla",
    categoria: "modelado",
    nivel: "Intermedio",
    duracion: "40 min",
    descripcion:
      "Crea paredes, ventanas, muebles simples y prepara la escena para iluminación.",
    videoId: "VIDEO_ID_HABITACION",
    pasos: [
      "Modelar el cubo de la habitación y hacer las paredes.",
      "Cortar huecos para puertas y ventanas.",
      "Añadir muebles simples usando cubos y extrusiones.",
      "Organizar la escena en colecciones.",
      "Colocar la cámara en una posición interesante."
    ]
  },
  {
    titulo: "Materiales PBR con el Principled BSDF",
    categoria: "materiales",
    nivel: "Intermedio",
    duracion: "30 min",
    descripcion:
      "Conecta texturas de color, roughness y normal map para un material realista.",
    videoId: "VIDEO_ID_MATERIALES_PBR",
    pasos: [
      "Abrir el Editor de Sombreado y seleccionar el objeto.",
      "Añadir un material nuevo con Principled BSDF.",
      "Conectar las texturas de Base Color, Roughness y Normal.",
      "Ajustar valores de roughness y metallic.",
      "Visualizar el resultado en modo Material Preview."
    ]
  },
  {
    titulo: "Iluminación de estudio con tres puntos de luz",
    categoria: "materiales",
    nivel: "Básico",
    duracion: "18 min",
    descripcion:
      "Configura una iluminación estándar de tres puntos para resaltar tus modelos.",
    videoId: "VIDEO_ID_LUCES_3_PUNTOS",
    pasos: [
      "Añadir la luz principal (key light).",
      "Colocar la luz de relleno (fill light) del lado opuesto.",
      "Añadir una luz de contra (rim light) detrás del modelo.",
      "Ajustar la intensidad y temperatura de color.",
      "Cambiar a Eevee o Cycles y hacer un render de prueba."
    ]
  },
  {
    titulo: "Animando una pelota que rebota",
    categoria: "animacion",
    nivel: "Básico",
    duracion: "20 min",
    descripcion:
      "Introduce squash & stretch, curvas en el editor de gráficos y timing básico.",
    // https://www.youtube.com/watch?v=7AcVnO_O1h4
    videoId: "7AcVnO_O1h4",
    pasos: [
      "Crear una esfera y configurar el timeline.",
      "Insertar keyframes de posición para el rebote.",
      "Editar las curvas en el Graph Editor para suavizar.",
      "Aplicar squash & stretch en los frames de impacto.",
      "Reproducir la animación completa y ajustar el timing."
    ]
  },
  {
    titulo: "Recorrido de cámara por la escena",
    categoria: "animacion",
    nivel: "Intermedio",
    duracion: "22 min",
    descripcion:
      "Usa un path para que la cámara recorra tu habitación 3D de forma suave.",
    videoId: "VIDEO_ID_CAMARA_PATH",
    pasos: [
      "Añadir una curva (path) que recorra la escena.",
      "Vincular la cámara al path con Follow Path.",
      "Ajustar la posición inicial y final en el path.",
      "Pulir el movimiento en el Graph Editor.",
      "Configurar el render de la animación a video."
    ]
  }
];


function inicializarTutoriales() {
  const contenedor = document.getElementById("contenedor-tutoriales");
  if (!contenedor) {
    
    return;
  }

  const botonesFiltro = document.querySelectorAll(".boton-filtro");
  const modalElemento = document.getElementById("modalTutorial");
  const tituloModal = document.getElementById("tituloModalTutorial");
  const iframeVideo = document.getElementById("videoModalTutorial");
  const listaPasos = document.getElementById("listaPasosTutorial");

  let modalBootstrap = null;
  if (modalElemento && window.bootstrap) {
    modalBootstrap = new bootstrap.Modal(modalElemento);
  }

  if (modalElemento) {
    modalElemento.addEventListener("hidden.bs.modal", () => {
      if (iframeVideo) {
        iframeVideo.src = "";
      }
    });
  }

  function renderizarTutoriales(filtro = "todos") {
    contenedor.innerHTML = "";

    const filtrados =
      filtro === "todos"
        ? listaTutoriales
        : listaTutoriales.filter((t) => t.categoria === filtro);

    if (filtrados.length === 0) {
      contenedor.innerHTML =
        '<p class="text-secondary">No hay tutoriales en esta categoría todavía.</p>';
      return;
    }

    filtrados.forEach((t, indice) => {
      const columna = document.createElement("div");
      columna.className = "col-md-6 col-lg-4";

      columna.innerHTML = `
        <div class="tarjeta-blender p-3 h-100">
          <div class="card-header border-0 bg-transparent pb-1">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="insignia-nivel">${t.nivel}</span>
              <span class="insignia-tiempo">${t.duracion}</span>
            </div>
            <h5 class="card-title mb-1">${t.titulo}</h5>
          </div>
          <div class="card-body pt-2 pb-3">
            <p class="small text-secondary mb-3">${t.descripcion}</p>
            <span class="badge rounded-pill text-bg-dark border border-light-subtle">
              ${t.categoria.toUpperCase()}
            </span>
          </div>
          <div class="card-footer border-0 bg-transparent pt-0">
            <button
              type="button"
              class="btn btn-sm btn-outline-light boton-ver-tutorial"
              data-indice="${indice}"
            >
              Ver tutorial
            </button>
          </div>
        </div>
      `;

      contenedor.appendChild(columna);
    });


    document.querySelectorAll(".boton-ver-tutorial").forEach((boton) => {
      boton.addEventListener("click", () => {
        const indice = parseInt(boton.getAttribute("data-indice"), 10);
        const t = listaTutoriales[indice];
        if (!t || !modalBootstrap) return;

        if (tituloModal) {
          tituloModal.textContent = t.titulo;
        }

        if (iframeVideo) {
          iframeVideo.src = `https://www.youtube.com/embed/${t.videoId}?autoplay=1`;
        }

        if (listaPasos) {
          listaPasos.innerHTML = t.pasos
            .map((p) => `<li class="mb-1">${p}</li>`)
            .join("");
        }

        modalBootstrap.show();
      });
    });
  }

  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
      botonesFiltro.forEach((b) => b.classList.remove("boton-filtro-activo"));
      boton.classList.add("boton-filtro-activo");

      const filtro = boton.getAttribute("data-filtro") || "todos";
      renderizarTutoriales(filtro);
    });
  });


  renderizarTutoriales("todos");
}


document.addEventListener("DOMContentLoaded", () => {
 
  inicializarTutoriales();
  
});
