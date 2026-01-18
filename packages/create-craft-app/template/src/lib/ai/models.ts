import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";

/**
 * AI Model Configurations
 * Add or modify models as needed
 */
export const AI_MODELS = {
  // OpenAI Models
  "gpt-4o": {
    provider: "openai",
    model: openai("gpt-4o"),
    name: "GPT-4o",
    description: "Most capable OpenAI model for complex tasks",
    contextWindow: 128000,
    costPer1kInput: 0.005,
    costPer1kOutput: 0.015,
  },
  "gpt-4o-mini": {
    provider: "openai",
    model: openai("gpt-4o-mini"),
    name: "GPT-4o Mini",
    description: "Fast and affordable for simpler tasks",
    contextWindow: 128000,
    costPer1kInput: 0.00015,
    costPer1kOutput: 0.0006,
  },

  // Anthropic Models
  "claude-sonnet-4-20250514": {
    provider: "anthropic",
    model: anthropic("claude-sonnet-4-20250514"),
    name: "Claude Sonnet 4",
    description: "Latest Claude model with excellent reasoning",
    contextWindow: 200000,
    costPer1kInput: 0.003,
    costPer1kOutput: 0.015,
  },
  "claude-3-5-haiku-20241022": {
    provider: "anthropic",
    model: anthropic("claude-3-5-haiku-20241022"),
    name: "Claude 3.5 Haiku",
    description: "Fast and affordable Claude model",
    contextWindow: 200000,
    costPer1kInput: 0.0008,
    costPer1kOutput: 0.004,
  },

  // Google Models
  "gemini-2.0-flash": {
    provider: "google",
    model: google("gemini-2.0-flash"),
    name: "Gemini 2.0 Flash",
    description: "Google's fast multimodal model",
    contextWindow: 1000000,
    costPer1kInput: 0.000075,
    costPer1kOutput: 0.0003,
  },
} as const;

export type ModelId = keyof typeof AI_MODELS;

/**
 * Get model configuration by ID
 */
export function getModel(modelId: ModelId) {
  return AI_MODELS[modelId];
}

/**
 * Get all available models
 */
export function getAllModels() {
  return Object.entries(AI_MODELS).map(([id, config]) => ({
    id,
    ...config,
  }));
}

/**
 * Default model for new chats
 */
export const DEFAULT_MODEL: ModelId = "gpt-4o-mini";

/**
 * Check if a model ID is valid
 */
export function isValidModel(modelId: string): modelId is ModelId {
  return modelId in AI_MODELS;
}
