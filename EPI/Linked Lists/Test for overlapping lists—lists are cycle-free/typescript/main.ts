export interface List {
    next?: List;
}

export function firstOverlappingNode(a: List, b: List): List | undefined {
    const {last: aLast, length: aLength} = traverse(a);
    const {last: bLast, length: bLength} = traverse(b);

    // Avoid traversing both lists a second time if they do not overlap.
    if (aLast !== bLast) {
        return undefined;
    }

    let [long, short] = aLength > bLength ? [a, b] : [b, a];

    for (let i = 0; i < Math.abs(aLength - bLength); i += 1) {
        long = long.next!;
    }

    while (long !== short) {
        long = long.next!;
        short = short.next!;
    }

    return long;
}

function traverse(head: List): {last: List, length: number} {
    let last = head;
    let length = 1;

    while (last.next) {
        last = last.next;
        length += 1;
    }

    return {last, length};
}
