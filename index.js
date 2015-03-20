var CLIEngine = require('eslint').CLIEngine;
var chalk = require('chalk');
var glob = require('glob');
var cli = new CLIEngine({});
var format;


function test(p) {
  it('should have no errors in ' + p, function () {
    try {
      var report = cli.executeOnFiles([p]);
      var formatter = cli.getFormatter(format);
    } catch (err) {
      throw new Error(err);
    }
    if (
      report &&
      report.errorCount > 0
    ) {
      throw new Error(
        chalk.red('Code did not pass lint rules') +
        formatter(report.results)
      );
    } else if (
      report &&
      report.warningCount > 0
    ) {
      console.log(formatter(report.results));
    }

  });
}

module.exports = function (patterns, options) {
  if (options && options.formatter) {
    format = options.formatter;
  }
  describe('eslint', function () {
    patterns.forEach(function (pattern) {
      if (glob.hasMagic(pattern)) {
        glob.sync(pattern).forEach(function (file) {
          test(file);
        });
      } else {
        test(pattern);
      }
    });
  });
};
