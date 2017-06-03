export interface List<T> {
    value: T;
    next?: List<T>;
}

export function sort<T>(head: List<T>): List<T> {
    if (!head.next) {
        return head;
    }
    const mid = split(head);
    return merge(sort(head), sort(mid));
}

function split<T>(head: List<T>): List<T> {
    let beforeSlow = head;
    let slow = head.next!;
    let fast: List<T> | undefined = head.next;

    while (fast && fast.next) {
        beforeSlow = slow;
        slow = slow.next!;
        fast = fast.next.next;
    }

    beforeSlow.next = undefined;
    return slow;
}

// See 8.1 for an iterative version, as well as a more concise but not stable recursive version.
function merge<T>(a: List<T>, b: List<T>): List<T> {
    if (a.value <= b.value) {
        a.next = a.next ? merge(a.next, b) : b;
        return a;
    } else {
        b.next = b.next ? merge(a, b.next) : a;
        return b;
    }
}
