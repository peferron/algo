import {Item, getMaxValue} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

interface SubTest {
    maxWeight: number;
    maxValue: number;
}

const tests: {items: Item[], subTests: SubTest[]}[] = [
    {
        items: [
            {value: 13, weight: 5},
            {value: 15, weight: 4},
            {value: 10, weight: 3},
            {value: 6, weight: 2},
        ],
        subTests: [
            {maxWeight: 1, maxValue: 0},
            {maxWeight: 2, maxValue: 6},
            {maxWeight: 3, maxValue: 10},
            {maxWeight: 4, maxValue: 15},
            {maxWeight: 5, maxValue: 10 + 6},
            {maxWeight: 6, maxValue: 15 + 6},
            {maxWeight: 7, maxValue: 15 + 10},
            {maxWeight: 8, maxValue: 15 + 10},
            {maxWeight: 9, maxValue: 15 + 10 + 6},
            {maxWeight: 10, maxValue: 15 + 10 + 6},
            {maxWeight: 11, maxValue: 13 + 15 + 6},
            {maxWeight: 12, maxValue: 13 + 15 + 10},
            {maxWeight: 13, maxValue: 13 + 15 + 10},
            {maxWeight: 14, maxValue: 13 + 15 + 10 + 6},
        ]
    },
    {
        items: [
            {value: 65, weight: 20},
            {value: 35, weight: 8},
            {value: 245, weight: 60},
            {value: 195, weight: 55},
            {value: 65, weight: 40},
            {value: 150, weight: 70},
            {value: 275, weight: 85},
            {value: 155, weight: 25},
            {value: 120, weight: 30},
            {value: 320, weight: 65},
            {value: 75, weight: 75},
            {value: 40, weight: 10},
            {value: 200, weight: 95},
            {value: 100, weight: 50},
            {value: 220, weight: 40},
            {value: 99, weight: 10},
        ],
        subTests: [
            {maxWeight: 130, maxValue: 155 + 320 + 220},
        ]
    }
];

for (const test of tests) {
    for (const subTest of test.subTests) {
        const actual = getMaxValue(test.items, subTest.maxWeight);
        assert.strictEqual(actual, subTest.maxValue,
            `For items ${inspect(test.items)} and max weight ${subTest.maxWeight}, ` +
            `expected max value to be ${subTest.maxValue}, but was ${actual}`);
    }
}
