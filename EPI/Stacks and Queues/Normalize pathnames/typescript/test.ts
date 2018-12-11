import normalize from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {path: string, normalized: string}[] = [
    {path: '/', normalized: '/'},
    {path: 'a', normalized: 'a'},
    {path: '/a', normalized: '/a'},
    {path: 'a/', normalized: 'a/'},
    {path: '/a/../', normalized: '/'},
    {path: '/a/.', normalized: '/a'},
    {path: 'a/..', normalized: '.'},
    {path: './a', normalized: 'a'},
    {path: '../a', normalized: '../a'},
    {path: '../../a', normalized: '../../a'},
    {path: 'a/b//./c/../d/../../e', normalized: 'a/e'},
];

for (const test of tests) {
    const actual = normalize(test.path);
    assert.strictEqual(actual, test.normalized, `For path ${test.path}, ` +
        `expected normalized path to be ${test.normalized}, but was ${actual}`);
}
