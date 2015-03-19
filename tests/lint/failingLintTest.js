/*eslint-env node, mocha */
'use strict';

var lint = require('../../index.js');
var paths = ['tests/fixtures/failing'];
var options = { formatter: 'stylish' };

lint(paths, options);
