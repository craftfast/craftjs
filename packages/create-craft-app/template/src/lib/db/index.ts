import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Lazy initialization of database connection
let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;
let sqlClient: ReturnType<typeof postgres> | null = null;

function getDb() {
  if (!dbInstance) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL environment variable is not set. " +
          "Please set it in your .env file or environment variables.\n" +
          "Run 'docker compose up' to start a local PostgreSQL database."
      );
    }
    // Use postgres.js for standard PostgreSQL connections
    // Works with any PostgreSQL: local Docker, cloud, or managed
    sqlClient = postgres(process.env.DATABASE_URL, {
      max: 10, // Connection pool size
      idle_timeout: 20,
      connect_timeout: 10,
    });
    dbInstance = drizzle(sqlClient, { schema });
  }
  return dbInstance;
}

// Export a proxy that lazily initializes the database
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
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

// Graceful shutdown
export async function closeDb() {
  if (sqlClient) {
    await sqlClient.end();
    sqlClient = null;
    dbInstance = null;
  }
}
