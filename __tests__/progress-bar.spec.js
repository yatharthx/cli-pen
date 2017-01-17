/* eslint-disable */
import { PassThrough as PassThroughStream } from 'stream';
import getStream from 'get-stream';
import stripAnsi from 'strip-ansi';
import test from 'ava';
import repeat from 'repeating';
import { ProgressBar } from '../lib';

const barCompletedChar = '█';
const barDueChar = '░';

const getPassThroughStream = () => {
  const stream = new PassThroughStream();
  stream.columns = 100;

  return stream;
};

test('should create a `ProgressBar`', (t) => {
  const progress = ProgressBar(5);
  t.is(progress.total, 5);
});

test('`.tick()` should increment progress by 1', async (t) => {
  const progress = new ProgressBar(5);
  progress.tick();

  t.is(progress.curr, 1);
});

test('`.tick()` should increment progress by supplied ticks', async (t) => {
  const progress = new ProgressBar(5);
  progress.tick(3);

  t.is(progress.curr, 3);
});
