import {Node, isPalindrome} from './main';

declare function require(name: string): any;
const assert = require('assert');

function toList(values: number[]): Node {
    const nodes = values.map(value => ({value} as Node));
    nodes.forEach((node, i) => node.next = nodes[i + 1]);
    return nodes[0];
}

function toArray(list: Node): number[] {
    return [list.value, ...(list.next ? toArray(list.next) : [])];
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
    const list = toList(test.list);
    const actual = isPalindrome(list);

    assert.strictEqual(actual, test.isPalindrome, `For list ${test.list}, ` +
        `expected isPalindrome to be ${test.isPalindrome}, but was ${actual}`);

    const values = toArray(list);

    assert.deepStrictEqual(values, test.list, `For list ${test.list}, ` +
        `expected final list to be unchanged, but was ${values}`);
}
