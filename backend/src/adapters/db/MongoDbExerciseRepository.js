const { MongoClient } = require("mongodb");

class MongoDbExerciseRepository {
  constructor(mongoUri = process.env.MONGO_URL || "mongodb://appuser:apppass@db:27017/?authSource=admin", dbName = "appdb", collectionName = "exercises") {
    this.mongoUri = mongoUri;
    this.dbName = dbName;
    this.collectionName = collectionName;
    this.client = null;
    this.collection = null;
  }

  async connect() {
    try {
      this.client = new MongoClient(this.mongoUri);
      await this.client.connect();
      const db = this.client.db(this.dbName);
      this.collection = db.collection(this.collectionName);
    } catch (error) {
      throw new Error(`Failed to connect to MongoDB: ${error.message}`);
    }
  }

  async findAll() {
    try {
      if (!this.collection) await this.connect();
      const exercises = await this.collection.find({}).toArray();

      // if the exercises collection is empty, return array with "No exercises found"
        if (exercises.length === 0) {
            return [{ name: "No exercises found", muscleGroup: "", description: "" }];
        }   
      return exercises;
    } catch (error) {
      throw new Error(`Failed to fetch exercises: ${error.message}`);
    }
  }

  async save({ name, muscleGroup, description }) {
    try {
      if (!this.collection) await this.connect();
      
      const obj = {
        name,
        muscleGroup,
        description: description || "",
        createdAt: new Date()
      };
      const result = await this.collection.insertOne(obj);
      return { ...obj, _id: result.insertedId };
    } catch (error) {
      throw new Error(`Failed to save exercise: ${error.message}`);
    }
  }
}

module.exports = MongoDbExerciseRepository;
