/*eslint-env node, mocha */
'use strict';

// var Mocha = require('mocha');

var runTest = require('../helpers/testRunner.js').runTest;

describe('Acceptance: mocha-eslint', function () {

  it('should pass test for lintSucceed.js', function (done) {
    runTest('tests/lint/passingLintTest.js', function (results) {
      if (results[3].indexOf('1 passing') === -1) {
        throw new Error('Did not get a passing test');
      }
      done();
    });
  });

  it('should fail test for lintFail.js', function (done) {
    runTest('tests/lint/failingLintTest.js', function (results) {
      if (results[4].indexOf('1 failing') === -1) {
        throw new Error('Did not get a failing test');
      }
      done();
    });
  });

  it('should test multiple paths correctly', function (done) {
    runTest('tests/lint/multiplePathTest.js', function (results) {
      if (results[3].indexOf('1 passing') === -1 ||
        results[4].indexOf('1 failing') === -1) {
        throw new Error('Did not get a single pass and single failure');
      }
      done();
    });
  });

  it('should display warnings if no errors are present, but still pass', function (done) {
    runTest('tests/lint/warningTrueLintTest.js', function (results) {
      if (results[2].indexOf('warning') === -1) {
        throw new Error('Did not give a warning');
      }
      if (results[4].indexOf('1 passing') === -1) {
        throw new Error('Did not pass test');
      }
      done();
    });
  });

  it('should not display warnings if alwaysWarn is false', function (done) {
    runTest('tests/lint/warningFalseLintTest.js', function (results) {
      if (results[2].indexOf('warning') !== -1) {
        throw new Error('Gave a warning');
      }
      if (results[3].indexOf('1 passing') === -1) {
        throw new Error('Did not pass test');
      }
      done();
    });
  });

  it('should display warnings if alwaysWarn is not specified', function (done) {
    runTest('tests/lint/warningDefaultLintTest.js', function (results) {
      if (results[2].indexOf('warning') === -1) {
        throw new Error('Did not give a warning');
      }
      if (results[4].indexOf('1 passing') === -1) {
        throw new Error('Did not pass test');
      }
      done();
    });
  });

  it('should accept glob patterns', function (done) {
    runTest('tests/lint/globLintTest.js', function (results) {
      if (results[3].indexOf('1 passing') === -1 ||
        results[4].indexOf('1 failing') === -1) {
        throw new Error('Did not get a single pass and single failure');
      }
      done();
    });
  });

  it('should accept multiple glob patterns', function (done) {
    runTest('tests/lint/multiGlobLintTest.js', function (results) {
      if (results[3].indexOf('1 passing') === -1 ||
        results[4].indexOf('1 failing') === -1) {
        throw new Error('Did not get a single pass and single failure');
      }
      done();
    });
  });

  it('should accept glob patterns using negation', function (done) {
    runTest('tests/lint/negatedGlobLintTest.js', function (results) {
      if (results[3].indexOf('1 passing') === -1 ||
        results[4].indexOf('1 failing') !== -1) {
        throw new Error('Did not get a single pass');
      }
      done();
    });
  });
});
