const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const ExerciseController = require("./adapters/http/ExerciseController");
const ExerciseService = require("./application/ExerciseService");
const MongoDbExerciseRepository = require("./adapters/db/MongoDbExerciseRepository");

const PlanController = require("./adapters/http/PlanController");
const PlanService = require("./application/PlanService");
const MongoDbPlanRepository = require("./adapters/db/MongoDbPlanRepository");

const PORT = process.env.PORT || 3000;

const exerciseRepository = new MongoDbExerciseRepository();
const exerciseService = new ExerciseService(exerciseRepository);
const exerciseController = new ExerciseController(exerciseService);

const planRepository = new MongoDbPlanRepository();
const planService = new PlanService(planRepository);
const planController = new PlanController(planService);

async function makeApp() {
  const app = express();
  app.use(cors({
    origin: '*',
      credentials: false,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use(bodyParser.json());

  // GET /exercises returns a list of all exercises
  app.get("/exercises", async (req, res) => {
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

  // POST /exercise modifies an existing excercise
  app.patch("/exercise", async (req, res) => {
    try {
      await exerciseController.handleEditExercise(req, res);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  // DELETE /exercise/:id deletes an exercise
  app.delete("/exercise/:id", async (req, res) => {
    try {
      await exerciseController.handleDeleteExercise(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }sdad
  });
  
  // GET /plans returns a list of all plans
  app.get("/plans", async (req, res) => {
    await planController.handleGetPlans(req, res);
  });

  // POST /plan creates a new plan
  app.post("/plan", async (req, res) => {
    await planController.handleCreatePlan(req, res);
  });

  // PATCH /plan/:id modifies an existing plan
  app.patch("/plan/:id", async (req, res) => {
    await planController.handleEditPlan(req, res);
  });

  

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