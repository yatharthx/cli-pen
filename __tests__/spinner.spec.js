import { PassThrough as PassThroughStream } from 'stream';
import getStream from 'get-stream';
import stripAnsi from 'strip-ansi';
import test from 'ava';
import { Spinner } from '../lib';

const spinnerChar = '-';

const getPassThroughStream = () => new PassThroughStream();

test('main', async (t) => {
  t.plan(1);

  const stream = getPassThroughStream();

  const spinner = Spinner({
    stream,
    text: 'foo',
  });

  spinner.start();
  spinner.stop();

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.is(output, `${spinnerChar} foo`);
});

test('title shortcut', async (t) => {
  t.plan(1);

  const stream = getPassThroughStream();

  const spinner = Spinner('foo');
  spinner.stream = stream;

  spinner.start();
  spinner.stop();

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.is(output, `${spinnerChar} foo`);
});

test('`.id` not set on creation', (t) => {
  const spinner = Spinner('foo');
  const { id } = spinner;

  t.falsy(id);
});

test('ignore consecutive calls to `.start()`', (t) => {
  const spinner = Spinner('foo');

  spinner.start();
  const { id } = spinner;
  spinner.start();

  t.is(spinner.id, id);
  spinner.stop();
});

test('set text with `.setText()`', (t) => {
  const spinner = Spinner('foo');
  spinner.setText('bar');

  t.is(spinner.text, 'bar');
});

test('info', async (t) => {
  const stream = getPassThroughStream();

  const spinner = Spinner({
    stream,
    text: 'foo',
  });

  spinner.start();
  spinner.info();

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.regex(output, /(ℹ|i) foo/);
});

test('info with updated text', async (t) => {
  const stream = getPassThroughStream();

  const spinner = Spinner({
    stream,
    text: 'foo',
  });

  spinner.start();
  spinner.info('bar');

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.regex(output, /(ℹ|i) bar/);
});

test('succeed', async (t) => {
  const stream = getPassThroughStream();

  const spinner = Spinner({
    stream,
    text: 'foo',
  });

  spinner.start();
  spinner.succeed();

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.regex(output, /(✔|√) foo/);
});

test('succeed with updated text', async (t) => {
  const stream = getPassThroughStream();

  const spinner = Spinner({
    stream,
    text: 'foo',
  });

  spinner.start();
  spinner.succeed('bar');

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.regex(output, /(✔|√) bar/);
});

test('warn', async (t) => {
  const stream = getPassThroughStream();

  const spinner = Spinner({
    stream,
    text: 'foo',
  });

  spinner.start();
  spinner.warn();

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.regex(output, /(⚠|‼) foo/);
});

test('warn with updated text', async (t) => {
  const stream = getPassThroughStream();

  const spinner = Spinner({
    stream,
    text: 'foo',
  });

  spinner.start();
  spinner.warn('bar');

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.regex(output, /(⚠|‼) bar/);
});

test('fail', async (t) => {
  const stream = getPassThroughStream();

  const spinner = Spinner({
    stream,
    text: 'foo',
  });

  spinner.start();
  spinner.fail();

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.regex(output, /(✖|×) foo/);
});

test('fail with updated text', async (t) => {
  const stream = getPassThroughStream();

  const spinner = Spinner({
    stream,
    text: 'foo',
  });

  spinner.start();
  spinner.fail('bar');

  stream.end();
  const output = stripAnsi(await getStream(stream));

  t.regex(output, /(✖|×) bar/);
});
