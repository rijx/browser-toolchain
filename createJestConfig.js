module.exports = () => {
  return {
    transform: {
      "^.+\\.js$": "babel-jest",
      "^.+\\.(graphql|svg)$": "jest-raw-loader"
    },
    moduleNameMapper: {
      "\\.(css|scss)$": require.resolve("./empty")
    },
    transformIgnorePatterns: ["node_modules/(?!(@internal?))"],

    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.js"],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "html"],
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100
      }
    }
  };
};
