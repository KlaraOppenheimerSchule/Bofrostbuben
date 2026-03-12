// ============================================================
// MongoDB Seed Script – automatically executed on first start
// by docker-entrypoint-initdb.d/
// ============================================================

db = db.getSiblingDB("appdb");

// ── Exercises ───────────────────────────────────────────────
db.exercises.drop();

db.exercises.insertMany([
  {
    name: "Squat",
    muscleGroup: "Legs",
    description: "Classic squat with bodyweight or barbell.",
    createdAt: new Date(),
  },
  {
    name: "Deadlift",
    muscleGroup: "Back",
    description: "Fundamental exercise for the hamstrings and back.",
    createdAt: new Date(),
  },
  {
    name: "Bench Press",
    muscleGroup: "Chest",
    description: "Barbell press on a bench for the chest muscles.",
    createdAt: new Date(),
  },
  {
    name: "Pull-Ups",
    muscleGroup: "Back",
    description: "Bar pull for a wide back and biceps.",
    createdAt: new Date(),
  },
  {
    name: "Shoulder Press",
    muscleGroup: "Shoulders",
    description: "Overhead press with dumbbells or barbell.",
    createdAt: new Date(),
  },
  {
    name: "Bicep Curl",
    muscleGroup: "Arms",
    description: "Isolation exercise for the biceps with dumbbells.",
    createdAt: new Date(),
  },
  {
    name: "Tricep Dips",
    muscleGroup: "Arms",
    description: "Bodyweight exercise for the triceps on parallel bars.",
    createdAt: new Date(),
  },
  {
    name: "Plank",
    muscleGroup: "Core",
    description: "Static exercise for strengthening the core.",
    createdAt: new Date(),
  },
  {
    name: "Lunges",
    muscleGroup: "Legs",
    description: "Single-leg squat stepping forward or backward.",
    createdAt: new Date(),
  },
  {
    name: "Barbell Row",
    muscleGroup: "Back",
    description: "Bent-over row for the lats and mid-back.",
    createdAt: new Date(),
  },
]);

print("✅  exercises: " + db.exercises.countDocuments() + " documents inserted");

// ── Training Plans ───────────────────────────────────────────
db.plans.drop();

db.plans.insertMany([
  {
    name: "Push/Pull/Legs – Starter",
    sessionsPerWeek: 3,
    days: [
      {
        dayIndex: 0,
        exercises: [
          { name: "Bench Press",     muscleGroup: "Chest" },
          { name: "Shoulder Press",  muscleGroup: "Shoulders" },
          { name: "Tricep Dips",     muscleGroup: "Arms" },
        ],
      },
      {
        dayIndex: 2,
        exercises: [
          { name: "Pull-Ups",    muscleGroup: "Back" },
          { name: "Barbell Row", muscleGroup: "Back" },
          { name: "Bicep Curl",  muscleGroup: "Arms" },
        ],
      },
      {
        dayIndex: 4,
        exercises: [
          { name: "Squat",   muscleGroup: "Legs" },
          { name: "Deadlift",muscleGroup: "Back" },
          { name: "Lunges",  muscleGroup: "Legs" },
          { name: "Plank",   muscleGroup: "Core" },
        ],
      },
    ],
    exercises: [],
    createdAt: new Date(),
  },
  {
    name: "Full Body – 2x per Week",
    sessionsPerWeek: 2,
    days: [
      {
        dayIndex: 1,
        exercises: [
          { name: "Squat",      muscleGroup: "Legs" },
          { name: "Bench Press",muscleGroup: "Chest" },
          { name: "Pull-Ups",   muscleGroup: "Back" },
          { name: "Plank",      muscleGroup: "Core" },
        ],
      },
      {
        dayIndex: 4,
        exercises: [
          { name: "Deadlift",      muscleGroup: "Back" },
          { name: "Shoulder Press",muscleGroup: "Shoulders" },
          { name: "Lunges",        muscleGroup: "Legs" },
          { name: "Bicep Curl",    muscleGroup: "Arms" },
        ],
      },
    ],
    exercises: [],
    createdAt: new Date(),
  },
]);

print("✅  plans: " + db.plans.countDocuments() + " documents inserted");