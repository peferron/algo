export default function getKthLargest(values: number[], k: number): number {
    let start = 0;
    let end = values.length - 1;

    while (true) {
        const pi = partition(values, start, end);

        if (pi === k) {
            return values[pi];
        } else if (pi > k) {
            // kth largest value is in the left partition.
            end = pi - 1;
        } else {
            // kth largest value is in the right partition.
            start = pi + 1;
        }
    }
}

function partition(values: number[], start: number, end: number): number {
    let pi = start + Math.floor(Math.random() * (end + 1 - start));
    const pv = values[pi];

    swap(values, pi, start);
    pi = start;

    for (let i = start + 1; i <= end; i += 1) {
        if (values[i] > pv) {
            // Move this value to the left of the pivot.
            swap(values, i, pi + 1);
            swap(values, pi, pi + 1)
            pi += 1;
        }
    }

    return pi;
}

function swap(values: any[], i: number, j: number): void {
    const tmp = values[i];
    values[i] = values[j];
    values[j] = tmp;
}
