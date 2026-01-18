# Changesets

This folder is used by [Changesets](https://github.com/changesets/changesets) to track version updates.

## How to use

When you make a change that should be published:

1. Run `pnpm changeset`
2. Select the packages that have changed
3. Choose a bump type (major, minor, patch)
4. Write a summary of the changes

When ready to release:

1. Run `pnpm changeset version` to update versions
2. Run `pnpm changeset publish` to publish to npm
