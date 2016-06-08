#! /usr/bin/env node

var jsonstream = require('..')

process.stdin
  .pipe(jsonstream.parse(process.argv[2]))
  .pipe(jsonstream.stringify('[', ',\n', ']\n', 2))
  .pipe(process.stdout)
