export default function snakifyFilter(s: string): string {
    const chars = [...s];

    const top = chars.filter((_, i) => (i - 1) % 4 === 0);
    const mid = chars.filter((_, i) => i % 2 === 0);
    const bot = chars.filter((_, i) => (i + 1) % 4 === 0);

    return [...top, ...mid, ...bot].join('');
}
