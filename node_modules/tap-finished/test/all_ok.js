var test = require('tape');
var finished = require('../');
var lines = [
    'TAP version 13',
    '# wait',
    'ok 1 (unnamed assert)',
    'ok 2 should be equal',
    '1..2',
    '# tests 2',
    '# pass  2'
];

test(function (t) {
    t.plan(6);
    var done = false;
    
    var stream = finished({ wait: 0 }, function (results) {
        t.equal(done, false);
        
        t.equal(results.pass.length, 2);
        t.equal(results.pass[0].ok, true);
        t.equal(results.pass[1].ok, true);
        t.equal(results.fail.length, 0);
        
        t.ok(results.ok);
    });
    
    var iv = setInterval(function () {
        if (lines.length === 0) {
            clearInterval(iv);
            done = true;
        }
        
        var line = lines.shift();
        stream.write(line + '\n');
    }, 25);
});
