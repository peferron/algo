export interface Node {
    next?: Node;
}

export function reverse(head: Node): Node {
    let prev: Node | undefined;
    let curr: Node | undefined = head;

    while (curr) {
        // This required annotation seems caused by a limitation in TS type inference.
        const next: Node | undefined = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev!;
}
