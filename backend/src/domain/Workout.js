class Workout {
    constructor({ id = null, planId = null, dayIndex = null, exercises = [], completedAt = null, createdAt = null }) {
      this.id = id === null ? null : Number(id);
      this.planId = planId === null ? null : Number(planId);
      this.dayIndex = dayIndex === null ? null : Number(dayIndex);
  
      this.exercises = Array.isArray(exercises)
        ? exercises.map((e) => ({
            name: e.name,
            muscleGroup: e.muscleGroup,
            sets: Array.isArray(e.sets)
              ? e.sets.map((s) => ({
                  reps: Number(s.reps),
                  weight: Number(s.weight),
                }))
              : [],
          }))
        : [];
  
      this.completedAt = completedAt;
      this.createdAt = createdAt;
    }
  }
  
  module.exports = Workout;
  
   