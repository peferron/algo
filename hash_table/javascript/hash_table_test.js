'use strict';

var assert = require('assert');

var hash_table = require('./hash_table.js');

function basicTests() {
    var h = new hash_table.HashTable(10);

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

function randomTests() {
    for (var i = 0; i < 100; i++) {
        randomTest();
    }
}

function randomTest() {
    var h = new hash_table.HashTable(1000);
    var m = {};
    var a = [];

    var count = Math.floor(Math.random() * 10000);
    for (var i = 0; i < count; i++) {
        var r = Math.random();
        if (r < 0.2) {
            delRandom(h, m, a);
            continue;
        }
        setRandom(h, m, a);
    }

    check(h, m, a);
}

function check(h, m, a) {
    a.forEach(function(k) {
        assert(h.has(k));
        assert.strictEqual(m[k], h.get(k));
    });
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
    return (Math.PI * Math.random()).toString(36).substr(2, 3);
}

function randomValue() {
    return Math.floor(Math.random() * 1e9);
}

basicTests();
randomTests();

console.log('All tests OK.');
