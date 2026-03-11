const { MongoClient, ObjectId } = require("mongodb");

class MongoDbWorkoutRepository {
  constructor(
    mongoUri = process.env.MONGO_URL || "mongodb://appuser:apppass@db:27017/?authSource=admin",
    dbName = "appdb",
    collectionName = "workouts"
  ) {
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
      const workouts = await this.collection.find({}).toArray();

      if (workouts.length === 0) {
        return [{ name: "No workouts found", exercises: [] }];
      }

      return workouts;
    } catch (error) {
      throw new Error(`Failed to fetch workouts: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      if (!this.collection) await this.connect();

      const workout = await this.collection.findOne({ _id: new ObjectId(id) });

      if (!workout) {
        const error = new Error(`Workout with id ${id} not found`);
        error.status = 404;
        throw error;
      }

      return workout;
    } catch (error) {
      throw new Error(`Failed to fetch workout: ${error.message}`);
    }
  }

  async edit({ id, name, exercises }) {
    try {
      if (!this.collection) await this.connect();

      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name,
            exercises: Array.isArray(exercises) ? exercises : [],
          },
        }
      );

      if (result.matchedCount === 0) {
        const error = new Error(`Workout with id ${id} not found`);
        error.status = 404;
        throw error;
      }

      return result.modifiedCount > 0;
    } catch (error) {
      throw new Error(`Failed to edit workout: ${error.message}`);
    }
  }

  async save({ name, exercises }) {
    try {
      if (!this.collection) await this.connect();

      const obj = {
        name,
        exercises: Array.isArray(exercises) ? exercises : [],
        createdAt: new Date(),
      };

      const result = await this.collection.insertOne(obj);
      return { ...obj, _id: result.insertedId };
    } catch (error) {
      throw new Error(`Failed to save workout: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      if (!this.collection) await this.connect();
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        const error = new Error(`Workout with id ${id} not found`);
        error.status = 404;
        throw error;
      }

      return true;
    } catch (error) {
      throw new Error(`Failed to delete workout: ${error.message}`);
    }
  }
}

module.exports = MongoDbWorkoutRepository;