export interface Node {
    next?: this;
}

export function reverse(head: Node, start: number, end: number): Node {
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
