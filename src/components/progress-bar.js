const cliCursor = require('cli-cursor');
const repeat = require('repeating');
const { clearLine, writeLine } = require('../util.js');

const cliProgressBars = {
  bars: [
    '█',
    '░',
  ],
};

class ProgressBar {
  constructor(options) {
    if (typeof options === 'number') {
      options = { // eslint-disable-line
        total: options,
      };
    }

    if (options.total === undefined) {
      throw new Error('`total` bar length is missing in options.');
    }

    const defaults = {
      format: ':bar',
      frames: cliProgressBars.bars,
      interval: 60,
    };

    this.options = Object.assign({}, defaults, options);

    this.total = this.options.total;
    this.format = this.options.format;
    this.frames = this.options.frames;
    this.interval = this.options.interval;
    this.curr = 0;
    this.id = null;
    this.stream = options.stream || process.stderr;
    clearLine(this.stream);
  }

  tick(len) {
    this.curr += len || 1;

    if (!this.id) {
      this.id = setTimeout(this.render.bind(this), this.interval);
    }

    if (this.curr >= this.total) {
      clearTimeout(this.id);
      clearLine(this.stream);
      writeLine(this.stream, '\n');
    }
  }

  render() {
    cliCursor.hide();
    clearTimeout(this.id);
    this.id = null;

    let ratio = this.curr / this.total;
    ratio = Math.min(Math.max(ratio, 0), 1);

    // progress
    let bar = ` ${this.curr}/${this.total}`;

    // progress bar (actual) size computation
    const availableSpace = Math.max(0, this.stream.columns - bar.length - 1);
    const width = Math.min(this.total, availableSpace);
    const completeLength = Math.round(width * ratio);
    const complete = repeat(completeLength, this.frames[0]);
    const incomplete = repeat(width - completeLength, this.frames[1]);
    bar = `${complete}${incomplete}${bar}`;
    bar = this.format.replace(':bar', bar);

    clearLine(this.stream);
    writeLine(this.stream, bar);
  }
}

module.exports = function (options) { //eslint-disable-line
  return new ProgressBar(options);
};
