const Exercise = require("../../domain/Exercise");

class InMemoryExerciseRepository {
  constructor() {
    this.nextId = 1;
    // Pre-populate with static exercises so callers get a deterministic response
    this.items = [
      {
        id: this.nextId++,
        name: "Push-up",
        muscleGroup: "Chest",
        description: "A basic push-up exercise",
        createdAt: new Date(),
      },
      {
        id: this.nextId++,
        name: "Squat",
        muscleGroup: "Legs",
        description: "Bodyweight squat",
        createdAt: new Date(),
      },
    ];
  }

  async findAll() {
    // return shallow copies to avoid mutation
    return this.items.map(i => Object.assign({}, i));
  }

  async save({ name, muscleGroup, description }) {
    const obj = {
      id: this.nextId++,
      name,
      muscleGroup,
      description: description || "",
      createdAt: new Date()
    };
    this.items.push(obj);
    return Object.assign({}, obj);
  }
}

module.exports = InMemoryExerciseRepository;
