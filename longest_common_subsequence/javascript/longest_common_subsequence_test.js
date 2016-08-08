import {longestCommonSubsequence} from './longest_common_subsequence.js';
import {shortestCommonSupersequence} from './shortest_common_supersequence.js';

const assert = require('assert');

const tests = [
    {
        a: 'abc',
        b: '',
        longestCommonSubsequence: '',
        shortestCommonSupersequence: 'abc'
    },
    {
        a: 'a',
        b: 'a',
        longestCommonSubsequence: 'a',
        shortestCommonSupersequence: 'a'
    },
    {
        a: 'abcd',
        b: 'bxd',
        longestCommonSubsequence: 'bd',
        shortestCommonSupersequence: 'abcxd'
    },
    {
        a: 'ab1cd',
        b: 'b23cd',
        longestCommonSubsequence: 'bcd',
        shortestCommonSupersequence: 'ab123cd'
    },
    {
        a: 'azemlrkdflmgkjsdfml',
        b: 'qlmzeirjqlmfilmfkjqfmlsife',
        longestCommonSubsequence: 'zerflmkjfml',
        shortestCommonSupersequence: 'aqlmzemlirkdjqlmfilmgfkjsdqfmlsife'
    },
    {
        // Wikipedia
        a: 'XMJYAUZ',
        b: 'MZJAWXU',
        longestCommonSubsequence: 'MJAU',
        shortestCommonSupersequence: 'XMZJYAWXUZ'
    }
];

function runTest(test, i) {
    const lcs = longestCommonSubsequence(test.a, test.b);
    assert.strictEqual(test.longestCommonSubsequence, lcs,
        `In test #${i} with strings '${test.a}' and '${test.b}', ` +
        `expected longest common subsequence to be '${test.longestCommonSubsequence}', ` +
        `but was '${lcs}'`);

    const scs = shortestCommonSupersequence(test.a, test.b);
    assert.strictEqual(test.shortestCommonSupersequence, scs,
        `In test #${i} with strings '${test.a}' and '${test.b}', ` +
        `expected shortest common supersequence to be '${test.shortestCommonSupersequence}', ` +
        `but was '${scs}'`);
}

tests.forEach(runTest);
