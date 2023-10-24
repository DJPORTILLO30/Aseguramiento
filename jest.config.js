module.exports = {
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?)$',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
  };
  