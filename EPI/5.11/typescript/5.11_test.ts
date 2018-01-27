import {Rect, intersection} from './5.11';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {a: Rect, b: Rect, intersection: Rect | undefined}[] = [
    {
        a: {topLeft: {x: 0, y: 0}, bottomRight: {x: 5, y: 5}},
        b: {topLeft: {x: 1, y: 1}, bottomRight: {x: 3, y: 4}},
        intersection: {topLeft: {x: 1, y: 1}, bottomRight: {x: 3, y: 4}}
    },
    {
        a: {topLeft: {x: 0, y: 0}, bottomRight: {x: 5, y: 5}},
        b: {topLeft: {x: -5, y: -5}, bottomRight: {x: 2, y: 3}},
        intersection: {topLeft: {x: 0, y: 0}, bottomRight: {x: 2, y: 3}}
    },
    {
        a: {topLeft: {x: 0, y: 0}, bottomRight: {x: 5, y: 5}},
        b: {topLeft: {x: 5, y: 4}, bottomRight: {x: 6, y: 11}},
        intersection: {topLeft: {x: 5, y: 4}, bottomRight: {x: 5, y: 5}}
    },
    {
        a: {topLeft: {x: 0, y: 0}, bottomRight: {x: 5, y: 5}},
        b: {topLeft: {x: 0, y: 6}, bottomRight: {x: 5, y: 11}},
        intersection: undefined
    },
];

for (const test of tests) {
    const actual = intersection(test.a, test.b);
    assert.deepStrictEqual(actual, test.intersection,
        `For rectangles ${inspect(test.a)} and ${inspect(test.b)}, ` +
        `expected intersection to be ${inspect(test.intersection)}, but was ${inspect(actual)}`);
}
