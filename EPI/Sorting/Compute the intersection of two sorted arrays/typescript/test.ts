import {intersectionSimple, intersectionSmart} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {a: number[], b: number[], intersection: number[]}[] = [
    {
        a: [],
        b: [],
        intersection: []
    },
    {
        a: [3, 5],
        b: [],
        intersection: []
    },
    {
        a: [],
        b: [3, 5],
        intersection: []
    },
    {
        a: [1, 3, 4, 6, 7, 9, 9, 9, 11, 11, 12, 15],
        b: [2, 3, 5, 11],
        intersection: [3, 11]
    },
    {
        a: [2, 3, 3, 5, 5, 6, 7, 7, 8, 12],
        b: [5, 5, 6, 8, 8, 9, 10, 10],
        intersection: [5, 6, 8]
    },
];

for (const f of [intersectionSimple, intersectionSmart]) {
    for (const test of tests) {
        const actual = f(test.a, test.b);
        assert.deepStrictEqual(actual, test.intersection,
            `For arrays ${inspect(test.a)} and ${inspect(test.b)}, using function ${f.name}, ` +
            `expected intersection to be ${inspect(test.intersection)}, ` +
            `but was ${inspect(actual)}`);
    }
}
