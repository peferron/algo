'use strict';

var assert = require('assert');

var HashTable = require('./hash_table.js');

function testBasicSequence() {
    var h = new HashTable(10);

    assert(!h.has('abc'));

    h.set('abc', 5);
    assert(h.has('abc'));
    assert.strictEqual(h.get('abc'), 5);

    // Check that deleting a non-existing key doesn't crash.
    h.del('aaa');
    h.del('zzz');

    h.set('abc', 7);
    assert(h.has('abc'));
    assert.strictEqual(h.get('abc'), 7);

    h.set('def', 9);
    assert(h.has('abc'));
    assert.strictEqual(h.get('abc'), 7);
    assert(h.has('def'));
    assert.strictEqual(h.get('def'), 9);

    h.del('abc');
    assert(!h.has('abc'));
    assert(h.has('def'));
    assert.strictEqual(h.get('def'), 9);
}

function testRandomSequences() {
    for (var i = 0; i < 100; i++) {
        testRandomSequence();
    }
}

function testRandomSequence() {
    var h = new HashTable(100);
    var m = {};
    var a = [];

    var count = Math.floor(Math.random() * 1000);
    for (var i = 0; i < count; i++) {
        randomOperation(h, m, a);
    }

    validate(h, m, a);
}

function validate(h, m, a) {
    a.forEach(function(k) {
        assert(h.has(k));
        assert.strictEqual(m[k], h.get(k));
    });
}

function randomOperation(h, m, a) {
    var r = Math.random();
    if (r < 0.2) {
        delRandom(h, m, a);
    } else {
        setRandom(h, m, a);
    }
}

function setRandom(h, m, a) {
    var k = randomKey();
    var v = randomValue();
    h.set(k, v);
    if (!m.hasOwnProperty(k)) {
        a.push(k);
    }
    m[k] = v;
}

function delRandom(h, m, a) {
    if (!a.length) {
        return;
    }
    var i = Math.floor(Math.random() * a.length);
    var k = a[i];
    h.del(k);
    delete m[k];
    a.splice(i, 1);
}

function randomKey() {
    var l = Math.floor(1 + Math.random() * 10);
    return (Math.PI * Math.random()).toString(36).substr(2, l);
}

function randomValue() {
    return Math.floor(Math.random() * 1e9);
}

testBasicSequence();
testRandomSequences();
