export default function permutations<T>(array: T[]): T[][] {
    if (array.length === 0) {
        return [[]];
    }

    const result: T[][] = [];

    for (const [i, v] of array.entries()) {
        const remaining = array.filter((_, j) => i !== j);
        const remainingPermutations = permutations(remaining);
        const permutationsStartingWithV = remainingPermutations.map(p => [v, ...p]);
        result.push(...permutationsStartingWithV);
    }

    return result;
}
