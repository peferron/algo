import MinHeap from './heap';

interface Node {
    frequency: number;
    index?: number;
    left?: this;
    right?: this;
}

export default function encode(frequencies: number[]): string[] {
    const minHeap = new MinHeap<Node>((a, b) => a.frequency - b.frequency);

    for (const [index, frequency] of frequencies.entries()) {
        minHeap.insert({frequency, index});
    }

    while (minHeap.size > 1) {
        const left = minHeap.removeMin()!;
        const right = minHeap.removeMin()!;
        minHeap.insert({frequency: left.frequency + right.frequency, left, right});
    }

    const root = minHeap.removeMin()!;
    const codes = new Array<string>(frequencies.length);
    fillCodes(root, '', codes);
    return codes;
}

function fillCodes(node: Node, prefix: string, codes: string[]): void {
    if (node.left && node.right) {
        fillCodes(node.left, prefix + '0', codes);
        fillCodes(node.right, prefix + '1', codes);
    } else {
        codes[node.index!] = prefix;
    }
}
