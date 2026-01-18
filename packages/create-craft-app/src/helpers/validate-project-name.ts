const validationRegex = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;

export function validateProjectName(name: string): string | undefined {
  if (!name || name.trim().length === 0) {
    return "Project name cannot be empty";
  }

  if (!validationRegex.test(name)) {
    return "Project name must be lowercase and URL-friendly";
  }

  return undefined;
}
