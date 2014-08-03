'use strict';

var assert = require('assert');

var rb_tree = require('./red-black_tree.js');

function basicTests() {
    var t = new rb_tree.Tree();

    assert(!t.has('abc'));

    t.set('abc', 5);
    assert(t.has('abc'));
    assert.strictEqual(t.get('abc'), 5);

    t.set('abc', 7);
    assert(t.has('abc'));
    assert.strictEqual(t.get('abc'), 7);

    t.set('def', 9);
    assert(t.has('abc'));
    assert.strictEqual(t.get('abc'), 7);
    assert(t.has('def'));
    assert.strictEqual(t.get('def'), 9);

    t.del('abc');
    assert(!t.has('abc'));
    assert(t.has('def'));
    assert.strictEqual(t.get('def'), 9);

    t.set('ghi', 1);
    t.set('abc', 10);
    t.set('xyz', 15);

    assert.deepEqual(t.all(), [
        {key: 'abc', value: 10},
        {key: 'def', value: 9},
        {key: 'ghi', value: 1},
        {key: 'xyz', value: 15}
    ]);
}

function randomTests() {
    for (var i = 0; i < 100; i++) {
        randomTest();
    }
}

function randomTest() {
    var t = new rb_tree.Tree();
    var m = {};
    var a = [];

    for (var i = 0; i < 1000; i++) {
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
    return (Math.PI * Math.random()).toString(36).substr(2, 3);
}

function randomValue() {
    return Math.floor(Math.random() * 1e9);
}

basicTests();
randomTests();

console.log('All tests OK.');
