import assert from 'assert';
import sort from './quicksort';

const basicTests = [
    {
        in: null,
        out: null,
    },
    {
        in: [],
        out: [],
    },
    {
        in: [1],
        out: [1],
    },
    {
        in: [3, 7, 2, 1, 5, 4, 6, 7],
        out: [1, 2, 3, 4, 5, 6, 7, 7],
    },
];

function runBasicTests() {
    for (const test of basicTests) {
        const a = clone(test.in);
        sort(a);
        assert.deepStrictEqual(a, test.out);
    }
}

function runRandomTests() {
    for (let i = 0; i < 1000; i += 1) {
        runRandomTest();
    }
}

function runRandomTest() {
    const input = randomInts();
    const a = clone(input);
    sort(a);
    input.sort((x, y) => x - y);
    assert.deepStrictEqual(a, input);
}

function randomInts() {
    const n = Math.floor(Math.random() * 1000);
    // Use n as the upper bound to produce some duplicates.
    return Array.from({length: n}, () => Math.floor(Math.random() * n));
}

function clone(a) {
    return a && a.slice(0);
}

runBasicTests();
runRandomTests();
