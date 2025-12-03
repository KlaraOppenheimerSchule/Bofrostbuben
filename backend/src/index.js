const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const ExerciseService = require("./application/ExerciseService");
const ExerciseController = require("./adapters/http/ExerciseController");

const InMemoryExerciseRepository = require("./adapters/db/InMemoryExerciseRepository");
const { Pool } = require("pg");

const PORT = process.env.PORT || 3000;
const REPO = process.env.EXERCISE_REPO || process.env.USER_REPO || "memory";
// DB envs (used only if REPO=pg)
const DB_HOST = process.env.DB_HOST || "db";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "postgres";
const DB_NAME = process.env.DB_NAME || "appdb";

async function makeApp() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  let repo;
  if (REPO === "pg") {
    // create a pg pool
    const pool = new Pool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    });

 
  repo = new InMemoryExerciseRepository();
  

  const service = new ExerciseService(repo);
  app.use("/exercise", ExerciseController(service));

  app.get("/healthz", (req, res) => res.json({ status: "ok" }));

  // attach a graceful shutdown handler if using Postgres pool
  if (REPO === "pg") {
    const pool = repo.pool || (repo._pool); // not used here, just note
    // No further special handling in this simple example
  }

  return app;
}

if (require.main === module) {
  // run as a script
  makeApp()
    .then(app => {
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`Backend listening on http://0.0.0.0:${PORT} (REPO=${REPO})`);
      });
    })
    .catch(err => {
      console.error("Failed to start app:", err);
      process.exit(1);
    });
}

module.exports = { makeApp };
}