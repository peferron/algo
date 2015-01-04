'use strict';

var assert = require('assert');

var Tree = require('./red-black_tree.js');

function testBasicSequence() {
    var t = new Tree();

    assert(!t.has(2));

    t.set(2, 'two');
    assert(t.has(2));
    assert.strictEqual(t.get(2), 'two');

    // Check that deleting a non-existing key doesn't crash.
    t.del(1);
    t.del(10);

    t.set(2, 'two again');
    assert(t.has(2));
    assert.strictEqual(t.get(2), 'two again');

    t.set(5, 'five');
    assert(t.has(2));
    assert.strictEqual(t.get(2), 'two again');
    assert(t.has(5));
    assert.strictEqual(t.get(5), 'five');

    t.del(2);
    assert(!t.has(2));
    assert(t.has(5));
    assert.strictEqual(t.get(5), 'five');

    t.set(7, 'seven');
    t.set(2, 'two again again');
    t.set(9, 'nine');

    assert.deepEqual(t.all(), [
        {key: 2, value: 'two again again'},
        {key: 5, value: 'five'},
        {key: 7, value: 'seven'},
        {key: 9, value: 'nine'}
    ]);
}

function testRandomSequences() {
    for (var i = 0; i < 100; i++) {
        testRandomSequence();
    }
}

function testRandomSequence() {
    var t = new Tree();
    var m = {};
    var a = [];

    var count = Math.floor(Math.random() * 10000);
    for (var i = 0; i < count; i++) {
        randomOperation(t, m, a);
    }

    validate(t, m, a);
}

function validate(t, m, a) {
    assert(isRedBlackTree(t));

    a.forEach(function(k) {
        assert(t.has(k));
        assert.strictEqual(m[k], t.get(k));
    });

    var all = t.all();
    assert.strictEqual(a.length, all.length);
    a.sort(compareNumbers).forEach(function(k, i) {
        assert.deepEqual(all[i], {key: k, value: m[k]});
    });
}

function isRedBlackTree(t) {
    if (t && t.color === 'red') {
        return false;
    }
    return blackHeight(t.root) >= 0;
}

function red(n) {
    return n && n.color === 'red';
}

function blackHeight(n) {
    if (!n) {
        return 0;
    }
    if (red(n) && (red(n.left) || red(n.right))) {
        return -1;
    }
    var l = blackHeight(n.left);
    var r = blackHeight(n.right);
    if (l < 0 || r < 0 || l !== r) {
        return -1;
    }
    if (red(n)) {
        return l;
    }
    return l + 1;
}

function randomOperation(t, m, a) {
    var r = Math.random();
    if (r < 0.2) {
        delRandom(t, m, a);
    } else {
        setRandom(t, m, a);
    }
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
    return Math.floor(Math.random() * 1000);
}

function randomValue() {
    return (Math.PI * Math.random()).toString(36).substr(2, 6);
}

function compareNumbers(a, b) {
    return a - b;
}

testBasicSequence();
testRandomSequences();

console.log('All tests OK.');
