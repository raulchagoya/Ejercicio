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
