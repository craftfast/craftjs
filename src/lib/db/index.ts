import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Lazy initialization of database connection
let dbInstance: NeonHttpDatabase<typeof schema> | null = null;
let sqlInstance: NeonQueryFunction<false, false> | null = null;

function getDb() {
  if (!dbInstance) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL environment variable is not set. " +
          "Please set it in your .env file or environment variables."
      );
    }
    sqlInstance = neon(process.env.DATABASE_URL);
    dbInstance = drizzle(sqlInstance, { schema });
  }
  return dbInstance;
}

// Export a proxy that lazily initializes the database
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_, prop) {
    const instance = getDb();
    const value = instance[prop as keyof typeof instance];
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  },
});

// Export types for use in other files
export type Database = typeof db;
