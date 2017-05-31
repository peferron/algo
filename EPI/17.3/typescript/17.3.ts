export default function countTraversals(rows: number, cols: number): number {
    // cache[r][c] is the traversal count for a 2D array with r rows and c columns.
    const cache = Array.from({length: rows + 1}, () => new Array(cols + 1).fill(0));

    // Base case: 2D arrays with only one row or column have only one possible traversal.
    for (let r = 1; r <= rows; r += 1) {
        cache[r][1] = 1;
    }
    for (let c = 1; c <= cols; c += 1) {
        cache[1][c] = 1;
    }

    return countTraversalsRec(rows, cols, cache);
}

function countTraversalsRec(rows: number, cols: number, cache: number[][]): number {
    const cached = cache[rows][cols];

    if (cached > 0) {
        return cached;
    }

    const result = countTraversalsRec(rows - 1, cols, cache) +
        countTraversalsRec(rows, cols - 1, cache);

    cache[rows][cols] = result;

    return result;
}
