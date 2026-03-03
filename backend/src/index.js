const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const ExerciseController = require("./adapters/http/ExerciseController");
const ExerciseService = require("./application/ExerciseService");
const InMemoryExerciseRepository = require("./adapters/db/InMemoryExerciseRepository");

const PORT = process.env.PORT || 3000;

const exerciseRepository = new InMemoryExerciseRepository();
const exerciseService = new ExerciseService(exerciseRepository);
const exerciseController = new ExerciseController(exerciseService);

async function makeApp() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  // GET /excercises returns a list of all excercises
  app.get("/excercises", async (req, res) => {
    await exerciseController.handleGetExercises(req, res);
  });
  // POST /exercise creates a new excercise
  app.post("/exercise", async (req, res) => {
    await exerciseController.handleCreateExercise(req, res);
  });

  app.get("/healthz", (req, res) => res.json({ status: "ok" }));

  return app;
}

// run as a script
if (require.main === module) {
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