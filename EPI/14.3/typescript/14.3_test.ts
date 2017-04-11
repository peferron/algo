import occurrences, {Occurrence} from './14.3';

declare function require(name: String): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

type Test = {string: string, occurrences: Occurrence[]};

const tests: Test[] = [
    {
        string: '',
        occurrences: []
    },
    {
        string: 'a',
        occurrences: [
            {char: 'a', count: 1},
        ]
    },
    {
        string: 'aa',
        occurrences: [
            {char: 'a', count: 2},
        ]
    },
    {
        string: 'ab',
        occurrences: [
            {char: 'a', count: 1},
            {char: 'b', count: 1},
        ]
    },
    {
        string: 'ba',
        occurrences: [
            {char: 'a', count: 1},
            {char: 'b', count: 1},
        ]
    },
    {
        string: 'bcdacebe',
        occurrences: [
            {char: 'a', count: 1},
            {char: 'b', count: 2},
            {char: 'c', count: 2},
            {char: 'd', count: 1},
            {char: 'e', count: 2},
        ]
    },
];

for (const test of tests) {
    const actual = occurrences(test.string);
    assert.deepStrictEqual(actual, test.occurrences, `For test string ${test.string}, ` +
        `expected occurrences to be ${inspect(test.occurrences)}, but were ${inspect(actual)}`);
}
