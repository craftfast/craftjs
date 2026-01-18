# Contributing to CraftJS

Thank you for your interest in contributing to CraftJS! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Submitting Changes](#submitting-changes)
- [Coding Guidelines](#coding-guidelines)

## Code of Conduct

Please be respectful and considerate of others. We want this to be a welcoming community for everyone.

## Getting Started

### Prerequisites

- Node.js >= 18.17.0
- pnpm >= 9.0.0

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/craftjs.git
   cd craftjs
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feat/your-feature-name
   ```

## Development Workflow

### Running the Development Server

```bash
# Run all apps in development mode
pnpm dev

# Run only the docs site
pnpm dev:www

# Build all packages
pnpm build

# Run linting
pnpm lint

# Run type checking
pnpm typecheck

# Format code
pnpm format
```

### Testing the CLI Locally

```bash
cd packages/create-craft-app
pnpm build
pnpm start my-test-app
```

## Project Structure

```
craftjs/
├── apps/
│   └── www/                    # Documentation site (Nextra)
├── packages/
│   └── create-craft-app/       # CLI tool
│       ├── src/                # CLI source code
│       └── template/           # Template files
├── tooling/
│   ├── eslint/                 # Shared ESLint config
│   ├── prettier/               # Shared Prettier config
│   └── typescript/             # Shared TypeScript config
├── .changeset/                 # Changesets for versioning
├── turbo.json                  # Turborepo configuration
└── pnpm-workspace.yaml         # PNPM workspace config
```

## Submitting Changes

### Creating a Changeset

If your changes affect the published packages (like `create-craft-app`), you need to create a changeset:

```bash
pnpm changeset
```

Follow the prompts to:

1. Select the packages that have changed
2. Choose a bump type (major, minor, patch)
3. Write a summary of the changes

### Pull Request Process

1. Ensure all tests pass and there are no linting errors
2. Update documentation if needed
3. Create a changeset for publishable changes
4. Submit a pull request with a clear description

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:

```
feat(cli): add support for bun package manager
fix(template): correct database connection handling
docs: update installation instructions
```

## Coding Guidelines

### TypeScript

- Use strict TypeScript configuration
- Prefer `type` over `interface` for object types
- Use explicit return types for functions
- Avoid `any` - use `unknown` if necessary

### Code Style

- Use Prettier for formatting (run `pnpm format`)
- Follow ESLint rules (run `pnpm lint`)
- Use meaningful variable and function names
- Add comments for complex logic

### File Organization

- Keep files small and focused
- Use barrel exports (`index.ts`) for public APIs
- Co-locate related files

## Questions?

If you have questions, feel free to:

- Open an issue
- Start a discussion
- Reach out on Twitter/X

Thank you for contributing! 🎉
