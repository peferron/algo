'use strict';

var assert = require('assert');

var Trie = require('./trie.js');

function basicTests() {
    var t = new Trie();

    assert(!t.has('abc'));
    assert.deepEqual(t.all(), []);

    t.set('abc', 5);
    assert(!t.has('ab'));
    assert(!t.has('abcd'));
    assert(t.has('abc'));
    assert.strictEqual(t.get('abc'), 5);

    // Check that deleting a non-existing key doesn't crast.
    t.del('aaa');
    t.del('zzz');

    t.set('abc', 7);
    assert(t.has('abc'));
    assert.strictEqual(t.get('abc'), 7);
    assert.deepEqual(t.all(), [{key: 'abc', value: 7}]);

    t.set('def', 9);
    assert(t.has('abc'));
    assert.strictEqual(t.get('abc'), 7);
    assert(t.has('def'));
    assert.strictEqual(t.get('def'), 9);

    t.set('abcd', 11);
    assert(t.has('abc'));
    assert.strictEqual(t.get('abc'), 7);
    assert(t.has('def'));
    assert.strictEqual(t.get('def'), 9);
    assert(t.has('abcd'));
    assert.strictEqual(t.get('abcd'), 11);
    assert.deepEqual(t.all(), [
        {key: 'abc', value: 7},
        {key: 'abcd', value: 11},
        {key: 'def', value: 9}
    ]);

    t.del('abc');
    assert(!t.has('abc'));
    assert(t.has('def'));
    assert.strictEqual(t.get('def'), 9);
    assert(t.has('abcd'));
    assert.strictEqual(t.get('abcd'), 11);
}

function randomTests() {
    for (var i = 0; i < 100; i++) {
        randomTest();
    }
}

function randomTest() {
    var t = new Trie();
    var m = {};
    var a = [];

    var count = Math.floor(Math.random() * 1000);
    for (var i = 0; i < count; i++) {
        var r = Math.random();
        if (r < 0.2) {
            delRandom(t, m, a);
            continue;
        }
        setRandom(t, m, a);
    }

    check(t, m, a);
}

function check(t, m, a) {
    a.forEach(function(k) {
        assert(t.has(k));
        assert.strictEqual(m[k], t.get(k));
    });

    var all = t.all();
    assert.strictEqual(a.length, all.length);
    a.sort().forEach(function(k, i) {
        assert.deepEqual(all[i], {key: k, value: m[k]});
    });
}

function setRandom(t, m, a) {
    var k = randomKey();
    var v = randomValue();
    t.set(k, v);
    if (!m.hasOwnProperty(k)) {
        a.push(k);
    }
    m[k] = v;
}

function delRandom(t, m, a) {
    if (!a.length) {
        return;
    }
    var i = Math.floor(Math.random() * a.length);
    var k = a[i];
    t.del(k);
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

basicTests();
randomTests();

console.log('All tests OK.');
