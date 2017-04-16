export default function removeAndReplace(array: string[], size: number): number {
    const {aCount, bCount} = removeB(array, size);
    replaceA(array, size - bCount, aCount);
    return size - bCount + aCount;
}

function removeB(array: string[], size: number): {aCount: number, bCount: number} {
    let aCount = 0;
    let bCount = 0;

    for (let i = 0; i < size; i += 1) {
        const char = array[i];
        if (char === 'b') {
            bCount += 1;
        } else {
            array[i - bCount] = char;
            if (char === 'a') {
                aCount += 1;
            }
        }
    }

    return {aCount, bCount};
}

function replaceA(array: string[], size: number, aCount: number): void {
    let remainingACount = aCount;

    for (let i = size - 1; i >= 0 && remainingACount > 0; i -= 1) {
        const char = array[i];

        if (char === 'a') {
            array[i + remainingACount] = 'd';
            array[i + remainingACount - 1] = 'd';
            remainingACount -= 1;
        } else {
            array[i + remainingACount] = char;
        }
    }
}
