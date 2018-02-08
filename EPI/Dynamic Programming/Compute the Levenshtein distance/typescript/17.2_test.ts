import distance from './17.2';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {a: string, b: string, distance: number}[] = [
    {a: 'a', b: 'b', distance: 1},
    {a: '', b: '', distance: 0},
    {a: 'ab', b: 'ab', distance: 0},
    {a: '', b: 'a', distance: 1},
    {a: 'abc', b: 'abdc', distance: 1},
    {a: 'abc', b: 'ac', distance: 1},
    {a: 'abc', b: 'adc', distance: 1},
    {a: 'abcd', b: 'aecd', distance: 1},
    {a: 'abcd', b: 'acdb', distance: 2},
    {a: 'abcd', b: 'ace', distance: 2},
    {a: 'abcd', b: 'aecfd', distance: 2},
    {a: 'Saturday', b: 'Sunday', distance: 3},
    {a: 'Saturday', b: 'Sundays', distance: 4},
];

for (const test of tests) {
    const actual = distance(test.a, test.b);
    assert.strictEqual(actual, test.distance,
        `For strings ${inspect(test.a)} and ${inspect(test.b)}, ` +
        `expected distance to be ${test.distance}, but was ${actual}`);
}
