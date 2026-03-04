class Plan {
  constructor({ id = null, name = '', sessionsPerWeek = 3, days = [], exercises = [], createdAt = null }) {
    this.id = id === null ? null : Number(id);
    this.name = name;
    this.sessionsPerWeek = Number(sessionsPerWeek);

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

    this.exercises = Array.isArray(exercises)
      ? exercises.map((e) => ({
          id: e.id ?? null,
          name: e.name,
          muscleGroup: e.muscleGroup,
        }))
      : [];

    this.createdAt = createdAt;
  }
}

module.exports = Plan;