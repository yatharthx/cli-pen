const Log = require('./log.js');

const DEFAULTS = {
  color: 'gray',
  format: ':symbol :title :message\n',
  title: {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning',
  },
  titleColor: {
    error: 'red',
    info: 'blue',
    success: 'green',
    warning: 'yellow',
  },
  stream: process.stderr,
};

function configureWith(type, options) {
  const configuration = { type };

  configuration.color = (typeof options.color === 'object')
    ? (options.color[type] || 'gray')
    : options.color;

  configuration.format = options.format;
  configuration.title = (typeof options.title === 'object')
    ? (options.title[type] || type)
    : options.title;

  configuration.titleColor = (typeof options.titleColor === 'object')
    ? (options.titleColor[type] || DEFAULTS.titleColor[type])
    : options.titleColor;

  configuration.stream = options.stream;

  return configuration;
}

function Pen(initialConfiguration = {}) {
  const options = Object.assign({}, DEFAULTS, initialConfiguration);

  const loggers = {
    ERROR: null,
    INFO: null,
    SUCCESS: null,
    WARNING: null,
  };

  function init(type) {
    const key = type.toUpperCase();

    loggers[key] = new Log(configureWith(type, options));
  }

  function render(type, text, config = {}) {
    const key = type.toUpperCase();

    if (loggers[key] === null) {
      init(type);
    }

    loggers[key].render(text, config);
  }

  function error(text, config) {
    render('error', text, config);
  }

  function info(text, config) {
    render('info', text, config);
  }

  function success(text, config) {
    render('success', text, config);
  }

  function warn(text, config) {
    render('warning', text, config);
  }

  function log(text) {
    console.log(text); //eslint-disable-line
  }

  return {
    error,
    info,
    success,
    warn,
    log,
  };
}

module.exports = function (options) { //eslint-disable-line
  return new Pen(options);
};
