export default function permutations<T>(array: T[]): T[][] {
    if (array.length === 0) {
        return [[]];
    }

    const result: T[][] = [];

    for (const [i, v] of array.entries()) {
        // Append all permutations ending with v.
        const others = array.filter((_, j) => i !== j);
        for (const p of permutations(others)) {
            p.push(v);
            result.push(p);
        }
    }

    return result;
}
