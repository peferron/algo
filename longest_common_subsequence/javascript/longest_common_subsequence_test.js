import {longestCommonSubsequence} from './longest_common_subsequence.js';

const tests = [
    {
        a: 'abc',
        b: '',
        longestCommonSubsequence: ''
    },
    {
        a: 'a',
        b: 'a',
        longestCommonSubsequence: 'a'
    },
    {
        a: 'abcd',
        b: 'bxd',
        longestCommonSubsequence: 'bd'
    },
    {
        a: 'ab1cd',
        b: 'b23cd',
        longestCommonSubsequence: 'bcd'
    },
    {
        a: 'azemlrkdflmgkjsdfml',
        b: 'qlmzeirjqlmfilmfkjqfmlsife',
        longestCommonSubsequence: 'zerflmkjfml'
    },
    {
        // Wikipedia
        a: 'XMJYAUZ',
        b: 'MZJAWXU',
        longestCommonSubsequence: 'MJAU'
    }
];

function runTest(test, i) {
    const lcs = longestCommonSubsequence(test.a, test.b);
    if (lcs !== test.longestCommonSubsequence) {
        throw new Error(`In test #${i} with strings '${test.a}' and '${test.b}', expected longest` +
            ` common subsequence to be '${test.longestCommonSubsequence}', but was '${lcs}'`);
    }
}

tests.forEach(runTest);

console.log('All tests OK.');
