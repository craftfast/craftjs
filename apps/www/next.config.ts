import nextra from "nextra";

const withNextra = nextra({
  defaultShowCopyCode: true,
  search: {
    codeblocks: false,
  },
});

const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      "next-mdx-import-source-file": "./mdx-components.tsx",
    },
  },
};

export default withNextra(nextConfig);
