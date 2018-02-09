const PAIRS = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
]);

const SYMBOLS = new Set([...PAIRS.keys(), ...PAIRS.values()]);

export default function isWellFormed(s: string): boolean {
    const opened: string[] = [];

    for (const c of s) {
        if (!SYMBOLS.has(c)) {
            continue;
        }

        if (PAIRS.has(c)) {
            opened.push(c);
        } else if (PAIRS.get(opened.pop()!) !== c) {
            return false;
        }
    }

    return opened.length === 0;
}
