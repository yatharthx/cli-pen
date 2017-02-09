# cli-pen [![Build Status](https://travis-ci.org/yatharthk/cli-pen.svg?branch=master)](https://travis-ci.org/yatharthk/cli-pen) [![Coverage Status](https://coveralls.io/repos/github/yatharthk/cli-pen/badge.svg?branch=master)](https://coveralls.io/github/yatharthk/cli-pen?branch=master)
> Elegant CLI helper for NodeJS terminal apps.

**Note**: APIs may change in near future releases. The APIs are expected to get stable after the first major release (v1.0.0). You can help improve the APIs / API format by raising an issue.

## Install
```
npm install --save cli-pen
```

Currently, the tools provided by **cli-pen** include:
- Pen
- ProgressBar
- Spinner

## Pen
A pen is a simple console utility to replace your `console.log` usage in the NodeJS terminal apps.

![Pen example GIF](/screenshot-pen.gif)

## Usage
```js
const { Pen } = require('cli-pen');
const pen = Pen();
pen.info('Console some information.');
pen.warn('Some warning', {
  format: ':symbol :message',
});
```

## API

### Pen([options])
`options` are optional. If not provided, default values are used.

#### options
Type: `object`

##### format
Type: `string`
Default: `:symbol :title :message\n`



##### color
Type: `object | string `
Default: `gray`

**Note:** If a string is used, all types `error` `info` `success` `warning` (for `:message`) use the same color.

You can provide an object for custom color configuration like:

```js
{
  error: 'red',
  info: 'white',
  success: 'green',
  warning: 'yellow'
}
```

##### titleColor
Type: `object | string`
Default: `error: red` `info: blue` `success: green` `warning: yellow`

**Note:** If a string is used, all types `error` `info` `success` `warning` (for `:title`) use the same color.

You can provide custom colors for titles in a similar way as for `color`.

##### title
Type: `object | string`

Default: `error: error` `info: info` `success: success` `warning: warning`

**Note:** If a string is used, all types `error` `info` `success` `warning` (for `:title`) use the same text.

##### stream
Type: `WriteableStream`
Default: `process.stderr`

Stream to write on terminal.

Options: `process.stdout`

#### Instance

- .error(message [, options])
Write an error message to console.

- .info(message [, options])
Write an info message to console.

- .success(message [, options])
Write a success message to console.

- .warning(message [, options])
Write a warning message to console.

- .log(message)
An alternative to native `console.log`. Use it in a similar fashion.

##### message
Type: `string | Array<string>`

##### options
Type: `object`

A typical options parameter example would be like:
```js
{
  format: ':symbol :message\n',
  color: 'blue',
}
```

## ProgressBar
A simple **ProgressBar** for terminal apps.

![ProgressBar example GIF](/screenshot-progressbar.gif)

## Usage
```js
const { ProgressBar } = require('cli-pen');
const progress = ProgressBar(30);
progress.tick(10);
setTimeout(() => {
  progress.tick(20);
  console.log('task completed.');
}, 1500);
```

## API
### ProgressBar(total)
`total` is the number of ticks to complete.

### Instance
#### .tick([progress])
A single call on tick increments the progress by `1`. If an optional `progress` is passed, the progress is increments by that number.

## Spinner
A simple **Spinner** for terminal apps.

![Spinner example GIF](/screenshot-spinner.gif)

## Usage
```js
const { Spinner } = require('cli-pen');
const spinner = Spinner({
  color: 'blue',
});
spinner.start();
```

## API
### Spinner([options|text])

If a string is provided, it would work as `options.text`.

#### options
Type: `object`

##### text
Type: `string`

Text to display after the spinner.

##### format
Type: `string`
Default: `:spinner :text`

##### spinner
Type: `string` `object`
Default: `line`

You can look for list of available spinners [here](https://github.com/sindresorhus/cli-spinners/blob/master/spinners.json).

##### color
Type: `string`
Default: `white`
Values: `black` `red` `green` `yellow` `blue` `magenta` `cyan` `white` `gray`

Color of the spinner.

##### stream
Type: `WriteableStream`
Default: `process.stderr`

Stream to write on terminal.

Options: `process.stdout`

### Instance

##### .start()
Starts the spinner.

##### .stop()
Stops the spinner.

##### .info(message)
Stops the spinner with an information `message`.

##### .succeed(message)
Stops the spinner with a success `message`.

##### .warn(message)
Stops the spinner with a warning `message`.

##### .fail(message)
Stops the spinner with a failure `message`.

##### .text
Change the text of the spinner

##### .color
Change the color of the spinner


## Inspiration
**CLI-PEN** is inspired by some amazing cli tools as [ora](https://github.com/sindresorhus/ora), [progress](https://github.com/visionmedia/node-progress) and few others.

CLI-PEN aims to be a fully featured cli tool for terminal apps built on NodeJS.


## License
MIT © Yatharth Khatri
