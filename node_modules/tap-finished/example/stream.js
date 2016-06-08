var finished = require('../');
var stream = finished(function (results) {
    console.dir(results);
});
process.stdin.pipe(stream, { end: false });
