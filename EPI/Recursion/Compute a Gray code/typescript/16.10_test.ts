import grayCode from './16.10';

declare function require(name: string): any;
const assert = require('assert');

const toBinString = (values: number[]) => values.map(v => v.toString(2));

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

for (const test of tests) {
    const actual = grayCode(test.bits);
    assert.deepStrictEqual(actual, test.grayCode, `For bits ${test.bits}, ` +
        `expected gray code to be ${toBinString(test.grayCode)}, but was ${toBinString(actual)}`);
}
