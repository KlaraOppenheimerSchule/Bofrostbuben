const Workout = require('../domain/Workout.js')

class WorkoutService {
  constructor(workoutRepository) {
    this.workoutRepository = workoutRepository
  }

  /**
   * Create a new Workout entity and store it using the repository.
   */
  async createWorkout({ name, exercises }) {
    const workout = new Workout({
      name,
      exercises,
    })

    return await this.workoutRepository.save(workout)
  }

  /**
   * Edit an existing workout.
   */
  async editWorkout({ id, name, exercises }) {
    const workout = new Workout({
      id,
      name,
      exercises,
    })

    return await this.workoutRepository.edit(workout)
  }

  /**
   * Return a list of all stored workouts.
   */
  async getAllWorkouts() {
    return await this.workoutRepository.findAll()
  }

  /**
   * Return one workout by id.
   */
  async getWorkoutById(id) {
    return await this.workoutRepository.findById(id)
  }

  /**
   * Delete a workout by id.
   */
  async deleteWorkout(id) {
    return await this.workoutRepository.delete(id)
  }
}

module.exports = WorkoutService