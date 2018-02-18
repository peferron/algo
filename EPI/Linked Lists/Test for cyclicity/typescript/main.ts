export interface Node {
    next?: Node;
}

export function getFirstNodeInCycle(list: Node): Node | undefined {
    const node = getAnyNodeInCycle(list);

    if (!node) {
        return undefined;
    }

    const length = getCycleLength(node);
    return getFirstNodeInCycleWithLength(list, length);
}

function getAnyNodeInCycle(list: Node): Node | undefined {
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

    for (let n = node.next!; n !== node; n = n.next!) {
        length += 1;
    }

    return length;
}

function getFirstNodeInCycleWithLength(list: Node, cycleLength: number): Node {
    let slow = list;
    let fast = list;

    for (let i = 0; i < cycleLength; i += 1) {
        fast = fast.next!;
    }

    while (slow !== fast) {
        slow = slow.next!;
        fast = fast.next!;
    }

    return slow;
}
