const express = require("express");

function ExerciseController(exerciseService) {
  const router = express.Router();

  // GET /exercise
  // GET /exercises
  router.get("/exercises", async (request, response) => {
    try {
      const exerciseList = await exerciseService.getAllExercises();
      response.json(exerciseList);
    } catch (error) {
      console.error("Failed to fetch exercise list:", error);
      response.status(error.status || 500).json({ error: error.message || "internal server error" });
    }
  });

  // POST /exercise
  router.post("/exercise", async (request, response) => {
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
