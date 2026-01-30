import { intro, outro, text, select, confirm, spinner, isCancel, cancel } from "@clack/prompts";
import chalk from "chalk";
import { Command } from "commander";
import { createProject } from "./helpers/create-project.js";
import { getPackageManager } from "./helpers/get-package-manager.js";
import { validateProjectName } from "./helpers/validate-project-name.js";

const DEFAULT_PROJECT_NAME = "my-craft-app";

export async function runCli() {
  const program = new Command()
    .name("create-craft-app")
    .description("Create a new Craft.js application")
    .version("1.0.0")
    .argument("[project-name]", "Name of the project")
    .option("-y, --yes", "Skip all prompts and use defaults")
    .option("--use-npm", "Use npm as package manager")
    .option("--use-yarn", "Use yarn as package manager")
    .option("--use-pnpm", "Use pnpm as package manager")
    .option("--use-bun", "Use bun as package manager")
    .parse(process.argv);

  const options = program.opts();
  const args = program.args;

  console.log();
  intro(chalk.bgCyan.black(" create-craft-app "));

  // Get project name
  let projectName = args[0];

  if (!projectName && !options.yes) {
    const nameResult = await text({
      message: "What will your project be called?",
      placeholder: DEFAULT_PROJECT_NAME,
      defaultValue: DEFAULT_PROJECT_NAME,
      validate: validateProjectName,
    });

    if (isCancel(nameResult)) {
      cancel("Operation cancelled.");
      process.exit(0);
    }

    projectName = nameResult || DEFAULT_PROJECT_NAME;
  } else {
    projectName = projectName || DEFAULT_PROJECT_NAME;
  }

  // Get package manager
  let packageManager = getPackageManager(options);

  if (!packageManager && !options.yes) {
    const pmResult = await select({
      message: "Which package manager would you like to use?",
      options: [
        { value: "pnpm", label: "pnpm", hint: "recommended" },
        { value: "npm", label: "npm" },
        { value: "yarn", label: "yarn" },
        { value: "bun", label: "bun" },
      ],
      initialValue: "pnpm",
    });

    if (isCancel(pmResult)) {
      cancel("Operation cancelled.");
      process.exit(0);
    }

    packageManager = pmResult as string;
  } else {
    packageManager = packageManager || "pnpm";
  }

  // Confirm installation
  if (!options.yes) {
    const shouldContinue = await confirm({
      message: `Create ${chalk.cyan(projectName)} with ${chalk.cyan(packageManager)}?`,
      initialValue: true,
    });

    if (isCancel(shouldContinue) || !shouldContinue) {
      cancel("Operation cancelled.");
      process.exit(0);
    }
  }

  // Create the project
  const s = spinner();
  s.start("Creating your Craft.js application...");

  try {
    await createProject({
      projectName,
      packageManager,
    });
    s.stop("Project created successfully!");
  } catch (error) {
    s.stop("Failed to create project");
    console.error(chalk.red("Error:"), error);
    process.exit(1);
  }

  // Success message
  console.log();
  outro(chalk.green("🎉 Your Craft.js app is ready!"));

  console.log();
  console.log(chalk.bgGreen.black(" Quick Start "));
  console.log();
  console.log(`  ${chalk.cyan("1.")} cd ${projectName}`);
  console.log(`  ${chalk.cyan("2.")} cp .env.example .env`);
  console.log(`  ${chalk.cyan("3.")} docker compose up -d`);
  console.log(
    `  ${chalk.cyan("4.")} ${packageManager === "npm" ? "npm run" : packageManager} db:push`
  );
  console.log(`  ${chalk.cyan("5.")} ${packageManager === "npm" ? "npm run" : packageManager} dev`);
  console.log();
  console.log(chalk.dim("Your app will be running at http://localhost:3000"));
  console.log();
  console.log(chalk.bgBlue.black(" What's included "));
  console.log();
  console.log(`  ${chalk.green("✓")} PostgreSQL database (Docker)`);
  console.log(`  ${chalk.green("✓")} Authentication (email/password)`);
  console.log(`  ${chalk.green("✓")} AI chat interface (add your API key)`);
  console.log(`  ${chalk.green("✓")} AI app builder (create pages via chat)`);
  console.log();
  console.log(chalk.dim("No external services required - everything runs locally!"));
  console.log();
  console.log(chalk.bgYellow.black(" Optional "));
  console.log();
  console.log(
    `  Add AI: Set ${chalk.cyan("OPENAI_API_KEY")} or ${chalk.cyan("ANTHROPIC_API_KEY")} in .env`
  );
  console.log(`  Local AI: Uncomment ${chalk.cyan("ollama")} in docker-compose.yml`);
  console.log();
  console.log(chalk.dim("Documentation: https://craftjs.dev"));
  console.log();
}
