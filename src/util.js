const readline = require('readline');

const CLEAR_WHOLE_LINE = 0;
const CLEAR_RIGHT_OF_CURSOR = 1;

export function clearLine(stream) {
  readline.clearLine(stream, CLEAR_WHOLE_LINE);
  readline.cursorTo(stream, 0);
}

export function writeLine(stream, message) {
  readline.cursorTo(stream, 0);
  stream.write(message);
  readline.clearLine(stream, CLEAR_RIGHT_OF_CURSOR);
}
