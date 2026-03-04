class Plan {
    constructor({ id = null, days = [], createdAt = null }) {
      this.id = id === null ? null : Number(id);
      this.days = Array.isArray(days)
        ? days.map((d) => ({
            dayIndex: Number(d.dayIndex),
            exercises: Array.isArray(d.exercises)
              ? d.exercises.map((e) => ({
                  name: e.name,
                  muscleGroup: e.muscleGroup,
                }))
              : [],
          }))
        : [];
      this.createdAt = createdAt;
    }
  }
  
  module.exports = Plan;