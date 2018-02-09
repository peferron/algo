import getMaxProfit from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {prices: number[], maxProfit: number}[] = [
    {prices: [], maxProfit: 0},
    {prices: [1], maxProfit: 0},
    {prices: [1, 2], maxProfit: 1},
    {prices: [2, 1], maxProfit: 0},
    {prices: [4, 5, 2, 3, 4, 1, 2], maxProfit: 2},
];

for (const test of tests) {
    const actual = getMaxProfit(test.prices);
    assert.strictEqual(actual, test.maxProfit, `For prices ${test.prices}, ` +
        `expected maximum profit to be ${test.maxProfit}, but was ${actual}`);
}
