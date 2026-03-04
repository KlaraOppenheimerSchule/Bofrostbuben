const Exercise = require("../domain/Exercise");

class ExerciseService {
  constructor(exerciseRepository) {
    this.exerciseRepository = exerciseRepository;
  }

  /**
   * Create a new Exercise entity and store it using the repository.
   */
  async createExercise({ name, muscleGroup, description }) {
    const exercise = new Exercise({
      name,
      muscleGroup,
      description,
    });

    return await this.exerciseRepository.save(exercise);
  }

  /**
   * Return a list of all stored exercises.
   */
  async getAllExercises() {
    return await this.exerciseRepository.findAll();
  }

  /**
   * Delete an exercise by its ID.
   */
  async deleteExercise(id) {
    // Optional: prüfen, ob die Übung existiert
    const exercise = await this.exerciseRepository.findById(id);
    if (!exercise) {
      const error = new Error(`Exercise with id ${id} not found`);
      error.status = 404;
      throw error;
    }

    return await this.exerciseRepository.delete(id);
  }
}

module.exports = ExerciseService;