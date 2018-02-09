interface Cell {
    row: number;
    col: number;
}

export enum Color {
    WHITE,
    BLACK,
}

export function fillEnclosed(grid: Color[][]): void {
    const visited = grid.map(colors => colors.map(color => color === Color.BLACK));

    grid.forEach((colors, row) => colors.forEach((_, col) => {
        if (row === 0 || row === grid.length - 1 || col === 0 || col === grid[row].length - 1) {
            dfs(visited, {row, col});
        }
    }));

    visited.forEach((values, row) => values.forEach((value, col) => {
        if (!value) {
            grid[row][col] = Color.BLACK;
        }
    }));
}

function dfs(visited: boolean[][], cell: Cell): void {
    if (visited[cell.row][cell.col]) {
        return;
    }

    visited[cell.row][cell.col] = true;

    for (const neighbor of neighbors(visited, cell)) {
        dfs(visited, neighbor);
    }
}

const neighbors = (grid: any[][], {row, col}: Cell) => [
    {row: row - 1, col},
    {row, col: col + 1},
    {row: row + 1, col},
    {row, col: col - 1},
].filter(({row: r, col: c}) =>
    r >= 0 && r < grid.length &&
    c >= 0 && c < grid[r].length
);
