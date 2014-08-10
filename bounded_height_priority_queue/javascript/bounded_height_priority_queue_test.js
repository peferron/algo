'use strict';

var assert = require('assert');

var bhpq = require('./bounded_height_priority_queue.js');

function basicTests() {
    var q = new bhpq.Queue(10);

    assert(q.empty());

    q.insert(7, 'abc');
    assert(!q.empty());
    assert.strictEqual(q.deleteMin(), 'abc');
    assert(q.empty());

    q.insert(3, 'def');
    assert(!q.empty());

    q.insert(8, 'ghi');
    assert(!q.empty());

    q.insert(3, 'jkl');
    assert(!q.empty());

    var m1 = q.deleteMin();
    assert(!q.empty());

    var m2 = q.deleteMin();
    assert(!q.empty());

    assert(m1 === 'def' && m2 === 'jkl' || m1 === 'jkl' && m2 === 'def');

    assert.strictEqual(q.deleteMin(), 'ghi');
    assert(q.empty());
}

basicTests();

console.log('All tests OK.');
