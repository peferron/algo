export function spiralOrderingShort<T>(array: T[][]): T[] {
    const result: T[] = [];

    for (let offset = 0; offset <= Math.floor((array.length - 1) / 2); offset += 1) {
        for (let c = offset; c <= array.length - 1 - offset; c += 1) {
            result.push(array[offset][c]);
        }

        for (let r = offset + 1; r <= array.length - 1 - offset; r += 1) {
            result.push(array[r][array.length - 1 - offset]);
        }

        for (let c = array.length - 2 - offset; c >= offset; c -= 1) {
            result.push(array[array.length - 1 - offset][c]);
        }

        for (let r = array.length - 2 - offset; r >= offset + 1; r -= 1) {
            result.push(array[r][offset]);
        }
    }

    return result;
}

enum Direction {
    Right,
    Down,
    Left,
    Up,
}

// This function also works on rectangular 2D arrays.
export function spiralOrderingLong<T>(array: T[][]): T[] {
    if (array.length === 0) {
        return [];
    }

    let sr = 0; // Start row.
    let er = array.length - 1; // End row.
    let sc = 0; // Start column.
    let ec = array[0].length - 1; // End column.
    let r = 0; // Current row.
    let c = 0; // Current column.
    let direction = Direction.Right;
    const result: T[] = [];

    while (sr <= er && sc <= ec) {
        result.push(array[r][c]);

        switch (direction) {
            case Direction.Right:
                if (c < ec) {
                    c += 1;
                } else {
                    sr += 1;
                    direction = Direction.Down;
                    r += 1;
                }
                break;

            case Direction.Down:
                if (r < er) {
                    r += 1;
                } else {
                    ec -= 1;
                    direction = Direction.Left;
                    c -= 1;
                }
                break;

            case Direction.Left:
                if (c > sc) {
                    c -= 1;
                } else {
                    er -= 1;
                    direction = Direction.Up;
                    r -= 1;
                }
                break;

            case Direction.Up:
                if (r > sr) {
                    r -= 1;
                } else {
                    sc += 1;
                    direction = Direction.Right;
                    c += 1;
                }
                break;
        }
    }

    return result;
}
