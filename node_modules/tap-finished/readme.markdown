# tap-finished

detect when [tap output](http://testanything.org) is finished

[![build status](https://secure.travis-ci.org/substack/tap-finished.png)](http://travis-ci.org/substack/tap-finished)

[![browser support](http://ci.testling.com/substack/tap-finished.png)](http://ci.testling.com/substack/tap-finished)

Normally with [tap-parser](https://github.com/substack/tap-parser) the
`'results'` event fires only after the stream is closed. This module lets you
detect whether a stream seems closed without waiting for the `'end'` event.

# example

Given this tap output in `tap_output.txt`:

```
TAP version 13
# wait
ok 1 (unnamed assert)
not ok 2 should be equal
  ---
    operator: equal
    expected: 5
    actual:   4
  ...

1..2
# tests 2
# pass  1
# fail  1
```

and given this script that pipes stdin into the finished stream:

``` js
var finished = require('tap-finished');
var stream = finished(function (results) {
    console.dir(results);
});
process.stdin.pipe(stream);
```

We'll use `cat` to create a stream that contains the tap output but doesn't end
and then pipe that to the script:

```
$ cat tap_output.txt /dev/stdin | node stream.js 
{ ok: false,
  asserts: 
   [ { ok: true, number: 1, name: '(unnamed assert)' },
     { ok: false, number: 2, name: 'should be equal' } ],
  pass: [ { ok: true, number: 1, name: '(unnamed assert)' } ],
  fail: [ { ok: false, number: 2, name: 'should be equal' } ],
  errors: [],
  plan: { start: 1, end: 2 } }
^C
```

Even though the `'end'` message never came, we still got the parsed results.
Yay!

# methods

``` js
var finished = require('tap-finished')
```

## var ws = finished(opts={}, cb)

Return a writable stream `ws` that consumes tap input. 
`cb(results)` fires with the `results` from
[tap-parser](https://github.com/substack/tap-parser)
when the stream seems finished or when the `'end'` event occurs.

`opts.wait` controls how long to wait in milliseconds for more input before
firing the `cb` if the `'end'` event doesn't fire.

# install

With [npm](http://npmjs.org) do:

```
npm install tap-finished
```

You can use this module in the browser with [browserify](http://browserify.org).

# license

MIT
