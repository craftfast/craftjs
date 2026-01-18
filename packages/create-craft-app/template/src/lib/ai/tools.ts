import { tool } from "ai";
import { z } from "zod";

/**
 * AI Tools Definition
 * Define tools that the AI can use during conversations
 */

/**
 * Web search tool
 */
export const webSearchTool = tool({
  description: "Search the web for current information",
  inputSchema: z.object({
    query: z.string().describe("The search query"),
  }),
  execute: async ({ query }) => {
    // Implement your web search logic here
    // Could integrate with Tavily, Serper, or similar APIs
    console.log("Web search:", query);
    return {
      results: [],
      message: "Web search not implemented. Add your preferred search API.",
    };
  },
});

/**
 * Calculator tool
 */
export const calculatorTool = tool({
  description: "Perform mathematical calculations",
  inputSchema: z.object({
    expression: z.string().describe("The mathematical expression to evaluate"),
  }),
  execute: async ({ expression }) => {
    try {
      // Basic safe evaluation (consider using a proper math library in production)
      const result = Function(`"use strict"; return (${expression})`)();
      return { result: Number(result) };
    } catch {
      return { error: "Invalid mathematical expression" };
    }
  },
});

/**
 * Get current date/time tool
 */
export const dateTimeTool = tool({
  description: "Get the current date and time",
  inputSchema: z.object({
    timezone: z.string().optional().describe("The timezone (e.g., 'America/New_York')"),
  }),
  execute: async ({ timezone }) => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: timezone || "UTC",
    };
    return {
      datetime: now.toLocaleString("en-US", options),
      timestamp: now.toISOString(),
      timezone: timezone || "UTC",
    };
  },
});

/**
 * All available tools
 */
export const allTools = {
  webSearch: webSearchTool,
  calculator: calculatorTool,
  dateTime: dateTimeTool,
};

/**
 * Default tools for chat
 */
export const defaultTools = {
  calculator: calculatorTool,
  dateTime: dateTimeTool,
};

export type ToolName = keyof typeof allTools;
