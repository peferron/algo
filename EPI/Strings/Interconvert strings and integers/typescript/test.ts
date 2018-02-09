import {intToString, stringToInt} from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {int: number, string: string}[] = [
    {int: -1, string: '-1'},
    {int: -546, string: '-546'},
    {int: 0, string: '0'},
    {int: 1, string: '1'},
    {int: 546, string: '546'},
];

for (const test of tests) {
    const actualString = intToString(test.int);
    assert.strictEqual(actualString, test.string,
        `For int ${test.int}, expected string to be ${test.string}, but was ${actualString}`);

    const actualInt = stringToInt(test.string);
    assert.strictEqual(actualInt, test.int,
        `For string ${test.string}, expected int to be ${test.int}, but was ${actualInt}`);
}
