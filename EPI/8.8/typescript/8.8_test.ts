import {List, removeLast} from './8.8';

declare function require(name: string): any;
const assert = require('assert');

const make = (length: number) => {
    const nodes = Array.from({length}, (_, index) => ({index} as List));
    nodes.forEach((n, i) => n.next = nodes[i + 1]);
    return nodes;
};

const toArray = (list: List | undefined): List[] => list ? [list, ...toArray(list.next)] : [];

{
    const [a, b, ] = make(3);
    assert.deepStrictEqual(toArray(removeLast(a, 0)), [a, b]);
}

{
    const [a, , c] = make(3);
    assert.deepStrictEqual(toArray(removeLast(a, 1)), [a, c]);
}

{
    const [a, b, c] = make(3);
    assert.deepStrictEqual(toArray(removeLast(a, 2)), [b, c]);
}

{
    const [a] = make(1);
    assert.deepStrictEqual(toArray(removeLast(a, 0)), []);
}
