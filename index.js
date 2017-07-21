var path = require('path');
var CLIEngine = require('eslint').CLIEngine;
var chalk = require('chalk');
var globAll = require('glob-all');
var replaceAll = require("replaceall");
var cli = new CLIEngine({});

function test(p, opts) {
  opts = opts || {};
  it('should have no errors in ' + p, function () {
    var format, warn;

    if (opts.timeout) {
      this.timeout(opts.timeout);
    }

    if (opts.slow) {
      this.slow(opts.slow);
    }

    if (opts.formatter) {
      format = opts.formatter;
    }

    if (opts.hasOwnProperty('alwaysWarn')) {
      warn = opts.alwaysWarn;
    } else {  // Show warnings by default
      warn = true;
    }

    var report = cli.executeOnFiles([p]);
    var formatter = cli.getFormatter(format);

    if (report) {
      if (report.errorCount > 0 || (opts.strict && report.warningCount > 0)) {
        throw new Error(
          chalk.red('Code did not pass lint rules') +
          // remove process.cwd() to convert absolute to relative paths
          replaceAll(process.cwd() + path.sep, '', formatter(report.results))
        );
      } else if (
        warn &&
        report.warningCount > 0
      ) {
        console.log(formatter(report.results));
      }
    }

  });
}

module.exports = function (patterns, options) {
  var contextName = (options && options.contextName) || 'eslint';
  describe(contextName, function () {
    globAll.sync(patterns).forEach(function (file) {
      test(file, options);
    });
  });
};
