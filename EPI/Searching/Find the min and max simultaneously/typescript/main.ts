export default function extremes(values: number[]): {min?: number, max?: number} {
    if (values.length === 0) {
        return {};
    }

    const result = {min: values[0], max: values[0]};

    for (let i = 1; i < values.length; i += 2) {
        const left = values[i];
        const right = i + 1 < values.length ? values[i + 1] : left;
        const [pairMin, pairMax] = left < right ? [left, right] : [right, left];
        result.min = Math.min(result.min, pairMin);
        result.max = Math.max(result.max, pairMax);
    }

    return result;
}
