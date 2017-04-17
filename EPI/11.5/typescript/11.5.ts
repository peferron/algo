import Heap from './heap';

export default function medians(values: number[]): number[] {
    const left = new Heap<number>((a, b) => b - a);
    const right = new Heap<number>((a, b) => a - b);
    const medians: number[] = [];

    for (const v of values) {
        if (left.size === 0) {
            left.push(v);
        } else {
            const m = medians[medians.length - 1];

            if (v < m) {
                left.push(v);
            } else {
                right.push(v);
            }

            rebalance(left, right);
        }

        medians.push(median(left, right));
    }

    return medians;
}

function rebalance<T>(a: Heap<T>, b: Heap<T>): void {
    if (a.size > b.size + 1) {
        b.push(a.pop()!);
    } else if (a.size + 1 < b.size) {
        a.push(b.pop()!);
    }
}

function median(left: Heap<number>, right: Heap<number>): number {
    if (left.size > right.size) {
        return left.peek()!;
    }

    if (left.size < right.size) {
        return right.peek()!;
    }

    return left.peek()! / 2 + right.peek()! / 2;
}
