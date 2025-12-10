// ========================
//  DATOS DE TUTORIALES
// ========================
const listaTutoriales = [
  {
    titulo: "Conoce la interfaz de Blender en 15 minutos",  // Título del tutorial
    categoria: "basico",  // Categoría del tutorial
    nivel: "Principiante", // Nivel de dificultad
    duracion: "15 min",  // Duración estimada
    descripcion:
      "Tour por las áreas principales de Blender y cómo personalizar tu espacio de trabajo.",  // Descripción del contenido
    videoId: "KAT0Ss1ioS0",  // ID del video de YouTube
    pasos: [  // Pasos del tutorial
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
    videoId: "HScy0gM27Zs",
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
    descripcion: "Crea paredes, ventanas, muebles simples y prepara la escena para iluminación.",
    videoId: "Ahm0Vc6ZXlY",
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
    videoId: "cZwC1e9ObWQ",
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
    videoId: "807TH_6LP5M",
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
    videoId: "r9i6g-pToVM",
    pasos: [
      "Añadir una curva (path) que recorra la escena.",
      "Vincular la cámara al path con Follow Path.",
      "Ajustar la posición inicial y final en el path.",
      "Pulir el movimiento en el Graph Editor.",
      "Configurar el render de la animación a video."
    ]
  }
];

// ========================
//  VARIABLES GLOBALES
// ========================
let filtroActual = "todos";  // Filtro actual para mostrar los tutoriales
let paginaActual = 1;       // Página actual de tutoriales
const porPagina = 6;        // Número de tutoriales por página
let tutorialsFiltrados = [...listaTutoriales];  // Copia inicial de todos los tutoriales

let contenedor, paginador, botonesFiltro;  // Variables de referencia para el contenedor de tutoriales, paginador y botones de filtro

// IntersectionObserver global para animar tarjetas
let observer;  // Variable para observar los elementos visibles en pantalla

// ========================
//  FUNCIONES
// ========================

// Función para inicializar los tutoriales y sus filtros
function inicializarTutoriales() {
  contenedor = document.getElementById("contenedor-tutoriales");  // Obtener contenedor de tutoriales
  paginador = document.getElementById("paginador");  // Obtener contenedor del paginador
  botonesFiltro = document.querySelectorAll(".boton-filtro");  // Obtener todos los botones de filtro

  // EVENTOS FILTROS
  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
      botonesFiltro.forEach((b) => b.classList.remove("active"));  // Eliminar la clase 'active' de todos los botones
      boton.classList.add("active");  // Agregar la clase 'active' al botón seleccionado

      filtroActual = boton.getAttribute("data-filtro") || "todos";  // Obtener el filtro seleccionado
      renderizarTutoriales(filtroActual, 1);  // Renderizar tutoriales según el filtro
    });
  });

  // Crear observer global una sola vez
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');  // Animar la tarjeta cuando sea visible
        observer.unobserve(entry.target);  // Dejar de observarla una vez que se haya animado
      }
    });
  }, { threshold: 0.2 });

  // RENDER INICIAL
  renderizarTutoriales("todos", 1);  // Renderizar todos los tutoriales por defecto
}

