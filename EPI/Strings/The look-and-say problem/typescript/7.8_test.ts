import lookAndSay from './7.8';

declare function require(name: string): any;
const assert = require('assert');

const tests: {n: number, result: string}[] = [
    {n: 0, result: '1'},
    {n: 1, result: '11'},
    {n: 2, result: '21'},
    {n: 3, result: '1211'},
    {n: 4, result: '111221'},
    {n: 5, result: '312211'},
    {n: 6, result: '13112221'},
    {n: 7, result: '1113213211'},
];

for (const test of tests) {
    const actual = lookAndSay(test.n)
    assert.strictEqual(actual, test.result,
        `For n ${test.n}, expected result to be ${test.result}, but was ${actual}`);
}
