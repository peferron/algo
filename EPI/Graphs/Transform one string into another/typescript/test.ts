import getShortestProductionLength from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {from: string, to: string, dict: Set<string>, length: number}[] = [
    {
       from: 'a',
       to: 'a',
       dict: new Set(['a']),
       length: 1
    },
    {
       from: 'a',
       to: 'a',
       dict: new Set([]),
       length: -1
    },
    {
       from: 'a',
       to: 'b',
       dict: new Set(['a', 'b']),
       length: 2
    },
    {
       from: 'a',
       to: 'b',
       dict: new Set(['a', 'c']),
       length: -1
    },
    {
       from: 'ab',
       to: 'cd',
       dict: new Set(['ab', 'cb', 'abc', 'bc', 'cd']),
       length: 3
    },
    {
       from: 'ab',
       to: 'bc',
       dict: new Set(['ab', 'cb', 'abc', 'bc', 'cd']),
       length: -1
    },
    {
       from: 'cat',
       to: 'dog',
       dict: new Set(['bat', 'cot', 'dog', 'dag', 'dot', 'cat']),
       length: 4
    },
];

for (const test of tests) {
    const actual = getShortestProductionLength(test.from, test.to, test.dict);
    assert.strictEqual(actual, test.length,
        `From '${test.from}' to '${test.to}' using dict ${inspect(test.dict)}, ` +
        `expected length of shortest production sequence to be ${test.length}, but was ${actual}`);
}
