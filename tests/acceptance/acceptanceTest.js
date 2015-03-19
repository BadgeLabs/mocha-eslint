/*eslint-env node, mocha */
'use strict';

// var Mocha = require('mocha');

var runTest = require('../helpers/testRunner.js').runTest;

describe('Acceptance: mocha-eslint', function() {

  it('should pass test for lintSucceed.js', function (done) {
    runTest('tests/lint/passingLintTest.js', function (results) {
      if (results[3].indexOf('1 passing') === -1) {
        throw new Error('Did not get a passing test');
      };
      done()
    });
  })

  it('should fail test for lintFail.js', function (done) {
    runTest('tests/lint/failingLintTest.js', function (results) {
      if (results[4].indexOf('1 failing') === -1) {
        throw new Error('Did not get a failing test');
      };
      done()
    });
  })

  it('should test multiple paths correctly', function (done) {
    runTest('tests/lint/multiplePathTest.js', function (results) {
      if (results[3].indexOf('1 passing') === -1 ||
        results[4].indexOf('1 failing') === -1) {
        throw new Error('Did not get a single pass and single failure');
      };
      done()
    });
  });
});
