const { MongoClient } = require("mongodb");

class MongoDbPlanRepository {
  constructor(
    mongoUri = process.env.MONGO_URL || "mongodb://appuser:apppass@db:27017/?authSource=admin",
    dbName = "appdb",
    collectionName = "plans"
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

      const plans = await this.collection.find({}).toArray();

      if (plans.length === 0) {
        return [
          {
            days: [],
            message: "No plans found",
          },
        ];
      }

      return plans;
    } catch (error) {
      throw new Error(`Failed to fetch plans: ${error.message}`);
    }
  }

  async save({ name, sessionsPerWeek, days, exercises }) {
    try {
      if (!this.collection) await this.connect();

      const obj = {
        name: name || '',
        sessionsPerWeek: Number(sessionsPerWeek) || 3,
        days: Array.isArray(days)
          ? days.map((d) => ({
              dayIndex: Number(d.dayIndex),
              exercises: Array.isArray(d.exercises)
                ? d.exercises.map((e) => ({
                    name: e.name,
                    muscleGroup: e.muscleGroup,
                  }))
                : [],
            }))
          : [],
        exercises: Array.isArray(exercises)
          ? exercises.map((e) => ({
              id: e.id ?? null,
              name: e.name,
              muscleGroup: e.muscleGroup,
            }))
          : [],
        createdAt: new Date(),
      };

      const result = await this.collection.insertOne(obj);

      return { ...obj, _id: result.insertedId };
    } catch (error) {
      throw new Error(`Failed to save plan: ${error.message}`);
    }
  }

  async update(planId, { name, sessionsPerWeek, days, exercises }) {
    try {
      if (!this.collection) await this.connect();
      
      const obj = {
        name: name || '',
        sessionsPerWeek: Number(sessionsPerWeek) || 3,
        days: Array.isArray(days)
          ? days.map((d) => ({
              dayIndex: Number(d.dayIndex),
              exercises: Array.isArray(d.exercises)
                ? d.exercises.map((e) => ({
                    name: e.name,
                    muscleGroup: e.muscleGroup,
                  }))
                : [],
            }))
          : [],
        exercises: Array.isArray(exercises)
          ? exercises.map((e) => ({
              id: e.id ?? null,
              name: e.name,
              muscleGroup: e.muscleGroup,
            }))
          : [],
      };

      const result = await this.collection.updateOne(
        { _id: planId },
        { $set: obj }
      );

      if (result.matchedCount === 0) {
        throw new Error("Plan not found");
      }

      return { ...obj, _id: planId };
    } catch (error) {
      throw new Error(`Failed to update plan: ${error.message}`);
    }
  }
}

module.exports = MongoDbPlanRepository;