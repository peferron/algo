import merge from './14.2';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {dst: number[], dstLen: number, src: number[], merged: number[]}[] = [
    {
        dst: [],
        dstLen: 0,
        src: [],
        merged: []
    },
    {
        dst: [1, 5],
        dstLen: 2,
        src: [],
        merged: [1, 5]
    },
    {
        dst: [1, 5, 0],
        dstLen: 2,
        src: [],
        merged: [1, 5, 0]
    },
    {
        dst: [0, 0],
        dstLen: 0,
        src: [1, 5],
        merged: [1, 5]
    },
    {
        dst: [0, 0, 0],
        dstLen: 0,
        src: [1, 5],
        merged: [1, 5, 0]
    },
    {
        dst: [5, 13, 17, 0, 0, 0, 0, 0],
        dstLen: 3,
        src: [3, 7, 11, 19],
        merged: [3, 5, 7, 11, 13, 17, 19, 0]
    },
];

for (const test of tests) {
    const actual = test.dst.slice();
    merge(actual, test.dstLen, test.src);
    assert.deepStrictEqual(actual, test.merged,
        `For dst ${inspect(test.dst)}, dstLen ${test.dstLen} and src ${inspect(test.src)}, ` +
        `expected merged to be ${inspect(test.merged)}, but was ${inspect(actual)}`);
}
