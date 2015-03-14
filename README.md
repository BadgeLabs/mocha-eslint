# mocha-eslint
Run [ESLint](http://eslint.org/) in [Mocha](http://mochajs.org/) tests.

Inspired by [mocha-jshint](https://github.com/Muscula/mocha-jshint) from
[Allan Ebdrup](https://github.com/Muscula).

## Installation

You can install into your node.js project as a development dependency with:
```
$ npm install --save-dev mocha-eslint
```

## Usage

After mocha-eslint is installed, you can use it by creating a test file for
Mocha and requiring mocha-eslint like so:
```
var lint = require('mocha-eslint');
```
This will return a function with the signature:
```
lint(paths, options)
```
where `paths` is an array of paths from your project's top level directory
and `options` has a single property `"formatter"` which can be assigned to the
name of any of the
[ESLint formatters](https://github.com/eslint/eslint/tree/master/lib/formatters)
("stylish" (the default), "compact", "checkstyle", "jslint-xml", "junit" and
"tap") or the full path to a JavaScript file containing a custom formatter.  If
`options` is not included, the default "stylish" formatter will be used.

So, a full test file to run in Mocha might look like:

```
var lint = require('mocha-eslint');

// Array of paths to lint
// Note: a seperate Mocha test will be run for each path
var paths = [
  'bin',
  'lib',
  'tests',
];

// Specify style of output
var options = {};
options.formatter = 'compact';

// Get the party started
lint(paths, options);
```

## Notes

This module does not make any decisions about which ESLint rules to run.  Make
sure your project has a .eslintrc file if you want something other than the
default ESLint rules to execute.
