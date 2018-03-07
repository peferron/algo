export interface List<T> {
    value: T;
    next?: this;
}

export function mergeIter<T>(a: List<T>, b: List<T>): List<T> {
    const tmpHead: {next?: List<T>} = {};
    let tail = tmpHead;
    let remainingA: List<T> | undefined = a;
    let remainingB: List<T> | undefined = b;

    while (remainingA && remainingB) {
        if (remainingA.value <= remainingB.value) {
            tail.next = remainingA;
            remainingA = remainingA.next;
        } else {
            tail.next = remainingB;
            remainingB = remainingB.next;
        }

        tail = tail.next;
    }

    tail.next = remainingA || remainingB;
    return tmpHead.next!;
}

export function mergeRec<T>(a: List<T>, b: List<T>): List<T> {
    const [low, high] = a.value <= b.value ? [a, b] : [b, a];
    low.next = low.next ? mergeRec(low.next, high) : high;
    return low;
}
