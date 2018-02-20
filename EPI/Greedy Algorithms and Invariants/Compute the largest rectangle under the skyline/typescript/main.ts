export default function maxArea(heights: number[]): number {
    let maxArea = 0;
    const stack = [{index: -1, height: 0}];

    for (const [i, h] of [...heights, 0].entries()) {
        while (stack.length > 1 && h <= stack[stack.length - 1].height) {
            const {height} = stack.pop()!;
            const right = i - 1;
            const left = stack[stack.length - 1].index + 1;
            const area = (right - left + 1) * height;
            maxArea = Math.max(maxArea, area);
        }

        stack.push({index: i, height: h});
    }

    return maxArea;
}
