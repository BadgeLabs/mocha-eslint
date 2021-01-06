/*eslint no-process-exit:0*/
'use strict';

const Mocha = require('mocha');

function runTest(file, options) {
  options = options || {};
  const mocha = new Mocha({
    // For some reason, tests take a long time on Windows (or at least AppVeyor)
    timeout: (process.platform === 'win32') ? 10000 : 2000,
    reporter: options.reporter || 'min',
  });

  mocha.addFile(file);

  let output, originalWrite;
  output = [];
  originalWrite = process.stdout.write;
  process.stdout.write = function(str) {
    output.push(str.toString('utf8'));
  };

  return new Promise(function(resolve) {
    mocha.run(function (failures) {
      resolve(output);
    });
  }).finally(function () {
    process.stdout.write = originalWrite;
  })
}

exports.runTest = runTest;
