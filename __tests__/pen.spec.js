import { PassThrough as PassThroughStream } from 'stream';
import getStream from 'get-stream';
import stripAnsi from 'strip-ansi';
import test from 'ava';
import { Pen } from '../lib';

const getPassThroughStream = () => new PassThroughStream();

test('should create a `Pen`', (t) => {
  const pen = Pen();
  t.truthy(pen);
});

test('should write with specified `format`', async (t) => {
  const stream = getPassThroughStream();

  const pen = Pen({
    stream,
    format: ':title :message',
  });

  pen.info('foo');

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.is(output, 'info foo');
});

test('`.error() should write error message`', async (t) => {
  const stream = getPassThroughStream();

  const pen = Pen({ stream });

  pen.error('foo');

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.regex(output, /(✖|×) error foo/);
});

test('`.info() should write info message`', async (t) => {
  const stream = getPassThroughStream();

  const pen = Pen({ stream });

  pen.info('foo');

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.regex(output, /(ℹ|i) info foo/);
});

test('`.success() should write success message`', async (t) => {
  const stream = getPassThroughStream();

  const pen = Pen({ stream });

  pen.success('foo');

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.regex(output, /(✔|√) success foo/);
});

test('`.warn() should write warning message`', async (t) => {
  const stream = getPassThroughStream();

  const pen = Pen({ stream });

  pen.warn('foo');

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.regex(output, /(⚠|‼) warning foo/);
});
