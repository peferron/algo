export default function contains(matrix: number[][], value: number): boolean {
    let bottom = matrix.length - 1;
    let left = 0;

    while (bottom >= 0 && left < matrix[0].length) {
        const v  = matrix[bottom][left];

        if (value < v) {
            bottom -= 1;
        } else if (value > v) {
            left += 1;
        } else {
            return true;
        }
    }

    return false;
}
