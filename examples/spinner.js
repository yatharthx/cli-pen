const { Spinner } = require('../lib');

const spinner = Spinner({
  spinner: process.argv[2],
  text: 'Loading maps...',
});
spinner.start();
setTimeout(() => {
  spinner.warn('Unable to fetch maps!');
}, 2000);
setTimeout(() => {
  spinner.text = 'Retrying...';
  spinner.start();
}, 4000);
setTimeout(() => { spinner.color = 'yellow'; }, 5000);
setTimeout(() => { spinner.text = 'Maps loaded.'; }, 8000);
setTimeout(() => { spinner.succeed(); }, 9000);

// Usage: node spinner.js <spinner-name>
