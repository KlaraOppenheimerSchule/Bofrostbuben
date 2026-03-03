class ExerciseController {
  constructor(exerciseService) {
    this.exerciseService = exerciseService;
  }

  async handleGetExercises(request, response) {
    try {
      const exerciseList = await this.exerciseService.getAllExercises();
      response.json(exerciseList);
      return;
    } catch (error) {
      console.error("Failed to fetch exercise list:", error);
      response.status(error.status || 500).json({ error: error.message || "internal server error" });
    }
  }

  async handleCreateExercise(request, response) {
    try {
      const exerciseData = request.body || {};
      const createdExercise = await this.exerciseService.createExercise(exerciseData);
      response.status(201).json(createdExercise);
      return;
    } catch (error) {
      console.error("Failed to create exercise:", error);
      response.status(error.status || 500).json({ error: error.message || "internal server error" });
    }
}}

module.exports = ExerciseController;
