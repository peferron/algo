type CompFn<T> = (a: T, b: T) => number;

const DEFAULT_COMPARE = <T>(a: T, b: T) => a === b ? 0 : a < b ? - 1 : 1;

export default function sort<T>(array: T[], compare = DEFAULT_COMPARE): void {
    sortRec(array, 0, array.length, compare);
}

function sortRec<T>(array: T[], start: number, end: number, compare: CompFn<T>): void {
    const mid = Math.floor(start + (end - start) / 2);

    if (mid === start) {
        return;
    }

    sortRec(array, start, mid, compare);
    sortRec(array, mid, end, compare);
    merge(array, start, mid, end, compare);
}

function merge<T>(array: T[], start: number, mid: number, end: number, compare: CompFn<T>): void {
    const tmp: T[] = [];
    let i = start;
    let j = mid;

    while (tmp.length < end - start) {
        if (i < mid && (j === end || compare(array[i], array[j]) <= 0)) {
            tmp.push(array[i]);
            i += 1;
        } else {
            tmp.push(array[j]);
            j += 1;
        }
    }

    array.splice(start, tmp.length, ...tmp);
}
