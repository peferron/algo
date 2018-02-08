export interface List {
    next?: List;
}

export function removeLast(list: List, k: number): List | undefined {
    let left: List | undefined;
    let right = list;

    for (let rightIndex = 0; right.next && rightIndex < k; rightIndex += 1) {
        right = right.next;
    }

    while (right.next) {
        left = left ? left.next : list;
        right = right.next;
    }

    if (left) {
        // The node to remove is not the head.
        left.next = left.next!.next;
        return list;
    }

    // Remove the head.
    return list.next;
}
