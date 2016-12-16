const chalk = require('chalk');
const logSymbols = require('log-symbols');
const { error } = require('../helpers.js');
const { clearLine, writeLine } = require('../util.js');

class Log {
  constructor(options) {
    const defaults = {
      color: 'gray',
      format: ':symbol :title :message\n',
      text: '\n',
      titleColor: 'white',
    };

    this.options = Object.assign({}, defaults, options);

    this.type = this.options.type;
    this.color = this.options.color;
    this.format = this.options.format;
    this.text = this.options.text;
    this.title = this.options.title;
    this.titleColor = this.options.titleColor;
    this.stream = this.options.stream;
  }

  /* set custom configuration for `Log` instance */
  set(options = {}) {
    Object.keys(options).forEach((key) => {
      if (this[key]) {
        this[key] = options[key];
      } else {
        error(`No property '${key}' found on \`Pen.${this.type.replace('warning', 'warn')}()\``);
      }
    });
  }

  /* constructs and returns print-ready message */
  message(msg) {
    const title = (chalk[this.titleColor])
      ? chalk[this.titleColor](this.title)
      : this.title;
    const text = (chalk[this.color])
      ? chalk[this.color](msg)
      : msg;

    return this.format
      .replace(':symbol', logSymbols[this.type])
      .replace(':title', title)
      .replace(':message', text);
  }

  /* prints message(s) on console */
  print(msg) {
    clearLine(this.stream);
    writeLine(this.stream, msg);
  }

  render(message = '', options = {}) {
    this.set(options);

    if (chalk[this.color] === undefined) {
      error('Invalid `color`. Please refer to the documentation for valid list of colors.');
    }

    // make message(s) as an Array<string>.
    let messages;
    if (typeof message === 'string') {
      messages = [message];
    } else if (Array.isArray(message)) {
      messages = message;
    } else {
      error('ERR: message(s) are expected to be of type `string` or `Array<string>`');
    }

    messages.forEach((msg) => {
      this.print(this.message(msg));
    });
  }
}

module.exports = function (options) { // eslint-disable-line
  return new Log(options);
};
