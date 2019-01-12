import assert from 'assert';
import HashTable from './hash_table';

function testBasicSequence() {
    const h = new HashTable(10);

    assert.ok(!h.has('abc'));

    h.set('abc', 5);
    assert.ok(h.has('abc'));
    assert.strictEqual(h.get('abc'), 5);

    // Check that deleting a non-existing key doesn't crash.
    h.del('aaa');
    h.del('zzz');

    h.set('abc', 7);
    assert.ok(h.has('abc'));
    assert.strictEqual(h.get('abc'), 7);

    h.set('def', 9);
    assert.ok(h.has('abc'));
    assert.strictEqual(h.get('abc'), 7);
    assert.ok(h.has('def'));
    assert.strictEqual(h.get('def'), 9);

    h.del('abc');
    assert.ok(!h.has('abc'));
    assert.ok(h.has('def'));
    assert.strictEqual(h.get('def'), 9);
}

function testRandomSequences() {
    for (let i = 0; i < 100; i += 1) {
        testRandomSequence();
    }
}

function testRandomSequence() {
    const h = new HashTable(100);
    const m = new Map();
    const a = [];
    const count = Math.floor(Math.random() * 1000);

    for (let i = 0; i < count; i += 1) {
        randomOperation(h, m, a);
    }

    validate(h, m, a);
}

function validate(h, m, a) {
    for (const k of a) {
        assert.ok(h.has(k));
        assert.strictEqual(m.get(k), h.get(k));
    }
}

function randomOperation(h, m, a) {
    const r = Math.random();
    if (r < 0.2) {
        delRandom(h, m, a);
    } else {
        setRandom(h, m, a);
    }
}

function setRandom(h, m, a) {
    const k = randomKey();
    const v = randomValue();
    h.set(k, v);
    if (!m.has(k)) {
        a.push(k);
    }
    m.set(k, v);
}

function delRandom(h, m, a) {
    if (!a.length) {
        return;
    }
    const i = Math.floor(Math.random() * a.length);
    const k = a[i];
    h.del(k);
    m.delete(k);
    a.splice(i, 1);
}

function randomKey() {
    // This random string generator is not uniform at all, but it doesn't matter for this test.
    const length = Math.floor(1 + Math.random() * 10);
    return (Math.PI + Math.random()).toString(36).substr(2, length);
}

function randomValue() {
    return Math.floor(Math.random() * 1e9);
}

testBasicSequence();
testRandomSequences();
