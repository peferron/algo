export interface Node {
    value: number;
    next?: this;
}

export function isPalindrome(head: Node): boolean {
    const mid = middle(head);
    const tail = reverse(mid);
    // If the list has an even number of elements, tail has 1 more element than head, so testing
    // equality doesn't work; we need to test instead that head is a prefix of tail.
    const result = startsWith(tail, head);
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

function startsWith(list: Node, prefix: Node): boolean {
    let currList: Node | undefined = list;
    let currPrefix: Node | undefined = prefix;

    while (currPrefix) {
        if (!currList || currList.value !== currPrefix.value) {
            return false;
        }

        currList = currList.next;
        currPrefix = currPrefix.next;
    }

    return true;
}
