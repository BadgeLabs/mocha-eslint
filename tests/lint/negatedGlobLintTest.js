/*eslint-env node, mocha */
'use strict';

var lint = require('../../index.js');
var paths = ['tests/fixtures/{failing,passing}/*.js', '!tests/fixtures/failing/lintFail.js'];
var options = { formatter: 'stylish' };

lint(paths, options);
