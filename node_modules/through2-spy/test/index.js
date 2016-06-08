"use strict";

var test = require("tape").test

var spy = require("../")
var spigot = require("stream-spigot")
var concat = require("terminus").concat

test("ctor", function (t) {
  t.plan(2)

  var count = 0
  var Spy = spy.ctor(function () {
    count++
  })

  var input = [
    {foo: "bar"},
    {foo: "baz"},
    {foo: "bif"},
    {foo: "blah"},
    {foo: "buzz"},
  ]

  // Input gets consumed, so make a copy for comparison.
  var copy = input.slice(0)

  function combine(records) {
    t.equals(count, 5, "Spied the right number of chunks")
    t.deepEquals(copy, records, "Content unchanged")
  }

  spigot({objectMode: true}, input)
    .pipe(new Spy({objectMode: true}))
    .pipe(concat({objectMode: true}, combine))
})

test("objCtor", function (t) {
  t.plan(2)

  var count = 0
  var Spy = spy.objCtor(function () {
    count++
  })

  var input = [
    {foo: "bar"},
    {foo: "baz"},
    {foo: "bif"},
    {foo: "blah"},
    {foo: "buzz"},
  ]

  // Input gets consumed, so make a copy for comparison.
  var copy = input.slice(0)

  function combine(records) {
    t.equals(count, 5, "Spied the right number of chunks")
    t.deepEquals(copy, records, "Content unchanged")
  }

  spigot({objectMode: true}, input)
    .pipe(new Spy())
    .pipe(concat({objectMode: true}, combine))
})

test("ctor options", function (t) {
  t.plan(2)

  var count = 0
  var Spy = spy.ctor({objectMode: true}, function () {
    count++
  })

  var input = [
    {foo: "bar"},
    {foo: "baz"},
    {foo: "bif"},
    {foo: "blah"},
    {foo: "buzz"},
  ]

  // Input gets consumed, so make a copy for comparison.
  var copy = input.slice(0)

  function combine(records) {
    t.equals(count, 5, "Spied the right number of chunks")
    t.deepEquals(copy, records, "Content unchanged")
  }

  spigot({objectMode: true}, input)
    .pipe(new Spy())
    .pipe(concat({objectMode: true}, combine))
})

test("ctor buffer wantStrings index", function (t) {
  t.plan(2)

  var seen = false
  var Spy = spy.ctor({wantStrings: true}, function (chunk, index) {
    if (chunk == "e") seen = true
  })

  function combine(result) {
    t.ok(seen, "Saw an e")
    t.equals(result.toString(), "abcdef", "result is correct")
  }

  spigot([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ]).pipe(new Spy())
    .pipe(concat(combine))
})

test("simple", function (t) {
  t.plan(2)

  var count = 0
  var s = spy({objectMode: true}, function () {
    count++
  })

  var input = [
    {foo: "bar"},
    {foo: "baz"},
    {foo: "bif"},
    {foo: "blah"},
    {foo: "buzz"},
  ]

  // Input gets consumed, so make a copy for comparison.
  var copy = input.slice(0)

  function combine(records) {
    t.equals(count, 5, "Spied the right number of chunks")
    t.deepEquals(copy, records, "Content unchanged")
  }

  spigot({objectMode: true}, input)
    .pipe(s)
    .pipe(concat({objectMode: true}, combine))
})

test("return non-error", function (t) {
  t.plan(2)

  // Non-error return is ignored.
  var count = 0
  var s = spy({objectMode: true}, function () {
    if (++count > 2) return "WUT"
  })

  var input = [
    {foo: "bar"},
    {foo: "baz"},
    {foo: "bif"},
    {foo: "blah"},
    {foo: "buzz"},
  ]

  // Input gets consumed, so make a copy for comparison.
  var copy = input.slice(0)

  function combine(records) {
    t.equals(count, 5, "Spied the right number of chunks")
    t.deepEquals(copy, records, "Content unchanged")
  }

  spigot({objectMode: true}, input)
    .pipe(s)
    .pipe(concat({objectMode: true}, combine))
})

test("return non-error obj", function (t) {
  t.plan(2)

  // Non-error return is ignored.
  var count = 0
  var s = spy.obj(function () {
    if (++count > 2) return "WUT"
  })

  var input = [
    {foo: "bar"},
    {foo: "baz"},
    {foo: "bif"},
    {foo: "blah"},
    {foo: "buzz"},
  ]

  // Input gets consumed, so make a copy for comparison.
  var copy = input.slice(0)

  function combine(records) {
    t.equals(count, 5, "Spied the right number of chunks")
    t.deepEquals(copy, records, "Content unchanged")
  }

  spigot({objectMode: true}, input)
    .pipe(s)
    .pipe(concat({objectMode: true}, combine))
})

test("abort", function (t) {
  t.plan(2)

  var count = 0
  var s = spy(function () {
    if (++count > 2) return new Error("Aborting")
  })

  s.on("error", function (e) {
    t.ok(e, "Caught the error")
    t.equals(count, 3, "Saw 3 records first")
  })

  spigot([
    "a",
    "b",
    "cdefghijk",
    "lmnopqrst",
    "u",
    "vwxyz",
  ]).pipe(s)
})

test("size abort options", function (t) {
  t.plan(1)

  var s = spy({maxBytes: 10, bytes: 0}, function (chunk) {
    this.options.bytes += chunk.length
    if (this.options.bytes >= this.options.maxBytes)
      return new Error("Aborting -- max size")
  })

  s.on("error", function (e) {
    t.ok(e, "Caught the error")
  })

  function combine(data) {
    t.fail("Stream was aborted, should not see this.")
  }

  spigot([
    "a",
    "b",
    "cdefghijk",
    "lmnopqrst",
    "u",
    "vwxyz",
  ]).pipe(s)
    .pipe(concat(combine))
})

test("emit in spy", function (t) {
  t.plan(7)

  var s = spy({maxBytes: 10, bytes: 0}, function (chunk) {
    this.emit("progress", "hi")
  })

  s.on("progress", function (msg) {
    t.ok(msg, "Saw progress")
  })

  function combine(data) {
    t.equals(data.toString(), "abcdefghijklmnopqrstuvwxyz", "stream unmodified")
  }

  spigot([
    "a",
    "b",
    "cdefghijk",
    "lmnopqrst",
    "u",
    "vwxyz",
  ]).pipe(s)
    .pipe(concat(combine))
})
