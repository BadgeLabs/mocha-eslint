/*eslint-env node, mocha */
'use strict';

var runTest = require('../helpers/testRunner.js').runTest;

describe('Acceptance: mocha-eslint', function () {

  it('should pass test for lintSucceed.js', function () {
    return runTest('tests/lint/passingLintTest.js').then(function (results) {
      if (results[3].indexOf('1 passing') === -1) {
        throw new Error('Did not get a passing test');
      }
    });
  });

  it('should fail test for lintFail.js', function () {
    return runTest('tests/lint/failingLintTest.js').then(function (results) {
      if (results[4].indexOf('1 failing') === -1) {
        throw new Error('Did not get a failing test');
      }

      var reasonsCount = results[6].split('\n')
          .filter(function(line) { return line.indexOf('Code did not pass lint rules') !== -1; })
          .length;

      if (reasonsCount !== 1) {
        throw new Error('Counted ' + reasonsCount + ' failure reasons');
      }
    });
  });

  it('should fail test for multiple-failing fixture', function () {
    return runTest('tests/lint/multipleFailingLintTest.js').then(function (results) {
      if (results[4].indexOf('1 failing') === -1) {
        throw new Error('Did not get a failing test');
      }

      var reasonsCount = results[6].split('\n')
          .filter(function(line) { return line.indexOf('Code did not pass lint rules') !== -1; })
          .length;

      if (reasonsCount !== 1) {
        throw new Error('Counted ' + reasonsCount + ' failure reasons');
      }
    });
  });

  it('should test multiple paths correctly', function () {
    return runTest('tests/lint/multiplePathTest.js').then(function (results) {
      if (results[3].indexOf('1 passing') === -1 ||
        results[4].indexOf('1 failing') === -1) {
        throw new Error('Did not get a single pass and single failure');
      }
    });
  });

  it('should display warnings if no errors are present, but still pass', function () {
    return runTest('tests/lint/warningTrueLintTest.js').then(function (results) {
      if (results[2].indexOf('warning') === -1) {
        throw new Error('Did not give a warning');
      }
      if (results[4].indexOf('1 passing') === -1) {
        throw new Error('Did not pass test');
      }
    });
  });

  it('should not display warnings if alwaysWarn is false', function () {
    return runTest('tests/lint/warningFalseLintTest.js').then(function (results) {
      if (results[2].indexOf('warning') !== -1) {
        throw new Error('Gave a warning');
      }
      if (results[3].indexOf('1 passing') === -1) {
        throw new Error('Did not pass test');
      }
    });
  });

  it('should display warnings if alwaysWarn is not specified', function () {
    return runTest('tests/lint/warningDefaultLintTest.js').then(function (results) {
      if (results[2].indexOf('warning') === -1) {
        throw new Error('Did not give a warning');
      }
      if (results[4].indexOf('1 passing') === -1) {
        throw new Error('Did not pass test');
      }
    });
  });

  it('should accept glob patterns', function () {
    return runTest('tests/lint/globLintTest.js').then(function (results) {
      if (results[3].indexOf('1 passing') === -1 ||
        results[4].indexOf('1 failing') === -1) {
        throw new Error('Did not get a single pass and single failure');
      }
    });
  });

  it('should accept multiple glob patterns', function () {
    return runTest('tests/lint/multiGlobLintTest.js').then(function (results) {
      if (results[3].indexOf('1 passing') === -1 ||
        results[4].indexOf('1 failing') === -1) {
        throw new Error('Did not get a single pass and single failure');
      }
    });
  });

  it('should accept glob patterns using negation', function () {
    return runTest('tests/lint/negatedGlobLintTest.js').then(function (results) {
      if (results[3].indexOf('1 passing') === -1 ||
        results[4].indexOf('1 failing') !== -1) {
        throw new Error('Did not get a single pass');
      }
    });
  });

  it('should mocha context should default to `eslint` when not defined', function () {
      return runTest('tests/lint/contextNoOverrideTest.js', { reporter: 'spec' }).then(function (results) {
        if (results[2].indexOf('eslint') === -1) {
          throw new Error('Did not default the context name');
        }
      });
  });

  it('should overwrite mocha context name when options is passed in', function () {
    return runTest('tests/lint/contextOverrideTest.js', { reporter: 'spec' }).then(function (results) {
      if (results[2].indexOf('overridden context') === -1) {
        throw new Error('Did not override the context name');
      }
    });
  });

  it('should run successfully without passign options', function () {
    return runTest('tests/lint/contextNoOptionsTest.js').then(function (results) {
      if (results[3].indexOf('1 passing') === -1) {
        throw new Error('Did not get a passing test');
      }
    });
  });
});
