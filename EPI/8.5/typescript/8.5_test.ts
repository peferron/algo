import {List, firstOverlappingNode} from './8.5';

declare function require(name: string): any;
const assert = require('assert');

const make = (length: number) => Array.from({length}, index => ({index}));
const link = (...nodes: List[]) => nodes.forEach((n, i) => n.next = nodes[i + 1]);

{
    const [a, b, c, d, e] = make(5);
    link(a, b, c);
    link(d, e);
    assert.strictEqual(firstOverlappingNode(a, d), undefined);
}

{
    const [a, b, c, d] = make(4);
    link(a, b, c);
    link(d, b);
    assert.strictEqual(firstOverlappingNode(a, d), b);
}

{
    const [a] = make(1);
    assert.strictEqual(firstOverlappingNode(a, a), a);
}

{
    const [a, b] = make(2);
    link(a, b);
    assert.strictEqual(firstOverlappingNode(a, a), a);
}

{
    const [a, b] = make(2);
    assert.strictEqual(firstOverlappingNode(a, b), undefined);
}

{
    const [a, b] = make(2);
    link(a, b);
    assert.strictEqual(firstOverlappingNode(a, b), b);
}

{
    const [a, b, c, d, e] = make(5);
    link(a, b, c);
    link(d, e, c);
    assert.strictEqual(firstOverlappingNode(a, d), c);
}

{
    const [a, b, c, d, e, f] = make(6);
    link(a, b, c);
    link(d, e, f, a);
    assert.strictEqual(firstOverlappingNode(a, d), a);
}
