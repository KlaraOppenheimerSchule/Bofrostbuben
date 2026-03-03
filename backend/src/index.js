const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const ExerciseController = require("./adapters/http/ExerciseController");
const ExerciseService = require("./application/ExerciseService");
const MongoDbExerciseRepository = require("./adapters/db/MongoDbExerciseRepository");

const PORT = process.env.PORT || 3000;

const exerciseRepository = new MongoDbExerciseRepository();
const exerciseService = new ExerciseService(exerciseRepository);
const exerciseController = new ExerciseController(exerciseService);

async function makeApp() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  // GET /exercises returns a list of all exercises
  app.get("/exercises", async (req, res) => {
    console.log("GET /excercises requested");
    try {
      await exerciseController.handleGetExercises(req, res);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  
  // POST /exercise creates a new excercise
  app.post("/exercise", async (req, res) => {
    try {
      await exerciseController.handleCreateExercise(req, res);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
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