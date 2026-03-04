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

  async editExercise({ id, name, muscleGroup, description }) {
    const exercise = new Exercise({
      id,
      name,
      muscleGroup,
      description,
    });

    return await this.exerciseRepository.editExercise(exercise)
  }

  /**
   * Return a list of all stored exercises.
   */
  async getAllExercises() {
    return await this.exerciseRepository.findAll();
  }

  
  async deleteExercise(id) {
    return await this.exerciseRepository.delete(id);
  }
}

module.exports = ExerciseService;