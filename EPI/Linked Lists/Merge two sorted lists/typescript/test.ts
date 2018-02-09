import {List, mergeIter, mergeRec} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {a: number[], b: number[], merged: number[]}[] = [
    {
        a: [0],
        b: [0],
        merged: [0, 0]
    },
    {
        a: [0],
        b: [1],
        merged: [0, 1]
    },
    {
        a: [0, 1, 3, 4, 5, 12],
        b: [2, 4, 4, 6, 20],
        merged: [0, 1, 2, 3, 4, 4, 4, 5, 6, 12, 20]
    },
];

const toList = ([head, ...tail]: number[]): List<number> =>
    ({value: head, next: tail.length === 0 ? undefined : toList(tail)});

const fromList = ({value, next}: List<number>): number[] =>
    next ? [value, ...fromList(next)] : [value];

for (const fn of [mergeIter, mergeRec]) {
    for (const test of tests) {
        const actual = fromList(fn(toList(test.a), toList(test.b)));
        assert.deepStrictEqual(actual, test.merged, `Using function ${fn.name}, ` +
            `for a ${inspect(test.a)} and b ${inspect(test.b)}, ` +
            `expected merged to be ${inspect(test.merged)}, but was ${inspect(actual)}`);
    }
}
