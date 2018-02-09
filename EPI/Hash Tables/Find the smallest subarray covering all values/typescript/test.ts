import {Digest, digest} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {strings: string[], keywords: Set<string>, digest: Digest | undefined}[] = [
    {
        strings: [],
        keywords: new Set(['abc']),
        digest: undefined
    },
    {
        strings: ['abc'],
        keywords: new Set(['def']),
        digest: undefined
    },
    {
        strings: ['abc'],
        keywords: new Set(['abc']),
        digest: {start: 0, end: 0},
    },
    {
        strings: ['abc', 'def', 'ghi', 'jkl', 'mno'],
        keywords: new Set(['abc']),
        digest: {start: 0, end: 0},
    },
    {
        strings: ['abc', 'def', 'ghi', 'jkl', 'mno'],
        keywords: new Set(['jkl', 'def']),
        digest: {start: 1, end: 3},
    },
    {
        strings: ['abc', 'def', 'ghi', 'jkl', 'mno', 'def', 'jkl'],
        keywords: new Set(['jkl', 'def']),
        digest: {start: 5, end: 6},
    },
];

for (const test of tests) {
    const actual = digest(test.strings, test.keywords);
    assert.deepStrictEqual(actual, test.digest,
        `For test strings ${inspect(test.strings)} and keywords ${inspect(test.keywords)}, ' +
        'expected digest to be ${inspect(test.digest)}, but was ${inspect(actual)}`);
}
