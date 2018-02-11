import snakify from './main';

declare function require(name: string): any;
const assert = require('assert');
// const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {string: string, snake: string}[] = [
    {string: '', snake: ''},
    {string: 'abcdef', snake: 'bfaced'},
    {string: 'Hello World!', snake: 'e lHloWrdlo!'},
];

for (const test of tests) {
    const actual = snakify(test.string);
    assert.strictEqual(actual, test.snake, `For string ${test.string}, ` +
        `expected snake to be ${test.snake}, but was ${actual}`);
}
