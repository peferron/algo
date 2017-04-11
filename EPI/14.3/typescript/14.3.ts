export interface Occurrence {
    char: string;
    count: number;
}

export default function occurrences(string: String): Occurrence[] {
    const counts = new Map<string, number>();

    for (const char of string) {
        const count = counts.get(char) || 0;
        counts.set(char, count + 1);
    }

    return Array.from(counts, ([char, count]) => ({char, count}))
        .sort((a, b) => a.char.localeCompare(b.char));
}
