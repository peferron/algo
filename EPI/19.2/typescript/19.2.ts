export interface Cell {
    row: number;
    col: number;
}

export function flip(grid: boolean[][], cell: Cell): void {
    const color = grid[cell.row][cell.col];
    grid[cell.row][cell.col] = !color;

    for (const neighbor of neighbors(grid, cell)) {
        if (grid[neighbor.row][neighbor.col] === color) {
            flip(grid, neighbor);
        }
    }
}

function neighbors(grid: boolean[][], {row, col}: Cell): Cell[] {
    return [
        {row: row - 1, col},
        {row, col: col + 1},
        {row: row + 1, col},
        {row, col: col - 1},
    ].filter(({row: r, col: c}) =>
        r >= 0 && r < grid.length &&
        c >= 0 && c < grid[r].length
    );
}
