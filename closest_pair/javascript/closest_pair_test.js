import assert from 'assert';
import {inspect} from 'util';
import {closestPairBruteForce, closestPairDivideAndConquer, distance} from './closest_pair';

const fns = [closestPairBruteForce, closestPairDivideAndConquer];

function comparePoints(p1, p2) {
    for (let dimension = 0; dimension < p1.length; dimension += 1) {
        const delta = p1[dimension] - p2[dimension];
        if (delta !== 0) {
            return delta;
        }
    }
    return 0;
}

// Static tests.

const staticTests = [
    {
        points: [
            [0],
            [2],
            [6],
            [5],
            [-2],
        ],
        closestPair: [
            [5],
            [6],
        ],
    },
    {
        points: [
            [0, 0],
            [0, 1],
        ],
        closestPair: [
            [0, 0],
            [0, 1],
        ],
    },
    {
        points: [
            [0, 0],
            [4, 3],
            [1, 5],
            [2, 3],
        ],
        closestPair: [
            [4, 3],
            [2, 3],
        ],
    },
    {
        points: [
            [0, 0, 1],
            [3, 2, 1],
            [2, 3, 4],
            [2, -1, -1],
            [-3, 0, 0],
        ],
        closestPair: [
            [0, 0, 1],
            [2, -1, -1],
        ],
    },
    {
        points: [
            [-216, -202, -268],
            [83, -46, 336],
            [216, 442, -252],
            [237, -280, -9],
        ],
        closestPair: [
            [83, -46, 336],
            [237, -280, -9],
        ],
    },
    {
        points: [
            [-216, -202, -268],
            [-280, 77, -398],
            [83, -46, 336],
            [216, 442, -252],
            [237, -280, -9],
        ],
        closestPair: [
            [-280, 77, -398],
            [-216, -202, -268],
        ],
    },
    {
        points: [
            [167, 439, 223],
            [189, 428, 300],
            [301, -427, -161],
            [462, 115, -20],
            [484, -253, 281],
        ],
        closestPair: [
            [167, 439, 223],
            [189, 428, 300],
        ],
    },
    {
        points: [
            [-108, -13],
            [-246, 257],
            [-260, 270],
            [-312, -181],
            [-329, -451],
            [-377, 164],
            [-426, -85],
            [153, 5],
            [184, -426],
            [198, 409],
            [20, -351],
            [250, -143],
            [260, 218],
            [320, 59],
            [335, 339],
            [363, -336],
            [496, -22],
            [69, -334],
            [90, 178],
            [90, 298],
        ],
        closestPair: [
            [-260, 270],
            [-246, 257],
        ],
    },
];

function runStaticTest(fn, test) {
    const actual = fn(test.points).sort(comparePoints);
    const expected = test.closestPair.sort(comparePoints);
    assert.deepStrictEqual(actual, expected,
        `For static test points ${inspect(test.points)} using ${inspect(fn)}, ` +
        `expected closest pair to be ${inspect(expected)}, but was ${inspect(actual)}`);
}

function runStaticTests() {
    for (const fn of fns) {
        for (const test of staticTests) {
            runStaticTest(fn, test);
        }
    }
}

// Random tests.

const randomPoint = dimensions =>
    Array.from({length: dimensions}, () => Math.floor(Math.random() * 1000 - 500));

const randomPoints = (count, dimensions) =>
    Array.from({length: count}, () => randomPoint(dimensions));

function runRandomTest() {
    const count = Math.floor(2 + Math.random() * 50);
    const dimensions = Math.floor(1 + Math.random() * 10);
    const points = randomPoints(count, dimensions);

    const pairs = fns.map(fn => fn(points));
    const distances = pairs.map(pair => distance(...pair));

    for (let i = 0; i < fns.length - 1; i += 1) {
        for (let j = i + 1; j < fns.length; j += 1) {
            const di = distances[i];
            const dj = distances[j];
            assert.strictEqual(di, dj, `For random test points ${inspect(points)}, ` +
                `got distance ${di} on pair ${inspect(pairs[i])} using ${inspect(fns[i])} and ` +
                `distance ${dj} on pair ${inspect(pairs[j])} using ${inspect(fns[j])}`);
        }
    }
}

function runRandomTests() {
    for (let i = 0; i < 50; i += 1) {
        runRandomTest();
    }
}

// Run all tests.

runStaticTests();
runRandomTests();
