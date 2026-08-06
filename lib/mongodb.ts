import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;


const globalForMongo = globalThis as unknown as {
  mongoClientPromise?: Promise<MongoClient>;
};

export const mongoClientPromise = uri
  ? (globalForMongo.mongoClientPromise ?? new MongoClient(uri).connect())
  : undefined;

if (process.env.NODE_ENV !== "production" && mongoClientPromise) {
  globalForMongo.mongoClientPromise = mongoClientPromise;
}

export function getMongoDb() {
  if (!mongoClientPromise) {
    throw new Error("MONGODB_URI is not configured");
  }

  const databaseName = process.env.MONGODB_DB ?? "mgc-associates";
  return mongoClientPromise.then((client) => client.db(databaseName));
}
