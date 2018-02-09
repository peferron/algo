import {List, merge} from './main';

declare function require(name: string): any;
const assert = require('assert');

const make = (length: number) => {
    const nodes = Array.from({length}, (_, index) => ({index} as List));
    nodes.forEach((n, i) => n.next = nodes[i + 1]);
    return nodes;
};

const toArray = (list: List | undefined): List[] => list ? [list, ...toArray(list.next)] : [];

{
    const [a] = make(1);
    merge(a);
    assert.deepStrictEqual(toArray(a), [a]);
}

{
    const [a, b] = make(2);
    merge(a);
    assert.deepStrictEqual(toArray(a), [a, b]);
}

{
    const [a, b, c] = make(3);
    merge(a);
    assert.deepStrictEqual(toArray(a), [a, c, b]);
}

{
    const [a, b, c, d] = make(4);
    merge(a);
    assert.deepStrictEqual(toArray(a), [a, c, b, d]);
}

{
    const [a, b, c, d, e] = make(5);
    merge(a);
    assert.deepStrictEqual(toArray(a), [a, c, e, b, d]);
}

