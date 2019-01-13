import * as assert from 'assert';
import * as util from 'util';
import sort from './mergesort';

const inspect = (v: any) => util.inspect(v, {depth: null});

const clone = (array: number[]) => array.slice();

const randomInts = (length: number) =>
    Array.from({length}, () => Math.floor(Math.random() * length));

const isSorted = (array: number[]) =>
    array.every((v, i) => i === array.length - 1 || v <= array[i + 1]);

function testBasicInputs(): void {
    const tests = [
        {
            array: [],
            sorted: [],
        },
        {
            array: [1],
            sorted: [1],
        },
        {
            array: [3, 7, 2, 1, 5, 4, 6, 7],
            sorted: [1, 2, 3, 4, 5, 6, 7, 7],
        },
    ];

    for (const test of tests) {
        const actual = clone(test.array);
        sort(actual);
        assert.deepStrictEqual(actual, test.sorted, `For input array ${inspect(test.array)}, ` +
            `expected sorted array to be ${inspect(test.sorted)}, but was ${inspect(actual)}`);
    }
}

function testRandomInputs() {
    for (let i = 0; i < 1000; i += 1) {
        const array = randomInts(Math.floor(Math.random() * 1000));
        sort(array);
        assert.ok(isSorted(array));
    }
}

testBasicInputs();
testRandomInputs();
