import {Student, rearrangeInPlace} from './14.8';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

interface TestStudent extends Student {
    name: string;
}

const tests: {students: TestStudent[], rearranged: TestStudent[]}[] = [
    {
        students: [],
        rearranged: []
    },
    {
        students: [
            {name: '17 #1', age: 17},
            {name: '18 #1', age: 18},
        ],
        rearranged: [
            {name: '17 #1', age: 17},
            {name: '18 #1', age: 18},
        ]
    },
    {
        students: [
            {name: '18 #1', age: 18},
            {name: '17 #1', age: 17},
        ],
        rearranged: [
            {name: '17 #1', age: 17},
            {name: '18 #1', age: 18},
        ]
    },
    {
        students: [
            {name: '17 #1', age: 17},
            {name: '18 #1', age: 18},
            {name: '17 #2', age: 17},
        ],
        rearranged: [
            {name: '17 #1', age: 17},
            {name: '17 #2', age: 17},
            {name: '18 #1', age: 18},
        ]
    },
    {
        students: [
            {name: '17 #1', age: 17},
            {name: '18 #1', age: 18},
            {name: '21 #1', age: 21},
            {name: '21 #2', age: 21},
            {name: '18 #2', age: 18},
            {name: '17 #2', age: 17},
            {name: '21 #3', age: 21},
            {name: '19 #1', age: 19},
        ],
        rearranged: [
            {name: '17 #1', age: 17},
            {name: '17 #2', age: 17},
            {name: '18 #1', age: 18},
            {name: '18 #2', age: 18},
            {name: '19 #1', age: 19},
            {name: '21 #1', age: 21},
            {name: '21 #2', age: 21},
            {name: '21 #3', age: 21},
        ]
    },
];

for (const test of tests) {
    const actual = test.students.slice();
    rearrangeInPlace(actual);
    assert.deepStrictEqual(actual, test.rearranged, `For students ${inspect(test.students)}, ` +
        `expected rearranged to be ${inspect(test.rearranged)}, but was ${inspect(actual)}`);
}
