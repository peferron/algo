export default function maxWaterIndexes(heights: number[]): {left: number, right: number} {
    let left = 0;
    let right = heights.length - 1;

    let best = {left, right};
    let bestArea = 0;

    while (left < right) {
        const leftHeight = heights[left];
        const rightHeight = heights[right];
        const area = Math.min(leftHeight, rightHeight) * (right - left);

        if (area > bestArea) {
            best = {left, right};
            bestArea = area;
        }

        if (leftHeight <= rightHeight) {
            left += 1;
        }

        if (leftHeight >= rightHeight) {
            right -= 1;
        }
    }

    return best;
}
