var CLIEngine = require('eslint').CLIEngine;
var chalk = require('chalk');
var cli = new CLIEngine({});
var format = '';

module.exports = function (paths, options) {
  if (options && options.formatter) {
    format = options.formatter;
  }
  describe('eslint', function () {
    paths.forEach(function (p) {
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
            `${chalk.red('Code did not pass lint rules')}
            ${formatter(report.results)}`
          );
        }
      });
    });
  });
};
