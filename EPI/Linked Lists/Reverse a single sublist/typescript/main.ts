export interface Node {
    next?: this;
}

// Reverses the nodes from `start` to `end` inclusive (1-indexed).
export function reverseRange(head: Node, start: number, end: number): Node {
    const tmpHead: Node = {next: head};
    let beforeStartNode = tmpHead;

    for (let i = 1; i < start; i += 1) {
        beforeStartNode = beforeStartNode.next!;
    }

    const startNode = beforeStartNode.next!;

    for (let i = start; i < end; i += 1) {
        // Move the next node to the beginning of the sublist.
        const next = startNode.next!;
        startNode.next = next.next;
        next.next = beforeStartNode.next;
        beforeStartNode.next = next;
    }

    return tmpHead.next!;
}

// Reverses the nodes from `start` to `end` inclusive (1-indexed).
// Alternative implementation.
export function reverseRange2(head: Node, start: number, end: number): Node {
    const tmpHead: Node = {next: head};
    let beforeStartNode = tmpHead;

    for (let i = 1; i < start; i += 1) {
        beforeStartNode = beforeStartNode.next!;
    }

    beforeStartNode.next = reverseFirst(beforeStartNode.next!, end - start + 1);
    return tmpHead.next!;
}

// Reverses the first `count` nodes.
function reverseFirst(head: Node, count: number): Node {
    let prev: Node | undefined;
    let curr: Node | undefined = head;

    for (let i = 0; i < count; i += 1) {
        const next: Node | undefined = curr!.next;
        curr!.next = prev;
        prev = curr;
        curr = next;
    }

    head.next = curr;
    return prev!;
}
