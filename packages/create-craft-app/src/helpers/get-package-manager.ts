interface CliOptions {
  useNpm?: boolean;
  useYarn?: boolean;
  usePnpm?: boolean;
  useBun?: boolean;
}

export function getPackageManager(options: CliOptions): string | undefined {
  if (options.useNpm) return "npm";
  if (options.useYarn) return "yarn";
  if (options.usePnpm) return "pnpm";
  if (options.useBun) return "bun";
  return undefined;
}
