const express = require("express");

function ExerciseController(exerciseService) {
  const router = express.Router();

  // GET /exercise
  router.get("/", async (request, response) => {
    try {
      const exerciseList = await exerciseService.getAllExercises();
      response.json(exerciseList);
    } catch (error) {
      console.error("Failed to fetch exercise list:", error);
      response.status(error.status || 500).json({ error: error.message || "internal server error" });
    }
  });

  // GET /exercise/:exerciseId
  router.get("/:exerciseId", async (request, response) => {
    try {
      const exerciseId = request.params.exerciseId;
      const exercise = await exerciseService.getExerciseById(exerciseId);
      if (!exercise) {
        return response.status(404).json({ error: "exercise not found" });
      }
      response.json(exercise);
    } catch (error) {
      console.error(`Failed to fetch exercise with id ${request.params.exerciseId}:`, error);
      response.status(error.status || 500).json({ error: error.message || "internal server error" });
    }
  });

  // POST /exercise
  router.post("/", async (request, response) => {
    try {
      const exerciseData = request.body || {};
      const createdExercise = await exerciseService.createExercise(exerciseData);
      response.status(201).json(createdExercise);
    } catch (error) {
      console.error("Failed to create exercise:", error);
      response.status(error.status || 500).json({ error: error.message || "internal server error" });
    }
  });

  return router;
}

module.exports = ExerciseController;
