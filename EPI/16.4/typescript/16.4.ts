export default function powerSet<T>(set: T[]): T[][] {
    const length = Math.pow(2, set.length);
    return Array.from({length}, (_, i) => subset(set, i));
}

const subset = <T>(set: T[], vector: number) => set.filter((_, i) => contains(vector, i));

const contains = (vector: number, i: number) => ((vector >> i) & 1) === 1;
