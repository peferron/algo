export interface List {
    next?: List;
}

// export function merge(list: List): void {
//     const even: List = {};
//     let evenLast = even;
//     const odd: List = {};
//     let oddLast = odd;
//     let remaining: List | undefined = list;
//     let remainingHeadIsEven = true;

//     while (remaining) {
//         if (remainingHeadIsEven) {
//             evenLast.next = remaining;
//             evenLast = remaining;
//             remaining = remaining.next;
//             evenLast.next = undefined;
//         } else {
//             oddLast.next = remaining;
//             oddLast = remaining;
//             remaining = remaining.next;
//             oddLast.next = undefined;
//         }
//         remainingHeadIsEven = !remainingHeadIsEven;
//     }

//     evenLast.next = odd.next;
// }

export function merge(list: List): void {
    let lastEven = list;
    let parentOfNextEven = list.next;

    while (parentOfNextEven && parentOfNextEven.next) {
        // Move nextEven from after parentOfNextEven to after lastEven.
        const nextEven = parentOfNextEven.next;
        parentOfNextEven.next = nextEven.next;
        nextEven.next = lastEven.next;
        lastEven.next = nextEven;

        // Update positions for the next iteration.
        lastEven = lastEven.next;
        parentOfNextEven = parentOfNextEven.next;
    }
}
