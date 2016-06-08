var type = require('type-component')
var through = require('through2')
var Parser = require('jsonparse')

var check = function(x, y) {
  if (type(x) === 'string') {
    return y === x
  }

  if (x && type(x.exec) === 'function') {
    return x.exec(y)
  }

  if (type(x) === 'boolean') {
    return x
  }

  if (type(x) === 'function') {
    return x(y)
  }

  return false
}

module.exports.parse = function(path, map) {
  var parser = new Parser()

  var stream = through.obj(function(chunk, enc, fn) {
    if (type(chunk) === 'string') {
      chunk = new Buffer(chunk)
    }

    parser.write(chunk)
    fn()
  })

  if (type(path) === 'string') path = path.split('.').map(function(e) {
    if (e === '*') {
      return true
    }

    if (e === '') {
      return {
        recurse: true
      }
    }

    return e
  })

  if (!Array.isArray(path) || !path.length) {
    path = null
  }

  parser.onValue = function() {
    if (!this.root && this.stack.length === 1) {
      stream.root = this.value
    }

    if (!path) {
      return
    }

    var i = 0 // iterates on path
    var j = 0 // iterates on stack

    while (i < path.length) {
      var key = path[i]
      var c

      j += 1
      i += 1

      if (key && !key.recurse) {
        c = (this.stack.length === j) ? this : this.stack[j]

        if (!c) {
          return
        }

        if (!check(key, c.key)) {
          return
        }
      } else {
        var next = path[i]

        if (!next) {
          return
        }

        while (true) {
          c = (this.stack.length === j) ? this : this.stack[j]

          if (!c) {
            return
          }

          if (check(next, c.key)) {
            this.stack[j].value = null
            i += 1
            break
          }

          j += 1
        }
      }
    }

    if (this.stack.length !== j) {
      return
    }

    var data = this.value[this.key]
    var actualPath = this.stack.slice(1).map(function(element) {
      return element.key
    }).concat([this.key])

    if (data !== null) {
      if ((data = map ? map(data, actualPath) : data) !== null) {
        stream.push(data)
      }
    }

    delete this.value[this.key]
    for (var k in this.stack) {
      this.stack[k].value = null
    }
  }

  parser.onError = function(err) {
    stream.emit('error', err)
  }

  parser._onToken = parser.onToken
  parser.onToken = function(token, value) {
    parser._onToken(token, value)
    if (this.stack.length === 0) {
      if (stream.root) {
        if (!path) {
          stream.push(stream.root)
        }

        stream.emit('root', stream.root)
        stream.root = null
      }
    }
  }

  return stream
}

module.exports.stringify = function(open, sep, close, indent) {
  indent = indent || 0

  if (open === false) {
    open = ''
    sep = '\n'
    close = ''
  } else if (['null', 'undefined'].indexOf(type(open)) >= 0) {
    open = '[\n'
    sep = '\n,\n'
    close = '\n]\n'
  }

  var first = true

  return through.obj(function(chunk, enc, fn) {
    var json = JSON.stringify(chunk, null, indent)

    if (!first) {
      this.push(sep + json)
    } else {
      first = false
      this.push(open + json)
    }

    fn()
  }, function(fn) {
    if (first) {
      this.push(open)
    }

    first = false
    this.push(close)
    fn()
  })
}

exports.stringifyObject = function(open, sep, close, indent) {
  indent = indent || 0

  if (open === false) {
    open = ''
    sep = '\n'
    close = ''
  } else if (['null', 'undefined'].indexOf(type(open)) >= 0) {
    open = '{\n'
    sep = '\n,\n'
    close = '\n}\n'
  }

  var first = true

  return through.obj(function(chunk, enc, fn) {
    var json = JSON.stringify(chunk[0]) + ':' + JSON.stringify(chunk[1], null, indent)

    if (!first) {
      this.push(sep + json)
    } else {
      first = false
      this.push(open + json)
    }

    fn()
  }, function(fn) {
    if (first) {
      this.push(open)
    }

    first = false
    this.push(close)
    fn()
  })
}
