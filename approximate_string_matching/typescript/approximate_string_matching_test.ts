import {editDistance} from './approximate_string_matching';

declare function require(name: string): any;
const assert = require('assert');

interface Test {
    a: string;
    b: string;
    distance: number;
}

const tests: Test[] = [
    {
        a: 'abc',
        b: 'abc',
        distance: 0
    },
    {
        a: 'abd',
        b: 'abc',
        distance: 1
    },
    {
        a: 'abbc',
        b: 'abc',
        distance: 1
    },
    {
        a: 'abc',
        b: 'abbc',
        distance: 1
    },
    {
        a: 'gateau',
        b: 'cake',
        distance: 4
    },
    {
        a: 'you should not',
        b: 'thou shalt not',
        distance: 5
    },
    {
        a: 'abd',
        b: 'abcd',
        distance: 1
    }
];

function runTest(test: Test): void {
    const distance = editDistance(test.a, test.b);
    assert.strictEqual(distance, test.distance);
}

tests.forEach(runTest);

console.log('All tests OK.');
