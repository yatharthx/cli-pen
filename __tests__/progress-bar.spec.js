import test from 'ava';
import { ProgressBar } from '../lib';

test('should create a `ProgressBar`', (t) => {
  const progress = ProgressBar(5);
  t.is(progress.total, 5);
});

test('`.tick()` should increment progress by 1', (t) => {
  const progress = new ProgressBar(5);
  progress.tick();

  t.is(progress.curr, 1);
});

test('`.tick()` should increment progress by supplied ticks', (t) => {
  const progress = new ProgressBar(5);
  progress.tick(3);

  t.is(progress.curr, 3);
});
