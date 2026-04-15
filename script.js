/**
 * Grupo de Developers — integrantes del equipo.
 * Agrega, edita o elimina objetos de este arreglo para actualizar la página.
 *
 * Campos:
 *   name  – Nombre completo del integrante
 *   role  – Rol dentro del equipo (ej. "Frontend", "Backend", "Full Stack")
 */
const developers = [
  { name: "Raúl Chagoya",          role: "Full Stack" },
  { name: "Mario Carbajal",          role: "Frontend" },
  { name: "Alejandro Salinas",        role: "Backend" },
  { name: "Sofía Ramírez",         role: "UI/UX" },
  { name: "Luis García",           role: "Backend" },
  { name: "Valeria Torres",        role: "Frontend" },
  { name: "Miguel Hernández",      role: "Full Stack" },
  { name: "Daniela Flores",        role: "Frontend" },
  { name: "Alejandro Martínez",    role: "Backend" },
  { name: "Fernanda Gutiérrez",    role: "Full Stack" },
  { name: "Jorge Reyes",           role: "DevOps" },
  { name: "Paola Morales",         role: "Frontend" },
];

/**
 * Manuales de proyectos.
 * Agrega, edita o elimina objetos de este arreglo para actualizar la sección de manuales.
 *
 * Campos:
 *   title     – Título del manual
 *   project   – Nombre del proyecto al que pertenece
 *   developer – Nombre del developer responsable (debe coincidir con developers[].name)
 *   url       – Enlace al manual (usa "#" si no hay enlace disponible)
 *   icon      – Emoji o ícono representativo del manual
 */
const manuals = [
  { title: "Manual de Instalación",      project: "Proyecto Alpha",   developer: "Raúl Chagoya",       url: "#", icon: "🛠️" },
  { title: "Guía de Usuario",            project: "Proyecto Alpha",   developer: "Raúl Chagoya",       url: "#", icon: "📖" },
  { title: "Manual de Componentes UI",   project: "Proyecto Beta",    developer: "Mario Carbajal",     url: "#", icon: "🎨" },
  { title: "Guía de Estilos",            project: "Proyecto Gamma",   developer: "Mario Carbajal",     url: "#", icon: "✏️" },
  { title: "Manual de API REST",         project: "Proyecto Delta",   developer: "Alejandro Salinas",  url: "#", icon: "🔌" },
  { title: "Documentación de Base de Datos", project: "Proyecto Delta", developer: "Alejandro Salinas", url: "#", icon: "🗄️" },
  { title: "Manual de Prototipado",      project: "Proyecto Épsilon", developer: "Sofía Ramírez",      url: "#", icon: "🖼️" },
  { title: "Guía de Accesibilidad",      project: "Proyecto Beta",    developer: "Sofía Ramírez",      url: "#", icon: "♿" },
  { title: "Manual de Microservicios",   project: "Proyecto Zeta",    developer: "Luis García",        url: "#", icon: "⚙️" },
  { title: "Manual de Frontend",         project: "Proyecto Eta",     developer: "Valeria Torres",     url: "#", icon: "🌐" },
  { title: "Manual de Arquitectura",     project: "Proyecto Theta",   developer: "Miguel Hernández",   url: "#", icon: "🏗️" },
  { title: "Guía de Despliegue",         project: "Proyecto Theta",   developer: "Miguel Hernández",   url: "#", icon: "🚀" },
  { title: "Manual de Pruebas",          project: "Proyecto Iota",    developer: "Daniela Flores",     url: "#", icon: "🧪" },
  { title: "Manual de Seguridad",        project: "Proyecto Kappa",   developer: "Alejandro Martínez", url: "#", icon: "🔒" },
  { title: "Guía de Integración",        project: "Proyecto Lambda",  developer: "Fernanda Gutiérrez", url: "#", icon: "🔗" },
  { title: "Manual de CI/CD",            project: "Proyecto Mu",      developer: "Jorge Reyes",        url: "#", icon: "♾️" },
  { title: "Manual de Infraestructura",  project: "Proyecto Nu",      developer: "Jorge Reyes",        url: "#", icon: "🖥️" },
  { title: "Guía de Optimización",       project: "Proyecto Xi",      developer: "Paola Morales",      url: "#", icon: "⚡" },
];

/* ── Palette for avatars (cycles through colours) ─────────────────────── */
const COLOURS = [
  "#2563eb", "#7c3aed", "#db2777", "#ea580c",
  "#16a34a", "#0891b2", "#b45309", "#475569",
];

/* ── Helpers ────────────────────────────────────────────────────────────── */
function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function buildCard(dev, index) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.name = dev.name.toLowerCase();

  const colour = COLOURS[index % COLOURS.length];

  card.innerHTML = `
    <div class="avatar" style="background:${colour}">${initials(dev.name)}</div>
    <p class="card-name">${dev.name}</p>
    <span class="card-role">${dev.role}</span>
    <span class="card-num">#${String(index + 1).padStart(2, "0")}</span>
  `;
  return card;
}

/* ── Render ──────────────────────────────────────────────────────────────── */
const grid = document.getElementById("grid");
const noResults = document.getElementById("no-results");
const totalCount = document.getElementById("total-count");

developers.forEach((dev, i) => grid.appendChild(buildCard(dev, i)));
totalCount.textContent = developers.length;

/* ── Search ──────────────────────────────────────────────────────────────── */
document.getElementById("search").addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  const cards = grid.querySelectorAll(".card");
  let visible = 0;

  cards.forEach((card) => {
    const match = card.dataset.name.includes(query);
    card.classList.toggle("hidden", !match);
    if (match) visible++;
  });

  noResults.style.display = visible === 0 ? "block" : "none";
});

/* ── Manuals ─────────────────────────────────────────────────────────────── */
function buildManualCard(manual) {
  const card = document.createElement("article");
  card.className = "manual-card";
  card.dataset.developer = manual.developer.toLowerCase();

  card.innerHTML = `
    <div class="manual-icon">${manual.icon}</div>
    <div class="manual-info">
      <p class="manual-title">${manual.title}</p>
      <p class="manual-project">📁 ${manual.project}</p>
      <p class="manual-developer">👤 ${manual.developer}</p>
    </div>
    <a class="manual-link" href="${manual.url}" target="_blank" rel="noopener noreferrer">Ver manual →</a>
  `;
  return card;
}

const manualsGrid = document.getElementById("manuals-grid");
const noManuals = document.getElementById("no-manuals");
const manualsFilter = document.getElementById("manuals-filter");

/* Populate developer filter options (unique names from manuals) */
const developerNames = [...new Set(manuals.map((m) => m.developer))].sort();
developerNames.forEach((name) => {
  const option = document.createElement("option");
  option.value = name.toLowerCase();
  option.textContent = name;
  manualsFilter.appendChild(option);
});

/* Render all manual cards */
manuals.forEach((manual) => manualsGrid.appendChild(buildManualCard(manual)));

function filterManuals() {
  const selected = manualsFilter.value.toLowerCase();
  const cards = manualsGrid.querySelectorAll(".manual-card");
  let visible = 0;

  cards.forEach((card) => {
    const match = selected === "" || card.dataset.developer === selected;
    card.classList.toggle("hidden", !match);
    if (match) visible++;
  });

  noManuals.style.display = visible === 0 ? "block" : "none";
}

manualsFilter.addEventListener("change", filterManuals);