// Renderiza los tutoriales en el contenedor
function renderizarTutoriales(filtro = "todos", pagina = 1) {
  paginaActual = pagina;

  // FILTRAR LISTA
  tutorialsFiltrados =
    filtro === "todos"
      ? [...listaTutoriales]  // Si el filtro es 'todos', mostrar todos los tutoriales
      : listaTutoriales.filter((t) => t.categoria === filtro);  // Filtrar según la categoría seleccionada

  // CALCULAR INICIO/FIN
  const inicio = (paginaActual - 1) * porPagina;  // Calcular el inicio de la lista para la página actual
  const fin = inicio + porPagina;  // Calcular el fin de la lista para la página actual
  const paginaDatos = tutorialsFiltrados.slice(inicio, fin);  // Obtener los tutoriales de la página actual

  // LIMPIAR CONTENEDOR
  contenedor.innerHTML = "";

  if (paginaDatos.length === 0) {
    contenedor.innerHTML =
      '<p class="text-secondary">No hay tutoriales en esta categoría.</p>';  // Mensaje si no hay tutoriales en la categoría
    return;
  }

  // CREAR TARJETAS
  paginaDatos.forEach((t, i) => {
    const col = document.createElement("div");  // Crear una columna para la tarjeta
    col.className = "col-md-6 col-lg-4";  // Establecer el tamaño de la columna

    col.innerHTML = `
      <div class="tarjeta-blender animar-tarjeta p-3 h-100">
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
            data-indice="${inicio + i}"
          >
            Ver tutorial
          </button>
        </div>
      </div>
    `;

    contenedor.appendChild(col);  // Añadir la tarjeta al contenedor
  });

  // ACTIVAR MODAL
  activarModal();  // Activar el modal de los tutoriales

  // ACTUALIZAR PAGINACIÓN
  mostrarPaginacion();  // Actualizar la paginación

  // OBSERVAR TARJETAS PARA ANIMAR
  const tarjetas = document.querySelectorAll('.animar-tarjeta');
  tarjetas.forEach(tarjeta => observer.observe(tarjeta));  // Observar las tarjetas para animarlas
}

// Configura el modal para cada tutorial
function activarModal() {
  const modalBootstrap = new bootstrap.Modal(document.getElementById("modalTutorial"));  // Crear la instancia del modal
  const tituloModal = document.getElementById("tituloModalTutorial");  // Obtener el título del modal
  const iframeVideo = document.getElementById("videoModalTutorial");  // Obtener el iframe del video
  const listaPasos = document.getElementById("listaPasosTutorial");  // Obtener la lista de pasos

  // Evento cuando el modal se cierra
  $('#modalTutorial').on('hidden.bs.modal', function () {
    iframeVideo.src = "";  // Detener el video al cerrar el modal
  });

  document.querySelectorAll(".boton-ver-tutorial").forEach((boton) => {
    boton.addEventListener("click", () => {
      const indice = parseInt(boton.getAttribute("data-indice"), 10);  // Obtener el índice del tutorial
      const t = listaTutoriales[indice];  // Obtener los datos del tutorial
      if (!t) return;

      // Rellenar los datos del modal
      tituloModal.textContent = t.titulo;
      iframeVideo.src = `https://www.youtube.com/embed/${t.videoId}?autoplay=1`;  // Iniciar el video automáticamente
      listaPasos.innerHTML = t.pasos.map((p) => `<li>${p}</li>`).join("");  // Rellenar la lista de pasos

      modalBootstrap.show();  // Mostrar el modal
    });
  });
}

// Renderiza paginación
function mostrarPaginacion() {
  const totalPaginas = Math.ceil(tutorialsFiltrados.length / porPagina);  // Calcular el total de páginas

  if (!paginador) return;

  paginador.innerHTML = "";  // Limpiar la paginación
  if (totalPaginas <= 1) return;

  // Crear botón "Anterior"
  paginador.innerHTML += `
    <li class="page-item ${paginaActual === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" data-pag="${paginaActual - 1}">Anterior</a>
    </li>
  `;

  // Crear botones de las páginas
  for (let i = 1; i <= totalPaginas; i++) {
    paginador.innerHTML += `
      <li class="page-item ${i === paginaActual ? "active" : ""}">
        <a class="page-link" href="#" data-pag="${i}">${i}</a>
      </li>
    `;
  }

  // Crear botón "Siguiente"
  paginador.innerHTML += `
    <li class="page-item ${paginaActual === totalPaginas ? "disabled" : ""}">
      <a class="page-link" href="#" data-pag="${paginaActual + 1}">Siguiente</a>
    </li>
  `;

  // Manejo de eventos de paginación
  paginador.querySelectorAll("a").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();  // Prevenir la acción por defecto del enlace
      const nueva = Number(e.target.dataset.pag);  // Obtener el número de la página
      renderizarTutoriales(filtroActual, nueva);  // Renderizar los tutoriales para la página seleccionada
    });
  });
}

// ========================
//  INICIO
// ========================
document.addEventListener("DOMContentLoaded", () => {
  inicializarTutoriales();  // Inicializar los tutoriales cuando la página esté completamente cargada
});
