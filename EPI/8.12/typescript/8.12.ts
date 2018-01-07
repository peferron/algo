export interface Node {
    value: number;
    next?: this;
}

export function isPalindrome(list: Node): boolean {
    const length = getLength(list);

    if (length < 2) {
        return true;
    }

    const [ai, bi] = getMidIndexes(length);
    const [a, b] = [ai, bi].map(i => getNodeAt(list, i));

    const an = a.next;
    a.next = undefined;
    reverse(list);

    const result = areEqual(a, b);
    reverse(a);
    a.next = an;

    return result;
}

function getLength(list: Node): number {
    let length = 1;

    for (let current = list; current.next; current = current.next) {
        length += 1;
    }

    return length;
}

function getMidIndexes(length: number): [number, number] {
    return [Math.floor(length / 2) - 1, Math.ceil(length / 2)];
}

function getNodeAt(list: Node, i: number): Node {
    let current = list;

    for (let j = 0; j < i; j += 1) {
        current = current.next!;
    }

    return current;
}

function reverse(list: Node): void {
    let current: Node | undefined = list;
    let previous: Node | undefined;

    while (current) {
        const next: Node | undefined = current.next;
        current.next = previous;
        previous = current;
        current = next;
    }
}

function areEqual(a: Node, b: Node): boolean {
    let currentA: Node | undefined = a;
    let currentB: Node | undefined = b;

    while (currentA) {
        if (currentA.value !== currentB!.value) {
            return false;
        }

        currentA = currentA.next;
        currentB = currentB!.next;
    }

    return true;
}
