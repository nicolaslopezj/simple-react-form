# run-browser

The simplest way to run testling type tests in the browser

[![Dependency Status](https://img.shields.io/gemnasium/ForbesLindesay/run-browser.svg)](https://gemnasium.com/ForbesLindesay/run-browser)
[![NPM version](https://img.shields.io/npm/v/run-browser.svg)](http://badge.fury.io/js/run-browser)

## Installation

    npm install run-browser -g


## Usage

    run-browser <file> <options>

    Options:
      -p --port <number> The port number to run the server on (default: 3000)
      -b --phantom       Use the phantom headless browser to run tests and then exit with the correct status code (if tests output TAP)
      -r --report        Generate coverage Istanbul report. Repeat for each type of coverage report desired. (default: text only)
      -t --timeout       Global timeout in milliseconds for tests to finish. (default: Infinity)

    Example:
      run-browser test-file.js --port 3030 --report text --report html --report=cobertura

## API Usage

Basic usage:

```js
var runBrowser = require('run-browser');

var server = runBrowser('tests/test.js');
server.listen(3000);
```

Advanced Usage:

```js
var runBrowser = require('run-browser');

var handler = runBrowser.createHandler('tests/test.js');
var server = http.createServer(function (req, res) {
  if (runBrowser.handles(req)) {
    return handler(req, res);
  }
  // any other server logic here
});
server.listen(3000);
```

For advanced phantomjs usage, just read the source in `./bin/cli.js`

## License

  MIT
