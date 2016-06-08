"use strict";

module.exports = make
module.exports.ctor = ctor
module.exports.obj = obj
module.exports.objCtor = objCtor

var through2 = require("through2")
var xtend = require("xtend")

function ctor(options, fn) {
  if (typeof options == "function") {
    fn = options
    options = {}
  }
  return through2.ctor(options, function (chunk, encoding, callback) {
    if (this.options.wantStrings) chunk = chunk.toString()
    var err = fn.call(this, chunk, encoding)
    if (err instanceof Error) return callback(err)
    this.push(chunk)
    return callback(null)
  })
}

function objCtor(options, fn) {
  if (typeof options === "function") {
    fn = options
    options = {}
  }
  options = xtend({objectMode: true, highWaterMark: 16}, options)
  return ctor(options, fn)
}

function make(options, fn) {
  return ctor(options, fn)()
}

function obj(options, fn) {
  if (typeof options === "function") {
    fn = options
    options = {}
  }
  options = xtend({objectMode: true, highWaterMark: 16}, options)
  return make(options, fn)
}
