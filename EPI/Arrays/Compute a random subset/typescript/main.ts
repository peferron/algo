export default function randomSubset(n: number, k: number): number[] {
    const swaps = new Map<number, number>();
    const subset: number[] = [];

    while (subset.length < k) {
        const lastIndex = n - subset.length - 1;
        const lastValue = swaps.has(lastIndex) ? swaps.get(lastIndex)! : lastIndex;

        const randomIndex = Math.floor(Math.random() * (lastIndex + 1));
        const randomValue = swaps.has(randomIndex) ? swaps.get(randomIndex)! : randomIndex;

        swaps.set(randomIndex, lastValue);
        subset.push(randomValue);
    }

    return subset;
}
