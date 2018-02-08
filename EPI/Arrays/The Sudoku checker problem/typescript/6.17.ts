export default function isValid(grid: number[][]): boolean {
    for (let i = 0; i < 9; i += 1) {
        if (!isValidSubgrid(grid, i, i + 1, 0, 9) || !isValidSubgrid(grid, 0, 9, i, i + 1)) {
            return false;
        }
    }

    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            if (!isValidSubgrid(grid, i, i + 3, j, j + 3)) {
                return false;
            }
        }
    }

    return true;
}

function isValidSubgrid(grid: number[][], rowStart: number, rowEnd: number,
    colStart: number, colEnd: number): boolean {

    const set = new Set<number>();

    for (let i = rowStart; i < rowEnd; i += 1) {
        for (let j = colStart; j < colEnd; j += 1) {
            const v = grid[i][j];

            if (v === 0) {
                continue;
            }

            if (set.has(v)) {
                return false;
            }

            set.add(v);
        }
    }

    return true;
}
