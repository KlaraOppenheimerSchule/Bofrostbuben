class WorkoutController {
    constructor(workoutService) {
      this.workoutService = workoutService
    }
  
    async handleGetWorkouts(request, response) {
      try {
        const workoutList = await this.workoutService.getAllWorkouts()
        response.json(workoutList)
      } catch (error) {
        response
          .status(error.status || 500)
          .json({ error: error.message || "Failed to fetch workouts: internal server error" })
      }
    }
  
    async handleGetWorkoutById(request, response) {
      try {
        const { id } = request.params
  
        if (!id) {
          return response.status(400).json({ error: "Workout ID is required" })
        }
  
        const workout = await this.workoutService.getWorkoutById(id)
  
        if (!workout) {
          return response.status(404).json({ error: "Workout not found" })
        }
  
        response.status(200).json(workout)
      } catch (error) {
        response
          .status(error.status || 500)
          .json({ error: error.message || "Failed to fetch workout: internal server error" })
      }
    }
  
    async handleCreateWorkout(request, response) {
      try {
        const workoutData = request.body || {}
        const createdWorkout = await this.workoutService.createWorkout(workoutData)
        response.status(201).json(createdWorkout)
      } catch (error) {
        response
          .status(error.status || 500)
          .json({ error: error.message || "Failed to create workout: internal server error" })
      }
    }
  
    async handleEditWorkout(request, response) {
      try {
        const workoutInformation = request.body || {}
        const editedWorkout = await this.workoutService.editWorkout(workoutInformation)
        response.status(200).json(editedWorkout)
      } catch (error) {
        response
          .status(error.status || 500)
          .json({ error: error.message || "Failed to edit workout: internal server error" })
      }
    }
  
    async handleDeleteWorkout(request, response) {
      try {
        const { id } = request.params
  
        if (!id) {
          return response.status(400).json({ error: "Workout ID is required" })
        }
  
        await this.workoutService.deleteWorkout(id)
  
        response.status(204).send()
      } catch (error) {
        response
          .status(error.status || 500)
          .json({ error: error.message || "Failed to delete workout: internal server error" })
      }
    }
  }
  
  module.exports = WorkoutController