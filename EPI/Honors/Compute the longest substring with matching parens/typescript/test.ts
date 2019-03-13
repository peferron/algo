import longestMatch from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {str: string, len: number}[] = [
    {str: '((())()(()(', len: '(())()'.length},
    {str: '())()(())())', len: '()(())()'.length},
];

for (const test of tests) {
    const actual = longestMatch(test.str);
    assert.strictEqual(actual, test.len, `For string ${test.str}, ` +
        `expected length of longest match to be ${test.len}, but was ${actual}`);
}
