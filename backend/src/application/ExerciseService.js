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
   * Return an Exercise by its ID.
   */
  async getExerciseById(exerciseId) {
    return await this.exerciseRepository.findById(exerciseId);
  }
}

module.exports = ExerciseService;
