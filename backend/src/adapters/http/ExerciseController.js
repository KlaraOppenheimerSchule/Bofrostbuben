class ExerciseController {
  constructor(exerciseService) {
    this.exerciseService = exerciseService
  }

  async handleGetExercises(request, response) {
    try {
      const exerciseList = await this.exerciseService.getAllExercises()
      response.json(exerciseList)
    } catch (error) {
      response.status(error.status || 500).json({ error: error.message || "Failed to fetch exercise: internal server error" });
    }
  }

  async handleCreateExercise(request, response) {
    try {
      const exerciseData = request.body || {}
      const createdExercise = await this.exerciseService.createExercise(exerciseData)
      response.status(201).json(createdExercise)
    } catch (error) {
      response.status(error.status || 500).json({ error: error.message || "Failed to create exercise: internal server error" });
    }
  }
}

module.exports = ExerciseController
