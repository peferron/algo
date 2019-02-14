import {countInversionsBruteforce, countInversionsDivideAndConquer} from './main';

declare function require(name: string): any;
const assert = require('assert');

function runRandomTest() {
    const length = Math.floor(Math.random() * 100);
    const random = () => Math.floor(Math.random() * length * 2); // Generate some duplicate and missing values.
    const a = Array.from({length}, random);

    const bruteForceCount = countInversionsBruteforce(a);
    const divideAndConquerCount = countInversionsDivideAndConquer([...a]);

    assert.strictEqual(bruteForceCount, divideAndConquerCount, `For array ${a}, ` +
        `brute force count was ${bruteForceCount} but divide-and-conquer count was ${divideAndConquerCount}`);
}

function runRandomTests() {
    const runs = Math.floor(Math.random() * 1000);
    for (let i = 0; i < runs; i += 1) {
        runRandomTest();
    }
}

runRandomTests();
