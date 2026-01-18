import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { execa } from "execa";
import { updatePackageJson } from "./update-package-json.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CreateProjectOptions {
  projectName: string;
  packageManager: string;
}

export async function createProject({ projectName, packageManager }: CreateProjectOptions) {
  const projectDir = path.resolve(process.cwd(), projectName);
  const templateDir = path.join(__dirname, "..", "template");

  // Check if directory already exists
  if (fs.existsSync(projectDir)) {
    throw new Error(`Directory ${projectName} already exists`);
  }

  // Copy template to project directory
  await fs.copy(templateDir, projectDir, {
    filter: (src) => {
      // Exclude node_modules and .git
      const relativePath = path.relative(templateDir, src);
      return !relativePath.includes("node_modules") && !relativePath.includes(".git");
    },
  });

  // Update package.json with project name
  await updatePackageJson(projectDir, projectName);

  // Rename gitignore to .gitignore (npm ignores .gitignore when publishing)
  const gitignorePath = path.join(projectDir, "gitignore");
  const dotGitignorePath = path.join(projectDir, ".gitignore");
  if (fs.existsSync(gitignorePath)) {
    await fs.rename(gitignorePath, dotGitignorePath);
  }

  // Initialize git
  try {
    await execa("git", ["init"], { cwd: projectDir });
    await execa("git", ["add", "-A"], { cwd: projectDir });
    await execa("git", ["commit", "-m", "Initial commit from create-craft-app"], {
      cwd: projectDir,
    });
  } catch {
    // Git init failed, but we can continue
  }

  // Install dependencies
  const installCommand = packageManager === "npm" ? "install" : "install";
  await execa(packageManager, [installCommand], { cwd: projectDir, stdio: "inherit" });

  return projectDir;
}
