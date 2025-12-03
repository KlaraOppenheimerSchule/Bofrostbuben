const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const ExerciseService = require("./application/ExerciseService");
const ExerciseController = require("./adapters/http/ExerciseController");

const InMemoryExerciseRepository = require("./adapters/db/InMemoryExerciseRepository");

const PORT = process.env.PORT || 3000;

async function makeApp() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  // Always use the in-memory repository for now (no DB usage)
  const repo = new InMemoryExerciseRepository();

  const service = new ExerciseService(repo);
  // mount controller at root so we expose:
  // GET  /exercises
  // POST /exercise
  app.use("/", ExerciseController(service));

  // root route: return a single (static) exercise object from the service
  app.get("/", async (req, res) => {
    try {
      const exercises = await service.getAllExercises();
      if (!exercises || exercises.length === 0) {
        return res.status(404).json({ error: "no exercises available" });
      }
      return res.json(exercises[0]);
    } catch (err) {
      console.error("Failed to fetch root exercise:", err);
      return res.status(err.status || 500).json({ error: err.message || "internal server error" });
    }
  });

  app.get("/healthz", (req, res) => res.json({ status: "ok" }));

  return app;
}

if (require.main === module) {
  // run as a script
  makeApp()
    .then(app => {
      const server = app.listen(PORT, "0.0.0.0", () => {
        console.log(`Backend listening on http://0.0.0.0:${PORT}`);
        console.log(`Container exposed port: ${PORT}`);
      });

      // handle graceful shutdown
      const shutdown = () => {
        console.log("Shutting down server...");
        server.close(() => process.exit(0));
      };
      process.on("SIGINT", shutdown);
      process.on("SIGTERM", shutdown);
    })
    .catch(err => {
      console.error("Failed to start app:", err);
      process.exit(1);
    });
}

module.exports = { makeApp };