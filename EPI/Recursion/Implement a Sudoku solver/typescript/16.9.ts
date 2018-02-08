export default function solve(grid: number[][]): boolean {
    return solveRec(grid, 0, 0);
}

function solveRec(grid: number[][], row: number, col: number): boolean {
    if (row >= grid.length) {
        // The grid has been filled with valid values.
        return true;
    }

    if (grid[row][col] > 0) {
        // The current cell is pre-filled.
        return solveRecNext(grid, row, col);
    }

    for (let candidate = 1; candidate <= grid.length; candidate += 1) {
        if (isValid(grid, row, col, candidate)) {
            grid[row][col] = candidate;
            if (solveRecNext(grid, row, col)) {
                // A solution was found using the current candidate.
                return true;
            }
        }
    }

    // No solution was found using any candidate.
    // Reset the current cell so that future calls do not mistakenly believe it to be pre-filled.
    grid[row][col] = 0;

    return false;
}

function solveRecNext(grid: number[][], row: number, col: number): boolean {
    return col < grid.length - 1 ? solveRec(grid, row, col + 1) : solveRec(grid, row + 1, 0);
}

function isValid(grid: number[][], row: number, col: number, candidate: number): boolean {
    const m = Math.sqrt(grid.length);

    return !contains(grid, row, 0, 1, grid.length, candidate) &&
        !contains(grid, 0, col, grid.length, 1, candidate) &&
        !contains(grid, row - row % m, col - col % m, m, m, candidate);
}

function contains(grid: number[][], startRow: number, startCol: number,
    rowCount: number, colCount: number, value: number): boolean {

    for (let row = startRow; row < startRow + rowCount; row += 1) {
        for (let col = startCol; col < startCol + colCount; col += 1) {
            if (grid[row][col] === value) {
                return true;
            }
        }
    }

    return false;
}
