export interface Node {
    left?: this;
    right?: this;
    next?: this;
}

export function fillNext(root: Node): void {
    for (let rowHead = root; rowHead.left; rowHead = rowHead.left) {
        for (let rowNode: Node | undefined = rowHead; rowNode; rowNode = rowNode.next) {
            rowNode.left!.next = rowNode.right;
            rowNode.right!.next = rowNode.next && rowNode.next!.left;
        }
    }
}
