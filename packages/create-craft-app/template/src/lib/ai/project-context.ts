import { tool } from "ai";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";

/**
 * Project Context Tool for CraftJS App Builder
 * Scans the project structure so AI understands what exists
 */

const PROJECT_ROOT = process.cwd();

interface RouteInfo {
  path: string;
  type: "page" | "layout" | "api" | "loading" | "error" | "not-found";
  file: string;
}

interface ComponentInfo {
  name: string;
  path: string;
  file: string;
}

interface ProjectContext {
  routes: RouteInfo[];
  components: ComponentInfo[];
  hasDatabase: boolean;
  hasTailwind: boolean;
  dependencies: string[];
}

/**
 * Recursively scan a directory
 */
async function scanDirectory(dir: string, basePath: string = ""): Promise<string[]> {
  const results: string[] = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.isDirectory()) {
        // Skip node_modules and hidden directories
        if (entry.name.startsWith(".") || entry.name === "node_modules") {
          continue;
        }
        results.push(...(await scanDirectory(fullPath, relativePath)));
      } else {
        results.push(relativePath);
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
  }

  return results;
}

/**
 * Extract routes from the app directory
 */
async function extractRoutes(): Promise<RouteInfo[]> {
  const routes: RouteInfo[] = [];
  const appDir = path.join(PROJECT_ROOT, "src", "app");

  const files = await scanDirectory(appDir);

  for (const file of files) {
    const fileName = path.basename(file);
    const dirPath = path.dirname(file);

    // Convert file path to route path
    let routePath =
      "/" +
      dirPath
        .replace(/\\/g, "/")
        .replace(/^\.$/, "")
        .replace(/\/?\([^)]+\)/g, "") // Remove route groups like (auth)
        .replace(/\/+/g, "/")
        .replace(/^\/|\/$/g, "");

    if (routePath === "") routePath = "/";

    let type: RouteInfo["type"] | null = null;

    if (
      fileName === "page.tsx" ||
      fileName === "page.ts" ||
      fileName === "page.jsx" ||
      fileName === "page.js"
    ) {
      type = "page";
    } else if (fileName === "layout.tsx" || fileName === "layout.ts") {
      type = "layout";
    } else if (fileName === "route.ts" || fileName === "route.tsx") {
      type = "api";
    } else if (fileName === "loading.tsx") {
      type = "loading";
    } else if (fileName === "error.tsx") {
      type = "error";
    } else if (fileName === "not-found.tsx") {
      type = "not-found";
    }

    if (type) {
      routes.push({
        path: routePath || "/",
        type,
        file: `src/app/${file}`.replace(/\\/g, "/"),
      });
    }
  }

  return routes;
}

/**
 * Extract components from the components directory
 */
async function extractComponents(): Promise<ComponentInfo[]> {
  const components: ComponentInfo[] = [];
  const componentsDir = path.join(PROJECT_ROOT, "src", "components");

  const files = await scanDirectory(componentsDir);

  for (const file of files) {
    if (!file.match(/\.(tsx|jsx|ts|js)$/)) continue;

    const fileName = path.basename(file, path.extname(file));
    const dirPath = path.dirname(file);

    // Skip index files
    if (fileName === "index") continue;

    components.push({
      name: fileName,
      path: dirPath === "." ? "" : dirPath.replace(/\\/g, "/"),
      file: `src/components/${file}`.replace(/\\/g, "/"),
    });
  }

  return components;
}

/**
 * Check project configuration
 */
async function checkProjectConfig(): Promise<{
  hasDatabase: boolean;
  hasTailwind: boolean;
  dependencies: string[];
}> {
  let hasDatabase = false;
  let hasTailwind = false;
  let dependencies: string[] = [];

  try {
    // Check package.json
    const packageJson = await fs.readFile(path.join(PROJECT_ROOT, "package.json"), "utf-8");
    const pkg = JSON.parse(packageJson);

    const allDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
    };

    dependencies = Object.keys(allDeps);
    hasDatabase = "drizzle-orm" in allDeps || "prisma" in allDeps;
    hasTailwind = "tailwindcss" in allDeps;
  } catch {
    // Can't read package.json
  }

  return { hasDatabase, hasTailwind, dependencies };
}

/**
 * Get project context - full project structure for AI
 */
export const getProjectContextTool = tool({
  description: `Get the current project structure including all routes, components, and configuration.
  
Use this tool FIRST before making changes to understand:
- What pages/routes already exist
- What components are available
- Project configuration (database, styling, etc.)

This helps you make informed decisions about where to add new code and what patterns to follow.`,
  parameters: z.object({}),
  execute: async () => {
    try {
      const [routes, components, config] = await Promise.all([
        extractRoutes(),
        extractComponents(),
        checkProjectConfig(),
      ]);

      const context: ProjectContext = {
        routes,
        components,
        ...config,
      };

      return {
        success: true,
        context,
        summary: {
          totalRoutes: routes.filter((r) => r.type === "page").length,
          totalApiRoutes: routes.filter((r) => r.type === "api").length,
          totalComponents: components.length,
          hasDatabase: config.hasDatabase,
          hasTailwind: config.hasTailwind,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to scan project: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

/**
 * Get database schema if available
 */
export const getDatabaseSchemaTool = tool({
  description: `Get the current database schema. Use this to understand what tables/models exist before creating features that need data.`,
  parameters: z.object({}),
  execute: async () => {
    const schemaPath = path.join(PROJECT_ROOT, "src", "lib", "db", "schema", "index.ts");

    try {
      const content = await fs.readFile(schemaPath, "utf-8");

      // Extract table definitions (simple regex for common patterns)
      const tableMatches = content.match(/export const \w+ = \w+Table\(/g) || [];
      const tables = tableMatches.map((m) => m.match(/export const (\w+)/)?.[1]).filter(Boolean);

      return {
        success: true,
        schemaFile: "src/lib/db/schema/index.ts",
        content,
        tables,
      };
    } catch {
      return {
        success: false,
        error: "No database schema found at src/lib/db/schema/index.ts",
      };
    }
  },
});

export const projectContextTools = {
  getProjectContext: getProjectContextTool,
  getDatabaseSchema: getDatabaseSchemaTool,
};
