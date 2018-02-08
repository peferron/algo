import evaluate from './9.2';

declare function require(name: string): any;
const assert = require('assert');
// const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {rpn: string, value: number}[] = [
    {rpn: '1', value: 1},
    {rpn: '-1', value: -1},
    {rpn: '2,3,+', value: 5},
    {rpn: '5,2,-', value: 3},
    {rpn: '2,3,*', value: 6},
    {rpn: '6,2,/', value: 3},
    {rpn: '1,3,+,5,7,8,+,*,-', value: -71},
];

for (const test of tests) {
    const actual = evaluate(test.rpn);
    assert.strictEqual(actual, test.value, `For RPN expression ${test.rpn}, ` +
        `expected value to be ${test.value}, but was ${actual}`);
}
