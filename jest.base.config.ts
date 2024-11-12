// jest.base.config.ts
import type {Config} from 'jest';

const baseConfig: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};

export default baseConfig;
