const Exercise = require("../../domain/Exercise");

class InMemoryExerciseRepository {
  constructor() {
    this.items = [];
    this.nextId = 1;
  }

  async findAll() {
    // return shallow copies to avoid mutation
    return this.items.map(i => Object.assign({}, i));
  }

  async findById(id) {
    const el = this.items.find(e => Number(e.id) === Number(id));
    return el ? Object.assign({}, el) : null;
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
