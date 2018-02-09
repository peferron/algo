export default function firstIndexOf<T>(array: T[], element: T): number {
    let left = 0;
    let right = array.length - 1;

    while (right >= left) {
        const mid = Math.floor(left + (right - left) / 2);
        if (array[mid] >= element) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    const index = right + 1;
    return index >= 0 && index < array.length && array[index] === element ? index : -1;
}
