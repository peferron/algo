export default function maxWater(heights: number[]): number {
    if (heights.length < 3) {
        return 0;
    }

    const maxHeightIndex = maxIndex(heights);
    const leftWater = trapHalf(0, maxHeightIndex, 1, heights);
    const rightWater = trapHalf(heights.length - 1, maxHeightIndex, -1, heights);
    return leftWater + rightWater;
}

function maxIndex(a: number[]) {
    let max = 0;

    for (const [i, v] of a.entries()) {
        if (v > a[max]) {
            max = i;
        }
    }

    return max;
}

function trapHalf(start: number, end: number, step: number, heights: number[]) {
    let maxHeightSoFar = 0;
    let result = 0;

    for (let i = start; i !== end; i += step) {
        const height = heights[i];
        maxHeightSoFar = Math.max(maxHeightSoFar, height);
        const water = maxHeightSoFar - height;
        result += water;
    }

    return result;
}
