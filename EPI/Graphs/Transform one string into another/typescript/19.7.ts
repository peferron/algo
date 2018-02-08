export default function getProductionLength(from: string, to: string, dict: Set<string>): number {
    if (!dict.has(from)) {
        return -1;
    }

    const queue = [{string: from, length: 1}];
    const visited = new Set<string>();

    while (queue.length > 0) {
        const {string: x, length: l} = queue.shift()!;

        if (x === to) {
            return l;
        }

        visited.add(x);

        for (const y of dict) {
            if (!visited.has(y) && areAdjacent(x, y)) {
                queue.push({string: y, length: l + 1});
            }
        }
    }

    return -1;
}

function areAdjacent(a: string, b: string): boolean {
    const aChars = [...a];
    const bChars = [...b];

    if (aChars.length !== bChars.length) {
        return false;
    }

    let diff = false;

    for (let i = 0; i < aChars.length; i += 1) {
        if (aChars[i] !== bChars[i]) {
            if (diff) {
                return false;
            }

            diff = true;
        }
    }

    return true;
}
