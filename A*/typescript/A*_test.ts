import {Point, shortestPath} from './A*';

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

const getChars = (str: string) => str.trim().split('\n').map(line => line.split(''));

const getPixels = (chars: string[][]) => chars.map(line => line.map(char => char === '#'));

const getPath = (chars: string[][]) => {
    const path: {order: number, point: Point}[] = [];
    chars.forEach((line, y) => line.forEach((char, x) => {
        if (/[0-9A-Z]/.test(char)) {
            path.push({order: parseInt(char, 36), point: {x, y}});
        }
    }));
    return path.sort((a, b) => a.order - b.order).map(item => item.point);
}

function runTest(test: string) {
    const chars = getChars(test);
    const pixels = getPixels(chars);
    const expectedPath = getPath(chars);
    const start = expectedPath[0];
    const end = expectedPath[expectedPath.length - 1];
    const actualPath = shortestPath(pixels, start, end);

    if (JSON.stringify(actualPath) !== JSON.stringify(expectedPath)) {
        console.log('For input:', test);
        console.log('expected path to be:', expectedPath);
        console.log('but was:', actualPath);
        throw new Error();
    }
}

tests.forEach(runTest);
