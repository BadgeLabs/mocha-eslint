/*eslint no-process-exit:0*/
'use strict';

var Mocha = require('mocha');
var Promise = require('es6-promise').Promise;

function runTest(file, options) {
  options = options || {};
  var mocha = new Mocha({
    // For some reason, tests take a long time on Windows (or at least AppVeyor)
    timeout: (process.platform === 'win32') ? 10000 : 2000,
    reporter: options.reporter || 'min',
  });

  mocha.addFile(file);

  var output, originalWrite;
  output = [];
  originalWrite = process.stdout.write;
  process.stdout.write = function(str) {
    output.push(str.toString('utf8'));
  };

  return new Promise(function(resolve) {
    mocha.run(function (failures) {
      process.stdout.write = originalWrite;
      resolve(output);
    });
  })
}

exports.runTest = runTest;
