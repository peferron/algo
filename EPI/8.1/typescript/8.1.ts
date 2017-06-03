export interface List<T> {
    value: T;
    next?: List<T>;
}

export function mergeIter<T>(a: List<T>, b: List<T>): List<T> {
    let remainingA: List<T> | undefined = a;
    let remainingB: List<T> | undefined = b;
    let tmpHead: {next?: List<T>} = {};
    let tail = tmpHead;

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

    tail!.next = remainingA || remainingB;

    return tmpHead.next!;
}

export function mergeRec<T>(a: List<T>, b: List<T>): List<T> {
    const [low, high] = a.value <= b.value ? [a, b] : [b, a];
    low.next = low.next ? mergeRec(low.next, high) : high;
    return low;
}
