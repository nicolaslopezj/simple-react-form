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
    '1..2',
    '# tests 2',
    '# pass  1',
    '# fail  1'
];

test(function (t) {
    t.plan(6);
    var done = false;
    
    var stream = finished({ wait: 0 }, function (results) {
        t.equal(done, false);
        
        t.equal(results.pass.length, 1);
        t.equal(results.pass[0].ok, true);
        
        t.equal(results.fail.length, 1);
        t.equal(results.fail[0].ok, false);
        
        t.equal(results.ok, false);
    });
    
    stream.write(lines.join('\n'));
});
