export default function getProductionLength(from: string, to: string, dict: Set<string>): number {
    if (!dict.has(from)) {
        return -1;
    }

    if (from === to) {
        return 1;
    }

    const queue = [{string: from, length: 1}];

    for (let i = 0; i < queue.length; i += 1) {
        const q = queue[i];

        for (const d of dict) {
            if (areAdjacent(q.string, d)) {
                if (d === to) {
                    return q.length + 1;
                }
                queue.push({string: d, length: q.length + 1});
                dict.delete(d);
            }
        }
    }

    return -1;
}

function areAdjacent(a: string, b: string): boolean {
    const aIter = a[Symbol.iterator]();
    const bIter = b[Symbol.iterator]();
    let diffs = 0;

    while (true) {
        const aNext = aIter.next();
        const bNext = bIter.next();

        if (aNext.done || bNext.done) {
            return aNext.done === bNext.done;
        }

        if (aNext.value !== bNext.value) {
            diffs += 1;
            if (diffs > 1) {
                return false;
            }
        }
    }
}
