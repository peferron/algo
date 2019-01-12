import assert from 'assert';
import {rank, unrank, all} from './permutation_generation';

const tests = [
    // n = 1
    [
        [1],
    ],

    // n = 2
    [
        [1, 2],
        [2, 1],
    ],

    // n = 3
    [
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1],
    ],

    // n = 4
    [
        [1, 2, 3, 4],
        [1, 2, 4, 3],
        [1, 3, 2, 4],
        [1, 3, 4, 2],
        [1, 4, 2, 3],
        [1, 4, 3, 2],
        [2, 1, 3, 4],
        [2, 1, 4, 3],
        [2, 3, 1, 4],
        [2, 3, 4, 1],
        [2, 4, 1, 3],
        [2, 4, 3, 1],
        [3, 1, 2, 4],
        [3, 1, 4, 2],
        [3, 2, 1, 4],
        [3, 2, 4, 1],
        [3, 4, 1, 2],
        [3, 4, 2, 1],
        [4, 1, 2, 3],
        [4, 1, 3, 2],
        [4, 2, 1, 3],
        [4, 2, 3, 1],
        [4, 3, 1, 2],
        [4, 3, 2, 1],
    ],
];

function testRank() {
    for (const permutations of tests) {
        for (const [m, p] of permutations.entries()) {
            const m2 = rank(p);
            assert.strictEqual(m2, m, `For p: ${p}, expected m to be: ${m}, but was: ${m2}`);
        }
    }
}

function testUnrank() {
    for (const permutations of tests) {
        for (const [m, p] of permutations.entries()) {
            const n = p.length;
            const p2 = unrank(m, n);
            assert.deepStrictEqual(p2, p, `For m: ${m} and n: ${n}, expected p to be: ${p}, but was ${p2}`);
        }
    }
}

function testAll() {
    for (const permutations of tests) {
        const n = permutations[0].length;
        const permutations2 = all(n);
        assert.deepStrictEqual(permutations2, permutations,
            `For n: ${n}, expected permutations to be: ${permutations}, but were: ${permutations2}`);
    }
}

testRank();
testUnrank();
testAll();
