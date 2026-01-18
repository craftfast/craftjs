import { runCli } from "./cli.js";

async function main() {
  await runCli();
}

main().catch((error) => {
  console.error("An unexpected error occurred:", error);
  process.exit(1);
});
