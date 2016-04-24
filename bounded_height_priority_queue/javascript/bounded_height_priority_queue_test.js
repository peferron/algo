'use strict';

var assert = require('assert');

var Queue = require('./bounded_height_priority_queue.js');

function testBasicSequence() {
    var q = new Queue(10);

    assert(q.empty());

    q.insert(7, 'seven');
    assert(!q.empty());
    assert.strictEqual(q.deleteMin(), 'seven');
    assert(q.empty());

    q.insert(3, 'three');
    assert(!q.empty());

    q.insert(8, 'eight');
    assert(!q.empty());

    q.insert(3, 'three again');
    assert(!q.empty());

    var m1 = q.deleteMin();
    assert(!q.empty());

    var m2 = q.deleteMin();
    assert(!q.empty());

    assert(m1 === 'three' && m2 === 'three again' || m1 === 'three again' && m2 === 'three');

    assert.strictEqual(q.deleteMin(), 'eight');
    assert(q.empty());

    assert(typeof q.deleteMin() === 'undefined');
}

testBasicSequence();
