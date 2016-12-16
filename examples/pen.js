const { Pen } = require('../lib');

const pen = Pen({
  format: ':symbol [:title] :message\n',
});
pen.warn('Modules dependencies outdated!');
pen.info('Updated PostCSS plugins.');
pen.success([
  'Build Successful',
  'Starting server...',
  'App running!',
], {
  format: ':symbol :message\n',
});
