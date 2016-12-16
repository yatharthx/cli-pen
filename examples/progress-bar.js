const { Pen, ProgressBar } = require('../lib');

const pen = Pen();
const progress = ProgressBar(100);
progress.tick();
setTimeout(() => { progress.tick(); }, 1200);
setTimeout(() => { progress.tick(); }, 1400);
setTimeout(() => { progress.tick(); }, 1900);
setTimeout(() => { progress.tick(); }, 2200);
setTimeout(() => { progress.tick(); }, 3200);
setTimeout(() => { progress.tick(93); }, 4200);
setTimeout(() => {
  progress.tick();
  pen.success('Build process complete.');
}, 5000);
