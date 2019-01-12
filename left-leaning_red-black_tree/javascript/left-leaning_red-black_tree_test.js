import assert from 'assert';
import Tree, {RED, BLACK} from './left-leaning_red-black_tree';

function testBasicSequence() {
    const t = new Tree();

    assert.ok(!t.has(2));

    t.set(2, 'two');
    assert.ok(t.has(2));
    assert.strictEqual(t.get(2), 'two');

    // Check that deleting a non-existing key doesn't crash.
    t.del(1);
    t.del(10);

    t.set(2, 'two again');
    assert.ok(t.has(2));
    assert.strictEqual(t.get(2), 'two again');

    t.set(5, 'five');
    assert.ok(t.has(2));
    assert.strictEqual(t.get(2), 'two again');
    assert.ok(t.has(5));
    assert.strictEqual(t.get(5), 'five');

    t.del(2);
    assert.ok(!t.has(2));
    assert.ok(t.has(5));
    assert.strictEqual(t.get(5), 'five');

    t.set(7, 'seven');
    t.set(2, 'two again again');
    t.set(9, 'nine');

    assert.deepStrictEqual(t.all(), [
        {key: 2, value: 'two again again'},
        {key: 5, value: 'five'},
        {key: 7, value: 'seven'},
        {key: 9, value: 'nine'},
    ]);
}

function testRandomSequences() {
    for (let i = 0; i < 100; i += 1) {
        testRandomSequence();
    }
}

function testRandomSequence() {
    const t = new Tree();
    const m = new Map();
    const a = [];
    const count = Math.floor(Math.random() * 1000);

    for (let i = 0; i < count; i += 1) {
        randomOperation(t, m, a);
    }

    validate(t, m, a);
}

function validate(t, m, a) {
    assert.ok(isRedBlackTree(t));

    for (const k of a) {
        assert.ok(t.has(k));
        assert.strictEqual(m.get(k), t.get(k));
    }

    const all = t.all();
    assert.strictEqual(a.length, all.length);
    a.sort((x, y) => x - y);

    for (const [i, k] of a.entries()) {
        assert.deepStrictEqual(all[i], {key: k, value: m.get(k)});
    }
}

function isRedBlackTree(t) {
    return !t.root || t.root.color === BLACK && blackHeight(t.root) >= 0;
}

function red(n) {
    return n && n.color === RED;
}

function blackHeight(n) {
    if (!n) {
        return 0;
    }
    if (red(n) && (red(n.left) || red(n.right))) {
        return -1;
    }
    const l = blackHeight(n.left);
    const r = blackHeight(n.right);
    if (l < 0 || r < 0 || l !== r) {
        return -1;
    }
    if (red(n)) {
        return l;
    }
    return l + 1;
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
    return Math.floor(Math.random() * 1000);
}

function randomValue() {
    return Math.floor(Math.random() * 1e9);
}

testBasicSequence();
testRandomSequences();
