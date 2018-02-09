export default function indexOfMin<T>(array: T[]): number {
    let left = 0;
    let right = array.length - 1;

    while (right - left > 1) {
        const mid = left + Math.floor((right - left + 1) / 2);

        if (array[left] > array[mid]) {
            right = mid;
        } else {
            left = mid;
        }
    }

    return array[left] > array[right] ? right : 0;
}
