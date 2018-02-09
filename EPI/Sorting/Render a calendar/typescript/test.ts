import {Event, maxConcurrentEvents} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {events: Event[], maxConcurrentEvents: number}[] = [
    {
        events: [],
        maxConcurrentEvents: 0
    },
    {
        events: [{start: 0, end: 1}, {start: 1, end: 2}],
        maxConcurrentEvents: 1
    },
    {
        events: [{start: 0, end: 2}, {start: 1, end: 3}],
        maxConcurrentEvents: 2
    },
    {
        events: [{start: 0, end: 2}, {start: 4, end: 5}, {start: 1, end: 3}],
        maxConcurrentEvents: 2
    },
    {
        events: [{start: 0, end: 2}, {start: 1, end: 4}, {start: 2, end: 3}],
        maxConcurrentEvents: 2
    },
    {
        events: [
            {start: 1, end: 5}, {start: 6, end: 10}, {start: 11, end: 13}, {start: 14, end: 15},
            {start: 2, end: 7}, {start: 8, end: 9}, {start: 12, end: 15},
            {start: 4, end: 5}, {start: 9, end: 17},
        ],
        maxConcurrentEvents: 3
    },
]

for (const test of tests) {
    const actual = maxConcurrentEvents(test.events)
    assert.strictEqual(actual, test.maxConcurrentEvents,
        `For test events ${inspect(test.events)}, ` +
        `expected max concurrent events to be ${test.maxConcurrentEvents}, but was ${actual}`);
}
