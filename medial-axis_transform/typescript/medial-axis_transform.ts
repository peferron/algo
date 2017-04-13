// In this entire file, `r` is used for row indexes, and `c` for column indexes.

const newMatrix = (rows: number, cols: number) => Array.from({length: rows}, () => new Array(cols));

const mapMatrix = <T, U>(matrix: T[][], fn: (value: T, r: number, c: number) => U) =>
    matrix.map((values, r) => values.map((value, c) => fn(value, r, c)));

// Convenience function to avoid having to check bounds every time we access a pixel neighbor.
const get = <T>(matrix: T[][], r: number, c: number, defaultValue: T) =>
    0 <= r && r < matrix.length && 0 <= c && c < matrix[0].length ? matrix[r][c] : defaultValue;

export function manhattanDistances(pixels: boolean[][]): number[][] {
    const rows = pixels.length;
    const cols = pixels[0].length;

    const distances = newMatrix(rows, cols);
    const distance = (r: number, c: number) => get(distances, r, c, 0);

    // The first grassfire starts from the top left corner.
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            distances[r][c] = pixels[r][c] ?
                1 + Math.min(distance(r - 1, c), distance(r, c - 1)) :
                0;
        }
    }

    // The second grassfire starts from the bottom right corner. Note that we cannot run the two
    // grassfires separately against the input pixels, and then combine the resulting distances
    // using Math.min; it will fail on some edge cases. Consider this example:
    //
    // Input            Top-left         Bottom-right     Combination      But should
    // pixels:          grassfire:       grassfire:       with Math.min:   be instead:
    // .......          .......          .......          .......          .......
    // ...X...          ...1...          ...1...          ...1...          ...1...
    // ..XX...          ..12...          ..21...          ..11...          ..11...
    // .XXXXX.          .12311.          .12321.          .12311.          .12211.
    // ..XXX..          ..122..          ..121..          ..121..          ..121..
    // ...X...          ...1...          ...1...          ...1...          ...1...
    // .......          .......          .......          .......          .......
    //
    // Note how the center point has a distance of 3 instead of 2 (via its top-right neighbor).
    // Running the second grassfire against the output of the first grassfire resolves this issue.
    for (let r = rows - 1; r >= 0; r--) {
        for (let c = cols - 1; c >= 0; c--) {
            distances[r][c] = Math.min(
                distances[r][c],
                1 + Math.min(distance(r + 1, c), distance(r, c + 1))
            );
        }
    }

    return distances;
}

export function skeleton(pixels: boolean[][]): boolean[][] {
    const distances = manhattanDistances(pixels);
    const distance = (r: number, c: number) => get(distances, r, c, 0);

    // We keep the pixels that are on a "ridge". A pixel is on a ridge if it's the local maximum on
    // some direction passing through this point. We consider 4 directions: horizontal, vertical,
    // and the two diagonals.
    return mapMatrix(distances, (d, r, c) =>
        d > distance(r, c - 1) && d > distance(r, c + 1) ||
        d > distance(r - 1, c) && d > distance(r + 1, c) ||
        d > distance(r - 1, c - 1) && d > distance(r + 1, c + 1) ||
        d > distance(r - 1, c + 1) && d > distance(r + 1, c - 1)
    );
}
