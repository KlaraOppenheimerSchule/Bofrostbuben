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
}

module.exports = ExerciseService;
