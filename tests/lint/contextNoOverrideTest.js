/*eslint-env node, mocha */
'use strict';

var lint = require('../../index.js');
var paths = ['tests/fixtures/passing'];
var options = {};

lint(paths, options);
