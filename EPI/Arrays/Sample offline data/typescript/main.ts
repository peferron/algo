export default function selectInPlace(array: any[], size: number): void {
    for (let i = 0; i < size; i += 1) {
        const randomIndex = i + Math.floor(Math.random() * (array.length - i));
        swap(array, i, randomIndex);
    }
}

function swap(array: any[], i: number, j: number): void {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}
