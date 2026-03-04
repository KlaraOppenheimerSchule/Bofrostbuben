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
      response.status(error.status || 500).json({ error: error.message || "Failed to fetch exercise: internal server error" });
    }
  }

  async handleCreateExercise(request, response) {
    try {
      const exerciseData = request.body || {};
      const createdExercise = await this.exerciseService.createExercise(exerciseData);
      response.status(201).json(createdExercise);
      return;
    } catch (error) {
      response.status(error.status || 500).json({ error: error.message || "Failed to create exercise: internal server error" });
    }
  }

  async handleEditExercise(request, response) {
    try {
      const exerciseInformation = request.body || {};
      const editedExercise = await this.exerciseService.editExercise(exerciseInformation);
      response.status(200).json(editedExercise);
      return;
    } catch (error) {
      response.status(error.status || 500).json({ error: error.message || "Failed to edit exercise: internal server error" });
    }
  }

  async handleDeleteExercise(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ error: "Exercise ID is required" });
      }

      await this.exerciseService.deleteExercise(id);

      response.status(204).send(); // No Content
    } catch (error) {
      response
          .status(error.status || 500)
          .json({ error: error.message || "Failed to delete exercise: internal server error" });
    }
  }
}

module.exports = ExerciseController;