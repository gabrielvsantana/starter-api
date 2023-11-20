const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['main.ts'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/configs/',
    '<rootDir>/migrations/',
  ],
  modulePaths: [compilerOptions.baseUrl],
  preset: 'ts-jest',
  rootDir: './',
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  testTimeout: 60000,
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
