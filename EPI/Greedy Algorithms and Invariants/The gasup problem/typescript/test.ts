import {City, indexOfAmpleCity} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {cities: City[], indexOfAmpleCity: number}[] = [
    {
        cities: [
            {gas: 50, distanceToNext: 900},
            {gas: 20, distanceToNext: 600},
            {gas: 5, distanceToNext: 200},
            {gas: 30, distanceToNext: 400},
            {gas: 25, distanceToNext: 600},
            {gas: 10, distanceToNext: 200},
            {gas: 10, distanceToNext: 100},
        ],
        indexOfAmpleCity: 3
    }
];

for (const test of tests) {
    const actual = indexOfAmpleCity(test.cities);
    assert.strictEqual(actual, test.indexOfAmpleCity, `For cities ${inspect(test.cities)}, ` +
        `expected index of ample city to be ${test.indexOfAmpleCity}, but was ${actual}`);
}
