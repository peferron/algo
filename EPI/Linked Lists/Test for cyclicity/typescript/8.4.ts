export interface Node {
    next?: Node;
}

export function getFirstNodeInCycle(list: Node): Node | undefined {
    const node = getNodeInCycle(list);
    return node && getFirstNode(list, getCycleLength(node));
}

function getNodeInCycle(list: Node): Node | undefined {
    let slow = list;
    let fast = list;

    while (fast.next && fast.next.next) {
        slow = slow.next!;
        fast = fast.next.next;
        if (slow === fast) {
            return slow;
        }
    }

    return undefined;
}

function getCycleLength(node: Node): number {
    let length = 1;
    let n = node.next!;

    while (n !== node) {
        length += 1;
        n = n.next!;
    }

    return length;
}

function getFirstNode(list: Node, cycleLength: number): Node {
    let first = list;
    let second = list;

    for (let i = 0; i < cycleLength; i += 1) {
        second = second.next!;
    }

    while (first !== second) {
        first = first.next!;
        second = second.next!;
    }

    return first;
}
