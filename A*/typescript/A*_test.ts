import {Coordinates, Graph, shortestPath} from './A*';

declare function require(name: String): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

// . = free points
// # = blocked points
// [0-9A-Z] = shortest path
const tests: string[] = [
`
01..
..2.
...3
`,
`
0#..
1#..
.234
`,
`
.210
3#..
4#..
`,
`
.9ABCD
8#####
7#543.
.6###2
..#01.
`,
`
...10....
.32......
4#.....#.
5##...##.
.6##.##..
..7###...
..8......
##9######
...ABCDEF
`,
];

function parse(test: string): {graph: Graph, path: number[]} {
    const chars = test.trim().split('\n').map(line => line.split(''));
    const coordinates: Coordinates[] = [];
    const path: number[] = [];

    chars.forEach((line, y) => line.forEach((char, x) => {
        if (char !== '#') {
            coordinates.push({x, y});
            if (/[0-9A-Z]/.test(char)) {
                path[parseInt(char, 36)] = coordinates.length - 1;
            }
        }
    }));

    const adjacencyList = coordinates.map(a =>
        coordinates
            .map((b, bi) => {
                const dx = Math.abs(a.x - b.x);
                const dy = Math.abs(a.y - b.y);
                return dx <= 1 && dy <= 1 && dx + dy > 0 ? bi : NaN;
            })
            .filter(bi => !isNaN(bi))
    );

    return {
        graph: {coordinates, adjacencyList},
        path
    };
}

function runTest(test: string) {
    const {graph, path: expectedPath} = parse(test);
    const start = expectedPath[0];
    const end = expectedPath[expectedPath.length - 1];
    const actualPath = shortestPath(graph, start, end);

    assert.deepStrictEqual(expectedPath, actualPath,
        'For input:' + test +
        'expected path to be:\n' + inspect(expectedPath.map(point => graph.coordinates[point])) +
        '\nbut was:\n' + inspect(actualPath.map(point => graph.coordinates[point])));
}

tests.forEach(runTest);
