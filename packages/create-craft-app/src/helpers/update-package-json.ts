import path from "path";
import fs from "fs-extra";

export async function updatePackageJson(projectDir: string, projectName: string) {
  const packageJsonPath = path.join(projectDir, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    return;
  }

  const packageJson = await fs.readJson(packageJsonPath);

  // Update the name
  packageJson.name = projectName;

  // Remove private flag if exists
  delete packageJson.private;

  // Reset version
  packageJson.version = "0.1.0";

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}
