export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  roots: ["<rootDir>/src", "<rootDir>/testing"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/testing/setUpTests.ts"],
  moduleNameMapper: {
    "^@testing-library/react$": "<rootDir>/node_modules/@testing-library/react",
    "^@testing-library/jest-dom$":
      "<rootDir>/node_modules/@testing-library/jest-dom",
  },
};
