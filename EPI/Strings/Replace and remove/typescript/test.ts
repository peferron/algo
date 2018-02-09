import removeAndReplace from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {before: string[], after: string[]}[] = [
    {before: [], after: []},
    {before: ['a', ''], after: ['d', 'd']},
    {before: ['b'], after: []},
    {before: ['a', 'c', 'd', ''], after: ['d', 'd', 'c', 'd']},
    {before: ['c', 'd', 'a', ''], after: ['c', 'd', 'd', 'd']},
    {before: ['c', 'd', 'a', 'e', 'f', ''], after: ['c', 'd', 'd', 'd', 'e', 'f']},
    {before: ['b', 'c', 'd'], after: ['c', 'd']},
    {before: ['c', 'd', 'b'], after: ['c', 'd']},
    {before: ['c', 'd', 'b', 'e', 'f'], after: ['c', 'd', 'e', 'f']},
    {before: ['c', 'd', 'a', 'b', 'e', 'f'], after: ['c', 'd', 'd', 'd', 'e', 'f']},
    {before: ['c', 'd', 'b', 'a', 'e', 'f'], after: ['c', 'd', 'd', 'd', 'e', 'f']},
]

for (const test of tests) {
    const size = test.before.filter(c => c !== '').length;
    const actual = [...test.before];
    const actualSize = removeAndReplace(actual, size);
    actual.splice(actualSize);

    assert.deepStrictEqual(actual, test.after, `For array ${inspect(test.before)}, ` +
        `expected result to be ${inspect(test.after)}, but was ${inspect(actual)}`);
}
