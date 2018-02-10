import {Vertex, cloneIterative, cloneRecursive} from './main';

declare function require(name: string): any;
const assert = require('assert');

for (const fn of [cloneRecursive, cloneIterative]) {
    const original0: Vertex = {label: 0, neighbors: []};
    const original1: Vertex = {label: 1, neighbors: []};
    const original2: Vertex = {label: 2, neighbors: []};
    const original3: Vertex = {label: 3, neighbors: []};
    const original4: Vertex = {label: 4, neighbors: []};

    original0.neighbors = [original1];
    original1.neighbors = [original2];
    original2.neighbors = [original0, original3];
    original3.neighbors = [original4, original1];

    const clone0 = fn(original0);
    assert.strictEqual(clone0.label, 0);
    assert.strictEqual(clone0.neighbors.length, 1);

    const clone1 = clone0.neighbors[0];
    assert.strictEqual(clone1.label, 1);
    assert.strictEqual(clone1.neighbors.length, 1);

    const clone2 = clone1.neighbors[0];
    assert.strictEqual(clone2.label, 2);
    assert.strictEqual(clone2.neighbors.length, 2);
    assert.strictEqual(clone2.neighbors[0], clone0);

    const clone3 = clone2.neighbors[1];
    assert.strictEqual(clone3.label, 3);
    assert.strictEqual(clone3.neighbors.length, 2);
    assert.strictEqual(clone3.neighbors[1], clone1);

    const clone4 = clone3.neighbors[0];
    assert.strictEqual(clone4.label, 4);
    assert.strictEqual(clone4.neighbors.length, 0);
}
