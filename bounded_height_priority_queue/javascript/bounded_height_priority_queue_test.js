'use strict';

var assert = require('assert');

var bhpq = require('./bounded_height_priority_queue.js');

function basicTests() {
    var q = new bhpq.Queue(10);

    assert(q.empty());

    q.insert(3, 'abc');
    assert(!q.empty());
    assert.strictEqual(q.removeMax(), 'abc');
    assert(q.empty());

    q.insert(7, 'def');
    assert(!q.empty());

    q.insert(2, 'ghi');
    assert(!q.empty());

    q.insert(7, 'jkl');
    assert(!q.empty());

    var m1 = q.removeMax();
    assert(!q.empty());

    var m2 = q.removeMax();
    assert(!q.empty());

    assert(m1 === 'def' && m2 === 'jkl' || m1 === 'jkl' && m2 === 'def');

    assert.strictEqual(q.removeMax(), 'ghi');
    assert(q.empty());
}

basicTests();

console.log('All tests OK.');
