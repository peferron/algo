export default function maxArea(heights: number[]): number {
    let result = 0;
    const pillars: {index: number, height: number}[] = [];
    heights.push(0); // To flush the last building

    for (const [i, h] of heights.entries()) {
        while (pillars.length && h <= pillars[pillars.length - 1].height) {
            const {height} = pillars.pop()!;
            const start = pillars.length === 0 ? 0 : pillars[pillars.length - 1].index + 1; // Inclusive
            const end = i; // Exclusive
            const area = (end - start) * height;
            result = Math.max(result, area);
        }

        pillars.push({index: i, height: h});
    }

    return result;
}
