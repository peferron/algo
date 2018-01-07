import {Node, isPalindrome} from './8.12';

declare function require(name: string): any;
const assert = require('assert');

function toList(values: number[]): Node {
    const nodes = values.map(value => ({value} as Node));
    nodes.forEach((node, i) => node.next = nodes[i + 1]);
    return nodes[0];
}

const tests: {list: number[], isPalindrome: boolean}[] = [
    {list: [1], isPalindrome: true},
    {list: [1, 1], isPalindrome: true},
    {list: [1, 2, 1], isPalindrome: true},
    {list: [1, 2], isPalindrome: false},
    {list: [1, 2, 2], isPalindrome: false},
    {list: [1, 5, 2, 3, 2, 5, 1], isPalindrome: true},
    {list: [1, 5, 2, 2, 5, 1], isPalindrome: true},
    {list: [1, 5, 2, 3, 5, 1], isPalindrome: false},
];

for (const test of tests) {
    const actual = isPalindrome(toList(test.list));
    assert.strictEqual(actual, test.isPalindrome, `For list ${test.list}, ` +
        `expected isPalindrome to be ${test.isPalindrome}, but was ${actual}`);
}
