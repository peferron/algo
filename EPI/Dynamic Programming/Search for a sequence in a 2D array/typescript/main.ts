type Cell = {i: number, j: number};

export default function contains(grid: number[][], seq: number[]): boolean {
    if (seq.length === 0) {
        return true;
    }

    // failed[i][j] contains k if there is no path starting at {i, j} that retraces the sequence
    // suffix starting at index k.
    const failed = grid.map(row =>
        row.map(() => new Set<number>())
    );

    return grid.some((row, i) =>
        row.some((_, j) => containsRec(grid, seq, 0, {i, j}, failed))
    );
}

function containsRec(grid: number[][], seq: number[], seqStart: number, {i, j}: Cell,
    failed: Set<number>[][]): boolean {

    if (failed[i][j].has(seqStart)) {
        return false;
    }

    if (grid[i][j] === seq[seqStart]) {
        // The first element matches, but what about the remaining elements?

        if (seqStart === seq.length - 1) {
            // There are no remaining elements.
            return true;
        }

        if (neighbors(grid, {i, j}).some(n => containsRec(grid, seq, seqStart + 1, n, failed))) {
            // At least one neighbor can retrace the remaining elements.
            return true;
        }
    }

    // Cache this failure.
    failed[i][j].add(seqStart);
    return false;
}

function neighbors(grid: number[][], {i, j}: Cell): Cell[] {
    return [
        {i: i - 1, j},
        {i: i + 1, j},
        {i, j: j - 1},
        {i, j: j + 1},
    ].filter(n =>
        n.i >= 0 && n.i < grid.length &&
        n.j >= 0 && n.j < grid[n.i].length
    );
}
