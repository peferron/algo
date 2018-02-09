export interface Node {
    value: number;
    next?: this;
}

export function isPalindrome(head: Node): boolean {
    const mid = middle(head);
    const tail = reverse(mid);
    const result = areEqual(head, tail);
    reverse(tail);
    return result;
}

function middle(list: Node): Node {
    let slow = list;
    let fast = list;

    while (fast.next && fast.next.next) {
        slow = slow.next!;
        fast = fast.next.next;
    }

    return slow;
}

function reverse(list: Node): Node {
    let curr: Node | undefined = list;
    let prev: Node | undefined;

    while (curr) {
        const next: Node | undefined = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev!;
}

function areEqual(a: Node, b: Node): boolean {
    let currA: Node | undefined = a;
    let currB: Node | undefined = b;

    while (currA && currB) {
        if (currA.value !== currB!.value) {
            return false;
        }

        currA = currA.next;
        currB = currB.next;
    }

    return true;
}
