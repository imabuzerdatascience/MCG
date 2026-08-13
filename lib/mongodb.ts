import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient | null>;
};

function createMongoClientPromise() {
  if (!uri) return undefined;

  return (globalForMongo.mongoClientPromise ?? (async () => {
    try {
      return await new MongoClient(uri).connect();
    } catch (error) {
      console.error("MongoDB connection failed at startup:", error);
      return null;
    }
  })());
}

export const mongoClientPromise = createMongoClientPromise();

if (process.env.NODE_ENV !== "production" && mongoClientPromise) {
  globalForMongo.mongoClientPromise = mongoClientPromise;
}

export async function getMongoDb() {
  if (!mongoClientPromise) {
    throw new Error("MONGODB_URI is not configured");
  }

  const client = await mongoClientPromise;
  if (!client) {
    throw new Error("MongoDB is not reachable right now");
  }

  const databaseName = process.env.MONGODB_DB ?? "mgc-associates";
  return client.db(databaseName);
}
