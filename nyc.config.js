module.exports = {
  all: true,
  include: ["src/**/*.ts", "src/**/*.vue", "tests/**/*.ts"],
  exclude: ["src/**/*.ts", "src/router/*", "src/**/*.stories.ts"],
  extension: [".ts", ".vue"],
  reporter: ["lcov", "text", "text-summary"],
  extends: ["@istanbuljs/nyc-config-typescript"],
  checkCoverage: true,
};
