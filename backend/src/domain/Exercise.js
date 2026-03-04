class Exercise {
  constructor({ id = null, name, muscleGroup, description, createdAt = null }) {
    this.id = id || null;
    this.name = name;
    this.muscleGroup = muscleGroup;
    this.description = description;
    this.createdAt = createdAt;
  }
}

module.exports = Exercise;
