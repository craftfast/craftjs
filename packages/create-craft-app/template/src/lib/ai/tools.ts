import { tool } from "ai";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";

/**
 * AI Tools for CraftJS App Builder
 * These tools let the AI create, read, and modify your project files
 */

// Project root directory (where src/ is located)
const PROJECT_ROOT = process.cwd();
const ALLOWED_DIRS = ["src", "public"];

/**
 * Validate that a path is within allowed directories
 */
function validatePath(filePath: string): { valid: boolean; fullPath: string; error?: string } {
  // Normalize and resolve the path
  const normalizedPath = path.normalize(filePath).replace(/^[/\\]+/, "");
  const fullPath = path.join(PROJECT_ROOT, normalizedPath);

  // Check if path is within project root
  if (!fullPath.startsWith(PROJECT_ROOT)) {
    return { valid: false, fullPath, error: "Path must be within project directory" };
  }

  // Check if path starts with allowed directories
  const isAllowed = ALLOWED_DIRS.some(
    (dir) => normalizedPath.startsWith(dir + path.sep) || normalizedPath.startsWith(dir + "/")
  );

  if (!isAllowed) {
    return {
      valid: false,
      fullPath,
      error: `Path must be within allowed directories: ${ALLOWED_DIRS.join(", ")}`,
    };
  }

  return { valid: true, fullPath };
}

/**
 * Create a new file in the project
 */
export const createFileTool = tool({
  description: `Create a new file in the project. Use this to create new pages, components, API routes, or any other files.
  
Examples:
- Create a new page: src/app/about/page.tsx
- Create a component: src/components/ui/card.tsx
- Create an API route: src/app/api/users/route.ts
- Add a public asset: public/images/logo.png

The file content should be complete and valid code.`,
  parameters: z.object({
    filePath: z.string().describe("Path relative to project root (e.g., 'src/app/about/page.tsx')"),
    content: z.string().describe("The complete file content"),
  }),
  execute: async ({ filePath, content }) => {
    const validation = validatePath(filePath);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    try {
      // Create directory if it doesn't exist
      await fs.mkdir(path.dirname(validation.fullPath), { recursive: true });

      // Check if file already exists
      try {
        await fs.access(validation.fullPath);
        return {
          success: false,
          error: `File already exists: ${filePath}. Use updateFile to modify it.`,
        };
      } catch {
        // File doesn't exist, we can create it
      }

      // Write the file
      await fs.writeFile(validation.fullPath, content, "utf-8");

      return {
        success: true,
        message: `Created ${filePath}`,
        path: filePath,
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to create file: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

/**
 * Read a file from the project
 */
export const readFileTool = tool({
  description: `Read the contents of a file in the project. Use this to understand existing code before making changes.`,
  parameters: z.object({
    filePath: z.string().describe("Path relative to project root (e.g., 'src/app/page.tsx')"),
  }),
  execute: async ({ filePath }) => {
    const validation = validatePath(filePath);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    try {
      const content = await fs.readFile(validation.fullPath, "utf-8");
      return {
        success: true,
        content,
        path: filePath,
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to read file: ${error instanceof Error ? error.message : "File not found"}`,
      };
    }
  },
});

/**
 * Update an existing file in the project
 */
export const updateFileTool = tool({
  description: `Update an existing file in the project. Provide the complete new content for the file.
  
Always read the file first with readFile to understand its current content, then provide the complete updated content.`,
  parameters: z.object({
    filePath: z.string().describe("Path relative to project root"),
    content: z.string().describe("The complete new file content"),
  }),
  execute: async ({ filePath, content }) => {
    const validation = validatePath(filePath);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    try {
      // Check if file exists
      try {
        await fs.access(validation.fullPath);
      } catch {
        return {
          success: false,
          error: `File does not exist: ${filePath}. Use createFile to create it.`,
        };
      }

      // Write the updated content
      await fs.writeFile(validation.fullPath, content, "utf-8");

      return {
        success: true,
        message: `Updated ${filePath}`,
        path: filePath,
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to update file: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

/**
 * Delete a file from the project
 */
export const deleteFileTool = tool({
  description: `Delete a file from the project. Use with caution.`,
  parameters: z.object({
    filePath: z.string().describe("Path relative to project root"),
  }),
  execute: async ({ filePath }) => {
    const validation = validatePath(filePath);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    try {
      await fs.unlink(validation.fullPath);
      return {
        success: true,
        message: `Deleted ${filePath}`,
        path: filePath,
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to delete file: ${error instanceof Error ? error.message : "File not found"}`,
      };
    }
  },
});

/**
 * List files in a directory
 */
export const listDirectoryTool = tool({
  description: `List all files and folders in a directory. Use this to explore the project structure.`,
  parameters: z.object({
    dirPath: z
      .string()
      .describe("Directory path relative to project root (e.g., 'src/app' or 'src/components')"),
  }),
  execute: async ({ dirPath }) => {
    const validation = validatePath(dirPath);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    try {
      const entries = await fs.readdir(validation.fullPath, { withFileTypes: true });

      const files: string[] = [];
      const directories: string[] = [];

      for (const entry of entries) {
        if (entry.isDirectory()) {
          directories.push(entry.name + "/");
        } else {
          files.push(entry.name);
        }
      }

      return {
        success: true,
        path: dirPath,
        directories: directories.sort(),
        files: files.sort(),
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to list directory: ${error instanceof Error ? error.message : "Directory not found"}`,
      };
    }
  },
});

/**
 * Calculator tool
 */
export const calculatorTool = tool({
  description: "Perform mathematical calculations",
  parameters: z.object({
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
  parameters: z.object({
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
  // File system tools (for app building)
  createFile: createFileTool,
  readFile: readFileTool,
  updateFile: updateFileTool,
  deleteFile: deleteFileTool,
  listDirectory: listDirectoryTool,
  // Utility tools
  calculator: calculatorTool,
  dateTime: dateTimeTool,
};

/**
 * App builder tools - these let AI create and modify project files
 */
export const appBuilderTools = {
  createFile: createFileTool,
  readFile: readFileTool,
  updateFile: updateFileTool,
  deleteFile: deleteFileTool,
  listDirectory: listDirectoryTool,
};

/**
 * Default tools for chat (excludes destructive operations)
 */
export const defaultTools = {
  createFile: createFileTool,
  readFile: readFileTool,
  updateFile: updateFileTool,
  listDirectory: listDirectoryTool,
  calculator: calculatorTool,
  dateTime: dateTimeTool,
};

export type ToolName = keyof typeof allTools;
