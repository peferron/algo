export interface Digest {
    start: number;
    end: number;
}

export function digest(strings: string[], keywords: Set<string>): Digest | undefined {
    let result: Digest | undefined;
    const counts = new Map<string, number>();
    let start = 0;
    let end = -1;

    while (true) {
        if (counts.size === keywords.size) {
            if (!result || result.end - result.start > end - start) {
                result = {start, end};
            }
            const removed = strings[start];
            update(counts, keywords, removed, -1);
            start += 1;
        } else {
            end += 1;
            if (end < strings.length) {
                const added = strings[end];
                update(counts, keywords, added, 1);
            } else {
                break;
            }
        }
    }

    return result;
}

function update(counts: Map<string, number>, keywords: Set<String>, string: string, delta: number): void {
    if (!keywords.has(string)) {
        return;
    }

    const count = (counts.get(string) || 0) + delta;

    if (count > 0) {
        counts.set(string, count);
    } else {
        counts.delete(string);
    }
}
