// jest.base.config.ts
import type {Config} from 'jest';

const baseConfig: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  globals: {
    __DEV__: true, // Example of a global variable
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
  testEnvironment: 'node', // Default test environment
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  resetMocks: true,
};

export default baseConfig;
