import assert from 'assert';
import Queue from './bounded_height_priority_queue';

function testBasicSequence() {
    const q = new Queue(10);

    assert.ok(q.empty());

    q.insert(7, 'seven');
    assert.ok(!q.empty());
    assert.strictEqual(q.deleteMin(), 'seven');
    assert.ok(q.empty());

    q.insert(3, 'three');
    assert.ok(!q.empty());

    q.insert(8, 'eight');
    assert.ok(!q.empty());

    q.insert(3, 'three again');
    assert.ok(!q.empty());

    const m1 = q.deleteMin();
    assert.ok(!q.empty());

    const m2 = q.deleteMin();
    assert.ok(!q.empty());

    assert.ok(m1 === 'three' && m2 === 'three again' || m1 === 'three again' && m2 === 'three');

    assert.strictEqual(q.deleteMin(), 'eight');
    assert.ok(q.empty());

    assert.strictEqual(q.deleteMin(), undefined);
}

testBasicSequence();
