import baseConfig from "./base.js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...baseConfig,
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    },
  },
];
