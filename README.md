# mocha-eslint
[![Travis Build Status][travis-image]][travis-url]
[![Dependency Status][dependency-image]][dependency-rul]
[![NPM version][npm-image]][npm-url]

A simple way to run [ESLint](http://eslint.org/) in your
[Mocha](http://mochajs.org/) tests without a task runner like Grunt or Gulp.

Inspired by [mocha-jshint](https://github.com/Muscula/mocha-jshint) from
[Allan Ebdrup](https://github.com/Muscula).

## Installation

You can install into your Node.js project as a development dependency with:
```sh
npm install --save-dev mocha-eslint
```
`mocha-eslint` will install ESLint for itself, so you don't need to worry about
adding it to your consuming module.

The same is not true for Mocha. You should already have Mocha installed in your
consuming module.

## Usage

After mocha-eslint is installed, you can use it by creating a test file for
Mocha and requiring `mocha-eslint` like so:
```javascript
var lint = require('mocha-eslint');
```
This will return a function with the signature:
```javascript
lint(paths, options)
```
where `paths` is an array of paths from your project's top level directory (as
of v0.1.2, you can also include
[glob patterns](https://github.com/isaacs/node-glob#glob-primer)) and `options`
has a single property `formatter` that can be assigned to the name of any of the
[ESLint formatters](https://github.com/eslint/eslint/tree/master/lib/formatters)
(`stylish` (the default), `compact`, `checkstyle`, `jslint-xml`, `junit` and
`tap`) or the full path to a JavaScript file containing a custom formatter. If
`options` is not included, the default "stylish" formatter will be used.

So, a full test file to run in Mocha might look like:
```javascript
var lint = require('mocha-eslint');

// Array of paths to lint
// Note: a seperate Mocha test will be run for each path and each file which
// matches a glob pattern
var paths = [
  'bin',
  'lib',
  'tests/**/*Test.js',
  '!tests/NotATest.js', // negation also works
];

var options = {
  // Specify style of output
  formatter: 'compact',  // Defaults to `stylish`

  // Only display warnings if a test is failing
  alwaysWarn: false,  // Defaults to `true`, always show warnings

  // Increase the timeout of the test if linting takes to long
  timeout: 5000,  // Defaults to the global mocha `timeout` option

  // Increase the time until a test is marked as slow
  slow: 1000,  // Defaults to the global mocha `slow` option

  // Consider linting warnings as errors and return failure
  strict: true,  // Defaults to `false`, only notify the warnings

  // Specify the mocha context in which to run tests
  contextName: 'eslint',  // Defaults to `eslint`, but can be any string
};

// Run the tests
lint(paths, options);
```

## Notes

This module does not make any decisions about which ESLint rules to run. Make
sure your project has a `.eslintrc` file if you want ESLint to do anything.

[npm-image]: https://img.shields.io/npm/v/mocha-eslint.svg
[npm-url]: https://www.npmjs.com/package/mocha-eslint
[dependency-image]: https://david-dm.org/BadgeLabs/mocha-eslint.svg
[dependency-rul]: https://david-dm.org/BadgeLabs/mocha-eslint
[travis-image]: https://travis-ci.org/BadgeLabs/mocha-eslint.svg?branch=master
[travis-url]: https://travis-ci.org/BadgeLabs/mocha-eslint
