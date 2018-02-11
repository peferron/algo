import {Node, reverse} from './main';

declare function require(name: string): any;
const assert = require('assert');

interface LabelledNode extends Node {
    label: number;
}

function make(length: number): Node[] {
    const nodes: LabelledNode[] = Array.from({length}, (_, i) => ({label: i + 1}));
    nodes.forEach((n, i) => n.next = nodes[i + 1]);
    return nodes;
}

{
    const [n1, n2, n3] = make(3);
    const reversed = reverse(n1, 1, 2);
    assert.strictEqual(reversed, n2);
    assert.strictEqual(reversed.next, n1);
    assert.strictEqual(reversed.next!.next, n3);
}

{
    const [n1, n2, n3] = make(3);
    const reversed = reverse(n1, 2, 3);
    assert.strictEqual(reversed, n1);
    assert.strictEqual(reversed.next, n3);
    assert.strictEqual(reversed.next!.next, n2);
}

{
    const [n1, n2, n3] = make(3);
    const reversed = reverse(n1, 1, 3);
    assert.strictEqual(reversed, n3);
    assert.strictEqual(reversed.next, n2);
    assert.strictEqual(reversed.next!.next, n1);
}

{
    const [n1, n2, n3] = make(3);
    const reversed = reverse(n1, 2, 2);
    assert.strictEqual(reversed, n1);
    assert.strictEqual(reversed.next, n2);
    assert.strictEqual(reversed.next!.next, n3);
}

{
    const [n1, n2, n3, n4] = make(4);
    const reversed = reverse(n1, 2, 3);
    assert.strictEqual(reversed, n1);
    assert.strictEqual(reversed.next, n3);
    assert.strictEqual(reversed.next!.next, n2);
    assert.strictEqual(reversed.next!.next!.next, n4);
}

{
    const [n1, n2, n3, n4, n5] = make(5);
    const reversed = reverse(n1, 2, 4);
    assert.strictEqual(reversed, n1);
    assert.strictEqual(reversed.next, n4);
    assert.strictEqual(reversed.next!.next, n3);
    assert.strictEqual(reversed.next!.next!.next, n2);
    assert.strictEqual(reversed.next!.next!.next!.next, n5);
}
