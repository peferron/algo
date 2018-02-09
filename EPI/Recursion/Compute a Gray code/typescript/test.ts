import {grayCodeRecursive, grayCodeIterative} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const toBinString = (values: number[]) => inspect(values.map(v => v.toString(2)));

const tests: {bits: number, grayCode: number[]}[] = [
    {
        bits: 0,
        grayCode: [
            0b0
        ]
    },
    {
        bits: 1,
        grayCode: [
            0b0,
            0b1
        ]
    },
    {
        bits: 2,
        grayCode: [
            0b00,
            0b01,
            0b11,
            0b10,
        ]
    },
    {
        bits: 3,
        grayCode: [
            0b000,
            0b001,
            0b011,
            0b010,
            0b110,
            0b111,
            0b101,
            0b100,
        ]
    },
];

for (const fn of [grayCodeRecursive, grayCodeIterative]) {
    for (const test of tests) {
        const actual = fn(test.bits);
        assert.deepStrictEqual(actual, test.grayCode,
            `Using function ${fn.name}, for bits ${test.bits}, ` +
            `expected gray code to be ${toBinString(test.grayCode)}, ` +
            `but was ${toBinString(actual)}`);
    }
}
