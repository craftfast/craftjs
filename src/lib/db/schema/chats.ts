import { pgTable, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { users } from "./users";

/**
 * Chat conversations
 */
export const chats = pgTable("chats", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull().default("New Chat"),
  model: text("model").notNull().default("gpt-4o"), // Default AI model
  systemPrompt: text("system_prompt"), // Custom system prompt for this chat
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/**
 * Chat messages
 */
export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  chatId: text("chat_id")
    .notNull()
    .references(() => chats.id, { onDelete: "cascade" }),
  role: text("role", {
    enum: ["user", "assistant", "system", "tool"],
  }).notNull(),
  content: text("content").notNull(),
  // AI response metadata
  model: text("model"), // Which model generated this response
  promptTokens: integer("prompt_tokens"),
  completionTokens: integer("completion_tokens"),
  totalTokens: integer("total_tokens"),
  // Tool calls and results
  toolCalls: jsonb("tool_calls"), // Array of tool call objects
  toolResults: jsonb("tool_results"), // Array of tool result objects
  // Attachments (file references)
  attachments: jsonb("attachments"), // Array of { id, name, type, url }
  // Metadata
  metadata: jsonb("metadata"), // Any additional metadata
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Shared chats (public links)
 */
export const sharedChats = pgTable("shared_chats", {
  id: text("id").primaryKey(),
  chatId: text("chat_id")
    .notNull()
    .references(() => chats.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at"), // Optional expiration
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Types
export type Chat = typeof chats.$inferSelect;
export type NewChat = typeof chats.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type SharedChat = typeof sharedChats.$inferSelect;

// Message role type
export type MessageRole = "user" | "assistant" | "system" | "tool";
