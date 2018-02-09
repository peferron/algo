import getWords from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {number: string, characters: Map<string, string[]>, words: string[]}[] = [
    {
        number: '',
        characters: new Map(),
        words: ['']
    },
    {
        number: '2',
        characters: new Map([
            ['2', ['2', 'A', 'B', 'C']],
        ]),
        words: [
            '2', 'A', 'B', 'C',
        ]
    },
    {
        number: '123',
        characters: new Map([
            ['1', ['1']],
            ['2', ['2', 'A', 'B', 'C']],
            ['3', ['3', 'D', 'E', 'F']],
        ]),
        words: [
            '1CF', '1CE', '1CD', '1C3',
            '1BF', '1BE', '1BD', '1B3',
            '1AF', '1AE', '1AD', '1A3',
            '12F', '12E', '12D', '123',
        ]
    },
];

for (const test of tests) {
    const actual = getWords(test.number, test.characters).sort();
    const expected = test.words.sort();
    assert.deepStrictEqual(actual, expected,
        `For number ${test.number} and characters ${inspect(test.characters)}, ` +
        `expected words to be ${inspect(expected)} but were ${inspect(actual)}`);
}
