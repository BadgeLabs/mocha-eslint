/*eslint-env node, mocha */
'use strict';

var lint = require('../../index.js');
var paths = ['tests/fixtures/passing'];

lint(paths);
