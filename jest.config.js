// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // An alternative API to setting the NODE_PATH env variable, modulePaths is an
  // array of absolute paths to additional locations to search when resolving modules.
  // Use the <rootDir> string token to include the path to your project's root directory. Example: ['<rootDir>/app/'].
  modulePaths: ['./src'],

  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/test/__mocks__/styleMock.js'
  },

  automock: false,

  setupFilesAfterEnv: ['<rootDir>/src/test/jest.setup.js'],

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  collectCoverage: true,

  coverageReporters: ['json', 'html', 'cobertura', 'json-summary'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'jsx'],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: ['<rootDir>/enzyme.config.js'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],

  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
  },

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: 'http://localhost',

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  // Indicates whether each individual test should be reported during the run
  verbose: false,

  reporters: [
    'default',
    ['jest-junit',
      {
        suiteName: 'jest tests',
        outputDirectory: 'perf/reports',
        outputName: 'junit.xml',
        uniqueOutputName: 'false',
        classNameTemplate: '{classname}-{title}',
        titleTemplate: '{classname}-{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: 'true'
      }
    ]
  ]
};
