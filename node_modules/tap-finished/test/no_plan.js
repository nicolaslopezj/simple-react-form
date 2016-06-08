var test = require('tape');
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
    '# tests 2',
    '# pass  1',
    '# fail  1'
];

test(function (t) {
    t.plan(1);
    
    var stream = finished({ wait: 0 }, function (results) {
        t.fail('should not have finished');
    });
    
    var iv = setInterval(function () {
        if (lines.length === 0) {
            clearInterval(iv);
            setTimeout(function () { t.pass() }, 50);
        }
        
        var line = lines.shift();
        stream.write(line + '\n');
    }, 25);
});
