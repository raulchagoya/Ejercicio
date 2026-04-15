const os = require("node:os");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");

const seedManuals = [
  { title: "Manual de Instalación", project: "Proyecto Alpha", developer: "Raúl Chagoya", url: "#", icon: "🛠️" },
  { title: "Guía de Usuario", project: "Proyecto Alpha", developer: "Raúl Chagoya", url: "#", icon: "📖" },
  { title: "Manual de Componentes UI", project: "Proyecto Beta", developer: "Mario Carbajal", url: "#", icon: "🎨" },
  { title: "Guía de Estilos", project: "Proyecto Gamma", developer: "Mario Carbajal", url: "#", icon: "✏️" },
  { title: "Manual de API REST", project: "Proyecto Delta", developer: "Alejandro Salinas", url: "#", icon: "🔌" },
  { title: "Documentación de Base de Datos", project: "Proyecto Delta", developer: "Alejandro Salinas", url: "#", icon: "🗄️" },
  { title: "Manual de Prototipado", project: "Proyecto Épsilon", developer: "Sofía Ramírez", url: "#", icon: "🖼️" },
  { title: "Guía de Accesibilidad", project: "Proyecto Beta", developer: "Sofía Ramírez", url: "#", icon: "♿" },
  { title: "Manual de Microservicios", project: "Proyecto Zeta", developer: "Luis García", url: "#", icon: "⚙️" },
  { title: "Manual de Frontend", project: "Proyecto Eta", developer: "Valeria Torres", url: "#", icon: "🌐" },
  { title: "Manual de Arquitectura", project: "Proyecto Theta", developer: "Miguel Hernández", url: "#", icon: "🏗️" },
  { title: "Guía de Despliegue", project: "Proyecto Theta", developer: "Miguel Hernández", url: "#", icon: "🚀" },
  { title: "Manual de Pruebas", project: "Proyecto Iota", developer: "Daniela Flores", url: "#", icon: "🧪" },
  { title: "Manual de Seguridad", project: "Proyecto Kappa", developer: "Alejandro Martínez", url: "#", icon: "🔒" },
  { title: "Guía de Integración", project: "Proyecto Lambda", developer: "Fernanda Gutiérrez", url: "#", icon: "🔗" },
  { title: "Manual de CI/CD", project: "Proyecto Mu", developer: "Jorge Reyes", url: "#", icon: "♾️" },
  { title: "Manual de Infraestructura", project: "Proyecto Nu", developer: "Jorge Reyes", url: "#", icon: "🖥️" },
  { title: "Guía de Optimización", project: "Proyecto Xi", developer: "Paola Morales", url: "#", icon: "⚡" },
];

let db;

function getDatabase() {
  if (db) return db;

  const dbPath = path.join(os.tmpdir(), "manuals.sqlite");
  db = new DatabaseSync(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS manuals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      project TEXT NOT NULL,
      developer TEXT NOT NULL,
      url TEXT NOT NULL,
      icon TEXT NOT NULL
    )
  `);

  const { total } = db.prepare("SELECT COUNT(*) AS total FROM manuals").get();
  if (total === 0) {
    const insert = db.prepare(`
      INSERT INTO manuals (title, project, developer, url, icon)
      VALUES (?, ?, ?, ?, ?)
    `);

    for (const manual of seedManuals) {
      insert.run(
        manual.title,
        manual.project,
        manual.developer,
        manual.url,
        manual.icon
      );
    }
  }

  return db;
}

exports.handler = async function handler() {
  try {
    const database = getDatabase();
    const manuals = database
      .prepare("SELECT title, project, developer, url, icon FROM manuals ORDER BY id")
      .all();

    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
      body: JSON.stringify({ manuals }),
    };
  } catch (error) {
    console.error("Error al cargar manuales desde SQLite:", error);
    return {
      statusCode: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ message: "No fue posible cargar manuales." }),
    };
  }
};
