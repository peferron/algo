import generateMatchedParens from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {pairs: number, matchedParens: string[]}[] = [
    {
        pairs: 0,
        matchedParens: [
            '',
        ]
    },
    {
        pairs: 1,
        matchedParens: [
            '()',
        ]
    },
    {
        pairs: 2,
        matchedParens: [
            '(())',
            '()()',
        ]
    },
    {
        pairs: 3,
        matchedParens: [
            '((()))',
            '(()())',
            '(())()',
            '()(())',
            '()()()',
        ]
    },
    {
        pairs: 4,
        matchedParens: [
            '(((())))',
            '((()()))',
            '((())())',
            '((()))()',
            '(()(()))',
            '(()()())',
            '(()())()',
            '(())(())',
            '(())()()',
            '()((()))',
            '()(()())',
            '()(())()',
            '()()(())',
            '()()()()',
        ]
    },
];

for (const test of tests) {
    const actual = generateMatchedParens(test.pairs);
    assert.deepStrictEqual(actual, test.matchedParens, `For ${test.pairs} pairs, ` +
        `expected matched parens to be ${inspect(test.matchedParens)}, ` +
        `but were ${inspect(actual)}`);
}
