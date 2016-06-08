# browserify-babel-istanbul

A fork of [browserify-istanbul](https://github.com/devongovett/browserify-istanbul) that uses babel-istanbul instead of vanilla istanbul.

A [browserify](http://github.com/substack/node-browserify) transform for the [istanbul](https://github.com/gotwarlost/istanbul) code coverage tool.

## Installing

    npm install browserify-babel-istanbul
    
## Usage

There are several ways to register browserify transforms: on the command line, in your `package.json`, or using the browserify API.
You can use all of these with browserify-istanbul: see the [browserify docs](http://github.com/substack/node-browserify) for more info.

There are a few options available to browserify-istanbul when you use it from JavaScript.  They are shown in the following code example:

```javascript
var istanbul = require('browserify-istanbul');

// use without any options...
browserifyBundle.transform(istanbul);

// or with some options...
browserifyBundle.transform(istanbul({
  // ignore these glob paths (the ones shown are the defaults)
  ignore: ['**/node_modules/**', '**/bower_components/**', '**/test/**', '**/tests/**', '**/*.json'],
  
  // by default, any paths you include in the ignore option are ignored 
  // in addition to the defaults. set the defaultIgnore option to false 
  // to only ignore the paths you specify.
  defaultIgnore: true
}));
```

## License

MIT
