import {Point, Segment, intersection} from './intersection';
import {intersections} from './intersections';

declare function require(name: string): any;
const inspect = require('util').inspect;

interface IntersectionTest {
    s1: Segment;
    s2: Segment;
    intersection: Point;
}

const intersectionTests: IntersectionTest[] = [
    {
        s1: [{x: 0, y: 0}, {x: 3, y: 3}],
        s2: [{x: 1, y: 0}, {x: 4, y: 0}],
        intersection: undefined,
    },
    {
        s1: [{x: 0, y: 0}, {x: 3, y: 3}],
        s2: [{x: 1, y: 2}, {x: 4, y: 2}],
        intersection: {x: 2, y: 2},
    },
    {
        s1: [{x: 0, y: 0}, {x: 3, y: 3}],
        s2: [{x: 1, y: 2}, {x: 2, y: 2}],
        intersection: {x: 2, y: 2},
    },
    {
        s1: [{x: 0, y: 0}, {x: 3, y: 0}],
        s2: [{x: 0, y: 1}, {x: 3, y: 1}],
        intersection: undefined,
    },
    {
        s1: [{x: 0, y: 0}, {x: 3, y: 0}],
        s2: [{x: 1, y: 1}, {x: 1, y: 3}],
        intersection: undefined,
    },
    {
        s1: [{x: 0, y: 0}, {x: 3, y: 0}],
        s2: [{x: 1, y: -1}, {x: 1, y: 1}],
        intersection: {x: 1, y: 0},
    },
];

for (const test of intersectionTests) {
    const actual = intersection(test.s1, test.s2);
    if (JSON.stringify(test.intersection) !== JSON.stringify(actual)) {
        throw new Error(`For segments ${inspect(test.s1)} and ${inspect(test.s2)}, ` +
            `expected intersection to be ${inspect(test.intersection)}, ` +
            `but was ${inspect(actual)}`);
    }
}

interface IntersectionsTest {
    segments: Segment[];
    intersections: Point[];
}

const intersectionsTest: IntersectionsTest[] = [
    {
        segments: [
            [{x: 0, y: 0}, {x: 3, y: 3}],
            [{x: 1, y: 0}, {x: 4, y: 0}],
        ],
        intersections: []
    },
    {
        segments: [
            [{x: 0, y: 0}, {x: 3, y: 3}],
            [{x: 1, y: 2}, {x: 4, y: 2}],
        ],
        intersections: [{x: 2, y: 2}]
    },
    {
        segments: [
            [{x: 0, y: 0}, {x: 6, y: 3}],
            [{x: 1, y: 2}, {x: 3, y: 2}],
            [{x: 2, y: 4}, {x: 5, y: 1}],
        ],
        intersections: [{x: 4, y: 2}]
    },
    {
        segments: [
            [{x: 0, y: 0}, {x: 6, y: 3}],
            [{x: 1, y: 2}, {x: 3, y: 2}],
            [{x: 2, y: 4}, {x: 5, y: 1}],
        ],
        intersections: [{x: 4, y: 2}]
    },
    {
        segments: [
            [{x: 0, y: 0}, {x: 5, y: 0}],
            [{x: 1, y: 1}, {x: 7, y: -2}],
            [{x: 2, y: 2}, {x: 6, y: -2}],
        ],
        intersections: [{x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: -1}]
    },
    {
        segments: [
            [{x: 0, y: 0}, {x: 5, y: 0}],
            [{x: -1, y: 2}, {x: 7, y: -2}],
            [{x: 2, y: 2}, {x: 6, y: -2}],
        ],
        intersections: [{x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: -1}]
    },
    {
        segments: [
            [{x: 0, y: 0}, {x: 2, y: 0}],
            [{x: 1, y: 1}, {x: 1, y: -1}],
        ],
        intersections: [{x: 1, y: 0}]
    },
    {
        segments: [
            [{x: 0, y: 0}, {x: 5, y: 0}],
            [{x: 3, y: 2}, {x: 3, y: -1}],
            [{x: 2, y: 2}, {x: 6, y: -2}],
        ],
        intersections: [{x: 3, y: 0}, {x: 3, y: 1}, {x: 4, y: 0}]
    },
];

for (const test of intersectionsTest) {
    const actual = intersections(test.segments);
    if (JSON.stringify(actual) !== JSON.stringify(test.intersections)) {
        throw new Error(`For segments ${inspect(test.segments)}, ` +
            `expected intersections to be ${inspect(test.intersections)}, ` +
            `but were ${inspect(actual)}`);
    }
}
