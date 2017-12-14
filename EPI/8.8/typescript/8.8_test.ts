import {List, removeLast} from './8.8';

declare function require(name: string): any;
const assert = require('assert');

const make = (length: number) => Array.from({length}, (_, index) => ({index} as List));
const link = (...nodes: List[]) => nodes.forEach((n, i) => n.next = nodes[i + 1]);

{
    const [a, b, ] = link(make(3));
    const head = removeLast(a, 0);
    assert.deepStrictEqual([head, head!.next, head!.next!.next], [a, b, undefined]);
}

{
    const [a, , c] = link(make(3));
    const head = removeLast(a, 1);
    assert.deepStrictEqual([head, head!.next, head!.next!.next], [a, c, undefined]);
}

{
    const [a, b, c] = link(make(3));
    const head = removeLast(a, 2);
    assert.deepStrictEqual([head, head!.next, head!.next!.next], [b, c, c]);
}

{
    const [a] = link(make(1));
    const head = removeLast(a, 0);
    assert.strictEqual(head, undefined);
}
