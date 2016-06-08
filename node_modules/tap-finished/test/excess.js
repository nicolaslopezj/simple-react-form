var test = require('tape');
var finished = require('../');
var lines = [
    'TAP version 13',
    '# wait',
    'ok 1 first thing',
    'ok 2 second thing',
    '1..2',
    '# tests 2',
    '# pass  1',
    '# fail  1',
    'ok 3 third thing'
];

test(function (t) {
    t.plan(8);
    var done = false;
    
    var stream = finished({ wait: 250 }, function (results) {
        t.equal(done, true);
        
        t.equal(results.pass.length, 3);
        t.equal(results.pass[0].ok, true);
        t.equal(results.pass[1].ok, true);
        t.equal(results.pass[2].ok, true);
        t.equal(results.fail.length, 0);
        
        t.equal(results.errors.length, 1);
        t.equal(results.ok, false);
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
