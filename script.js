// Datos base: estructura de ramos y sus prerrequisitos
const ramos = {
  "Algebra básica": [],
  "Tecnología de la información": [],
  "Gestión I": [],
  "Contabilidad I": [],
  "Taller de comunicación Efectiva I": [],
  "Taller para el Pensamiento lógico Deductivo": [],
  "Matemáticas I": ["Algebra básica"],
  "Fundamentos de Economía": [],
  "Gestión II": ["Gestión I"],
  "Contabilidad II": ["Contabilidad I"],
  "Taller de Comunicación Efectiva II": ["Taller de comunicación Efectiva I"],
  "Ingles I": [],
  "Matemáticas II": ["Matemáticas I"],
  "Macroeconomía I": ["Fundamentos de Economía"],
  "Gestión del Personal": ["Gestión II"],
  "Costos I": ["Contabilidad II"],
  "Taller de ciencia y tecnología": [],
  "Ingles II": ["Ingles I"],
  "Matemáticas III": ["Matemáticas II"],
  "Microeconomía": ["Fundamentos de Economía"],
  "Gestión del Personal II": ["Gestión del Personal"],
  "Costos II": ["Costos I"],
  "Derecho Laboral": [],
  "Ingles III": ["Ingles II"],
  "Estadísticas I": ["Matemáticas III"],
  "Macroeconomía II": ["Macroeconomía I"],
  "Comportamiento Organizacional": ["Gestión del Personal II"],
  "Finanzas I": ["Costos II"],
  "Gestión de Calidad": ["Gestión II"],
  "Ingles IV": ["Ingles III"],
  "Estadísticas II": ["Estadísticas I"],
  "Microeconomía II": ["Microeconomía"],
  "Marketing": ["Gestión II"],
  "Finanzas II": ["Finanzas I"],
  "Sistema de información": ["Gestión II"],
  "Taller de Principios de la Sustentabilidad": ["Taller de ciencia y tecnología"],
  "Econometría": ["Estadísticas II"],
  "Economía Internacional": ["Macroeconomía II"],
  "Investigación de Mercado": ["Estadísticas II"],
  "Preparación y evaluación de proyectos": ["Finanzas II"],
  "Derecho Comercial y Tributario": ["Matemáticas III", "Gestión del Personal II", "Costos II", "Derecho Laboral", "Ingles III"],
  "Economía Ambiental": [],
  "Métodos Cuantitativos": ["Estadísticas II"],
  "Economía Monetaria y Fiscal": ["Macroeconomía II"],
  "Econometría aplicada": ["Econometría"],
  "Mercado de Capitales": ["Finanzas II"],
  "Electivo de Especialidad I": ["Econometría", "Economía Internacional", "Investigación de Mercado", "Preparación y evaluación de proyectos", "Derecho Comercial y Tributario", "Economía Ambiental"],
  "Electivo de Especialidad II": ["Econometría", "Economía Internacional", "Investigación de Mercado", "Preparación y evaluación de proyectos", "Derecho Comercial y Tributario", "Economía Ambiental"],
  "Dirección de Operaciones": ["Métodos Cuantitativos"],
  "Política Económica": ["Economía Monetaria y Fiscal"],
  "Planificación Estratégica": ["Investigación de Mercado"],
  "Trabajo de Titulo I": ["Métodos Cuantitativos", "Economía Monetaria y Fiscal", "Econometría aplicada", "Mercado de Capitales"],
  "Electivo de Especialidad III": ["Economía Internacional"],
  "Electivo de Especialidad IV": ["Economía Internacional"],
  "Accounting Standars": ["Métodos Cuantitativos", "Economía Monetaria y Fiscal", "Econometría aplicada", "Mercado de Capitales"],
  "Control Estratégico": ["Planificación Estratégica"],
  "Trabajo de Titulo II": ["Trabajo de Titulo I"],
  "Práctica Profesional": ["Política Económica", "Planificación Estratégica"]
};

const semestres = [
  // Cada sublista es un semestre
  ["Algebra básica", "Tecnología de la información", "Gestión I", "Contabilidad I", "Taller de comunicación Efectiva I", "Taller para el Pensamiento lógico Deductivo"],
  ["Matemáticas I", "Fundamentos de Economía", "Gestión II", "Contabilidad II", "Taller de Comunicación Efectiva II", "Ingles I"],
  ["Matemáticas II", "Macroeconomía I", "Gestión del Personal", "Costos I", "Taller de ciencia y tecnología", "Ingles II"],
  ["Matemáticas III", "Microeconomía", "Gestión del Personal II", "Costos II", "Derecho Laboral", "Ingles III"],
  ["Estadísticas I", "Macroeconomía II", "Comportamiento Organizacional", "Finanzas I", "Gestión de Calidad", "Ingles IV"],
  ["Estadísticas II", "Microeconomía II", "Marketing", "Finanzas II", "Sistema de información", "Taller de Principios de la Sustentabilidad"],
  ["Econometría", "Economía Internacional", "Investigación de Mercado", "Preparación y evaluación de proyectos", "Derecho Comercial y Tributario", "Economía Ambiental"],
  ["Métodos Cuantitativos", "Economía Monetaria y Fiscal", "Econometría aplicada", "Mercado de Capitales", "Electivo de Especialidad I", "Electivo de Especialidad II"],
  ["Dirección de Operaciones", "Política Económica", "Planificación Estratégica", "Trabajo de Titulo I", "Electivo de Especialidad III", "Electivo de Especialidad IV"],
  ["Accounting Standars", "Control Estratégico", "Trabajo de Titulo II", "Práctica Profesional"]
];

// Estado de aprobación
const estado = {};

function crearMalla() {
  const container = document.getElementById("malla-container");

  semestres.forEach((lista, idx) => {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>Semestre ${idx + 1}</h2>`;

    lista.forEach(ramo => {
      const btn = document.createElement("button");
      btn.className = "ramo";
      btn.innerText = ramo;
      btn.dataset.id = ramo;
      btn.disabled = ramos[ramo].length > 0;
      btn.addEventListener("click", () => aprobarRamo(ramo, btn));
      div.appendChild(btn);
      estado[ramo] = false;
    });

    container.appendChild(div);
  });
}

function aprobarRamo(ramo, boton) {
  if (estado[ramo]) return;

  boton.classList.add("aprobado");
  boton.disabled = true;
  estado[ramo] = true;

  // Desbloquear otros ramos que dependan de este
  document.querySelectorAll(".ramo").forEach(b => {
    const id = b.dataset.id;
    if (estado[id]) return;

    const reqs = ramos[id];
    if (reqs.every(r => estado[r])) {
      b.disabled = false;
    }
  });
}

crearMalla();
