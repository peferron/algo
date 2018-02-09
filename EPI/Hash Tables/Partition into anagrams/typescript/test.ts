import groupAnagrams from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {words: string[], anagrams: string[][]}[] = [
    {
        words: [],
        anagrams: []
    },
    {
        words: ["abc", "bcaa"],
        anagrams: []
    },
    {
        words: ["abc", "bca"],
        anagrams: [
            ["abc", "bca"],
        ]
    },
    {
        words: ["debitcard", "elvis", "silent", "badcredit", "lives", "freedom", "listen", "levis",
            "money"],
        anagrams: [
            ["debitcard", "badcredit"],
            ["elvis", "lives", "levis"],
            ["silent", "listen"],
        ]
    },
];

for (const test of tests) {
    const actual = groupAnagrams(test.words).sort((a, b) => a[0].localeCompare(b[0]));
    assert.deepStrictEqual(actual, test.anagrams, `For test words ${test.words}, ` +
        `expected anagrams to be ${inspect(test.anagrams)}, but were ${inspect(actual)}`);
}
