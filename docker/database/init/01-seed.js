// ============================================================
// MongoDB Seed Script – wird beim ersten Start automatisch
// von docker-entrypoint-initdb.d/ ausgeführt.
// ============================================================

db = db.getSiblingDB("appdb");

// ── Übungen (exercises) ─────────────────────────────────────
db.exercises.drop();

db.exercises.insertMany([
  {
    name: "Kniebeuge",
    muscleGroup: "Beine",
    description: "Klassische Kniebeuge mit Körpergewicht oder Langhantel.",
    createdAt: new Date(),
  },
  {
    name: "Kreuzheben",
    muscleGroup: "Rücken",
    description: "Grundübung für den hinteren Oberschenkel und den Rücken.",
    createdAt: new Date(),
  },
  {
    name: "Bankdrücken",
    muscleGroup: "Brust",
    description: "Liegestütze an der Langhantelbank für die Brustmuskulatur.",
    createdAt: new Date(),
  },
  {
    name: "Klimmzüge",
    muscleGroup: "Rücken",
    description: "Zug an der Stange für breiten Rücken und Bizeps.",
    createdAt: new Date(),
  },
  {
    name: "Schulterdrücken",
    muscleGroup: "Schultern",
    description: "Überkopfdrücken mit Kurz- oder Langhantel.",
    createdAt: new Date(),
  },
  {
    name: "Bizeps Curl",
    muscleGroup: "Arme",
    description: "Isolationsübung für den Bizeps mit Kurzhanteln.",
    createdAt: new Date(),
  },
  {
    name: "Trizeps Dips",
    muscleGroup: "Arme",
    description: "Körpergewichtsübung für den Trizeps an Parallelbarren.",
    createdAt: new Date(),
  },
  {
    name: "Plank",
    muscleGroup: "Core",
    description: "Statische Übung zur Kräftigung des Rumpfes.",
    createdAt: new Date(),
  },
  {
    name: "Ausfallschritte",
    muscleGroup: "Beine",
    description: "Einbeinige Kniebeuge vorwärts oder rückwärts.",
    createdAt: new Date(),
  },
  {
    name: "Rudern mit Langhantel",
    muscleGroup: "Rücken",
    description: "Vorgebeugtes Rudern für Lats und mittleren Rücken.",
    createdAt: new Date(),
  },
]);

print("✅  exercises: " + db.exercises.countDocuments() + " Dokumente eingefügt");

// ── Trainingspläne (plans) ───────────────────────────────────
db.plans.drop();

db.plans.insertMany([
  {
    name: "Push/Pull/Legs – Starter",
    sessionsPerWeek: 3,
    days: [
      {
        dayIndex: 0,
        exercises: [
          { name: "Bankdrücken",       muscleGroup: "Brust" },
          { name: "Schulterdrücken",   muscleGroup: "Schultern" },
          { name: "Trizeps Dips",      muscleGroup: "Arme" },
        ],
      },
      {
        dayIndex: 1,
        exercises: [
          { name: "Klimmzüge",             muscleGroup: "Rücken" },
          { name: "Rudern mit Langhantel", muscleGroup: "Rücken" },
          { name: "Bizeps Curl",           muscleGroup: "Arme" },
        ],
      },
      {
        dayIndex: 2,
        exercises: [
          { name: "Kniebeuge",      muscleGroup: "Beine" },
          { name: "Kreuzheben",     muscleGroup: "Rücken" },
          { name: "Ausfallschritte",muscleGroup: "Beine" },
          { name: "Plank",          muscleGroup: "Core" },
        ],
      },
    ],
    createdAt: new Date(),
  },
  {
    name: "Ganzkörper – 2x pro Woche",
    sessionsPerWeek: 2,
    days: [
      {
        dayIndex: 0,
        exercises: [
          { name: "Kniebeuge",    muscleGroup: "Beine" },
          { name: "Bankdrücken",  muscleGroup: "Brust" },
          { name: "Klimmzüge",    muscleGroup: "Rücken" },
          { name: "Plank",        muscleGroup: "Core" },
        ],
      },
      {
        dayIndex: 1,
        exercises: [
          { name: "Kreuzheben",         muscleGroup: "Rücken" },
          { name: "Schulterdrücken",    muscleGroup: "Schultern" },
          { name: "Ausfallschritte",    muscleGroup: "Beine" },
          { name: "Bizeps Curl",        muscleGroup: "Arme" },
        ],
      },
    ],
    createdAt: new Date(),
  },
]);

print("✅  plans: " + db.plans.countDocuments() + " Dokumente eingefügt");

