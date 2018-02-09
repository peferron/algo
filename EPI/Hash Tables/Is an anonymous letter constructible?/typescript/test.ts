import isConstructible from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {letter: string, magazine: string, constructible: boolean}[] = [
    {
        letter: '',
        magazine: '',
        constructible: true
    },
    {
        letter: '',
        magazine: 'da bc ee afcd',
        constructible: true
    },
    {
        letter: 'ae b ced',
        magazine: 'da bc ee afcd',
        constructible: true
    },
    {
        letter: 'ae b\nced',
        magazine: 'da bc ee afcd',
        constructible: true
    },
    {
        letter: 'a e b c e d',
        magazine: 'da bc ee afcd',
        constructible: true
    },
    {
        letter: 'ae b ced',
        magazine: 'da bc eE afcd',
        constructible: false
    },
    {
        letter: 'ae b ced',
        magazine: 'da bc e afcd',
        constructible: false
    },
];

for (const test of tests) {
    const actual = isConstructible(test.letter, test.magazine);
    assert.strictEqual(actual, test.constructible,
        `For letter "${test.letter}" and magazine "${test.magazine}", ` +
        `expected constructible to be ${test.constructible}, but was ${actual}`);
}
