var finished = require('../');
var lines = [
    'TAP version 13',
    '# wait',
    'ok 1 (unnamed assert)',
    'not ok 2 should be equal',
    '  ---',
    '    operator: equal',
    '    expected: 5',
    '    actual:   4',
    '  ...',
    '',
    '1..2',
    '# tests 2',
    '# pass  1',
    '# fail  1'
];

var stream = finished(function (results) {
    console.dir(results);
});

var iv = setInterval(function () {
    if (lines.length === 0) clearInterval(iv);
    
    var line = lines.shift();
    stream.write(line + '\n');
}, 25);
