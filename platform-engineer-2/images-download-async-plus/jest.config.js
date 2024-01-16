/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    "json",
    "clover"
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    'js',
    'mjs',
    "node",
  ],

  // The root directory that Jest should scan for tests and modules within
  rootDir: 'src',

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
    '**/*.spec.mjs'
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/']
}

module.exports = config
