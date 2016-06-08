# inject-lr-script

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Inject the [LiveReload script snippet](http://feedback.livereload.com/knowledgebase/articles/86180-how-do-i-add-the-script-tag-manually) into a HTML response.

This detects `.htm` and `.html` and ensures they have `text/html` accept headers, if not yet set.

Example:

```js
var liveReload = require('inject-lr-script')
var stacked = require('stacked')
var http = require('http')
var serveStatic = require('serve-static')

var app = stacked()
app.use(liveReload())
app.use(serveStatic('app/'))

var server = http.createServer(app)
```

*Note:* This expects a `<body>` tag to be present in the HTML.

## Usage

[![NPM](https://nodei.co/npm/inject-lr-script.png)](https://www.npmjs.com/package/inject-lr-script)

#### `middleware = liveReload([opt])`

Returns a function `middleware(req, res, next)` which injects a LiveReload `<script>` tag into the body of an HTML script.

Options:

- `port` the live reload server port, default 35729
- `host` the host, default `localhost`

You can also change the options at runtime:

```js
var liveReload = require('inject-lr-script')

var liveInjector = liveReload()
handler.use(function (req, res, next) {
  if (liveReload) {
    liveInjector.host = myHost
    liveInjector.port = myPort
    liveInjector(req, res, next)
  } else {
    next()
  }
})
```

## See Also

- [inject-lr-script-stream](https://github.com/yoshuawuyts/inject-lr-script-stream) - a simpler, streaming approach
- [connect-livereload](https://github.com/intesso/connect-livereload) - a similar approach

## Changelog

- 2.x - major refactor: simplified and uses a connect-style middleware to improve performance/stability
- 1.x - uses Beefy to try and auto-detect mime type based on response events

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/inject-lr-script/blob/master/LICENSE.md) for details.
