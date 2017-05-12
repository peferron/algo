export interface Coord {
    row: number;
    col: number;
}

export enum Color {
    White,
    Black,
}

export function path(maze: Color[][], start: Coord, end: Coord): Coord[] | undefined {
    if (equals(start, end)) {
        return [start];
    }

    maze[start.row][start.col] = Color.Black;

    for (const neighbor of neighbors(maze, start)) {
        if (maze[neighbor.row][neighbor.col] !== Color.Black) {
            const p = path(maze, neighbor, end);
            if (p) {
                return [start, ...p];
            }
        }
    }

    return undefined;
}

const equals = (a: Coord, b: Coord) => a.row === b.row && a.col === b.col;

const neighbors = (maze: Color[][], {row: r, col: c}: Coord) =>
    [
        {row: r - 1, col: c},
        {row: r, col: c + 1},
        {row: r + 1, col: c},
        {row: r, col: c - 1},
    ]
    .filter(({row: nr, col: nc}) =>
        nr >= 0 && nr < maze.length &&
        nc >= 0 && nc < maze[nr].length
    );
