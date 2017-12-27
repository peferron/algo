import reverseWords from './7.6';

declare function require(name: string): any;
const assert = require('assert');

const tests: {input: string, output: string}[] = [
    {input: "", output: ""},
    {input: "a", output: "a"},
    {input: "ab", output: "ab"},
    {input: "ab c", output: "c ab"},
    {input: "bla blah blahhhh", output: "blahhhh blah bla"},
];

for (const test of tests) {
    const actual = reverseWords(test.input);
    assert.strictEqual(actual, test.output, `For input ${test.input}, ` +
        `expected output to be ${test.output}, but was ${actual}`);
}
