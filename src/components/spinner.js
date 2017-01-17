const cliSpinners = require('cli-spinners');
const cliCursor = require('cli-cursor');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const { error } = require('../helpers.js');
const { clearLine, writeLine } = require('../util.js');

class Spinner {
  constructor(options) {
    if (typeof options === 'string') {
      options = { // eslint-disable-line
        text: options,
      };
    }

    const defaults = {
      color: 'white',
      format: ':spinner :text',
      interval: 60,
      text: '',
    };

    this.options = Object.assign({}, defaults, options);

    this.color = this.options.color;
    this.currentFrame = 0;
    this.format = this.options.format;
    this.id = null;
    this.text = this.options.text;
    this.spinner = cliSpinners[this.options.spinner] || cliSpinners.line;
    this.interval = this.spinner.interval || this.options.interval || 60;
    this.stream = this.options.stream || process.stderr;
  }

  getFrame() {
    const frames = this.spinner.frames;
    let frame = frames[this.currentFrame];

    try {
      frame = (this.color) ? chalk[this.color](frame) : frame;
    } catch (e) {
      error('Invalid spinner. Please refer to the documentation for valid list of spinners.');
    }

    this.currentFrame = (this.currentFrame + 1) % frames.length;

    return this.format
      .replace(':spinner', frame)
      .replace(':text', this.text);
  }

  render() {
    clearLine(this.stream);
    writeLine(this.stream, this.getFrame());

    return this;
  }

  start() {
    if (this.id) {
      return this;
    }

    this.currentFrame = 0;
    this.render();
    this.id = setInterval(this.render.bind(this), this.interval);
    cliCursor.hide();

    return this;
  }

  stop() {
    clearInterval(this.id);
    clearLine(this.stream);
    this.id = null;
    cliCursor.show();

    return this;
  }

  stopWith(symbol = ' ') {
    this.stop();
    writeLine(this.stream, `${symbol} ${this.text}\n`);

    return this;
  }

  setText(text) {
    if (text) {
      this.text = text;
    }
  }

  info(msg) {
    this.setText(msg);
    return this.stopWith(logSymbols.info);
  }

  succeed(msg) {
    this.setText(msg);
    return this.stopWith(logSymbols.success);
  }

  warn(msg) {
    this.setText(msg);
    return this.stopWith(logSymbols.warning);
  }

  fail(msg) {
    this.setText(msg);
    return this.stopWith(logSymbols.error);
  }
}

module.exports = function (options) { //eslint-disable-line
  return new Spinner(options);
};
