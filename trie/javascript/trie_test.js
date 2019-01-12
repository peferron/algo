import assert from 'assert';
import Trie from './trie';

function testBasicSequence() {
    const t = new Trie();

    assert.ok(!t.has('abc'));
    assert.deepStrictEqual(t.all(), []);

    t.set('abc', 5);
    assert.ok(!t.has('ab'));
    assert.ok(!t.has('abcd'));
    assert.ok(t.has('abc'));
    assert.strictEqual(t.get('abc'), 5);

    // Check that deleting a non-existing key doesn't crast.
    t.del('aaa');
    t.del('zzz');

    t.set('abc', 7);
    assert.ok(t.has('abc'));
    assert.strictEqual(t.get('abc'), 7);
    assert.deepStrictEqual(t.all(), [{key: 'abc', value: 7}]);

    t.set('def', 9);
    assert.ok(t.has('abc'));
    assert.strictEqual(t.get('abc'), 7);
    assert.ok(t.has('def'));
    assert.strictEqual(t.get('def'), 9);

    t.set('abcd', 11);
    assert.ok(t.has('abc'));
    assert.strictEqual(t.get('abc'), 7);
    assert.ok(t.has('def'));
    assert.strictEqual(t.get('def'), 9);
    assert.ok(t.has('abcd'));
    assert.strictEqual(t.get('abcd'), 11);
    assert.deepStrictEqual(t.all(), [
        {key: 'abc', value: 7},
        {key: 'abcd', value: 11},
        {key: 'def', value: 9},
    ]);

    t.del('abc');
    assert.ok(!t.has('abc'));
    assert.ok(t.has('def'));
    assert.strictEqual(t.get('def'), 9);
    assert.ok(t.has('abcd'));
    assert.strictEqual(t.get('abcd'), 11);
}

function testRandomSequences() {
    for (let i = 0; i < 100; i += 1) {
        testRandomSequence();
    }
}

function testRandomSequence() {
    const t = new Trie();
    const m = new Map();
    const a = [];

    const count = Math.floor(Math.random() * 1000);
    for (let i = 0; i < count; i += 1) {
        randomOperation(t, m, a);
    }

    validate(t, m, a);
}

function validate(t, m, a) {
    for (const k of a) {
        assert.ok(t.has(k));
        assert.strictEqual(m.get(k), t.get(k));
    }

    const all = t.all();
    assert.strictEqual(a.length, all.length);
    a.sort();

    for (const [i, k] of a.entries()) {
        assert.deepStrictEqual(all[i], {key: k, value: m.get(k)});
    }
}

function randomOperation(t, m, a) {
    const r = Math.random();
    if (r < 0.2) {
        delRandom(t, m, a);
    } else {
        setRandom(t, m, a);
    }
}

function setRandom(t, m, a) {
    const k = randomKey();
    const v = randomValue();
    t.set(k, v);
    if (!m.has(k)) {
        a.push(k);
    }
    m.set(k, v);
}

function delRandom(t, m, a) {
    if (!a.length) {
        return;
    }
    const i = Math.floor(Math.random() * a.length);
    const k = a[i];
    t.del(k);
    m.delete(k);
    a.splice(i, 1);
}

function randomKey() {
    // This random string generator is not uniform at all, but it doesn't matter for this test.
    const maxLength = Math.floor(1 + Math.random() * 10);
    return (Math.PI + Math.random()).toString(36).substr(2, maxLength);
}

function randomValue() {
    return Math.floor(Math.random() * 1e9);
}

testBasicSequence();
testRandomSequences();
