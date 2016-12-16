const chalk = require('chalk');

export function error(message) {
  const error = chalk.red(`ERR: ${message}`);
  console.log(error);
  process.exit(1);
}
