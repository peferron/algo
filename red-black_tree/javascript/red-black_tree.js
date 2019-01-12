export const RED = 'red';
export const BLACK = 'black';

export default class Tree {
    constructor() {
        this.root = undefined;
    }

    has(key) {
        const n = find(this.root, key);
        return n && n.key === key;
    }

    get(key) {
        const n = find(this.root, key);
        if (n && n.key === key) {
            return n.value;
        }
    }

    set(key, value) {
        const n = find(this.root, key);
        if (n && n.key === key) {
            n.value = value;
        } else {
            const newNode = new Node(key, value);
            insert(n, newNode);
            this.root = newNode.root();
        }
    }

    del(key) {
        const n = find(this.root, key);
        if (!n || n.key !== key) {
            return;
        }
        const anotherNode = n.parent || n.left || n.right;
        del(n);
        if (anotherNode) {
            this.root = anotherNode.root();
        } else {
            this.root = undefined;
        }
    }

    all() {
        const a = [];
        inOrder(this.root, n => {
            a.push({key: n.key, value: n.value});
        });
        return a;
    }
}

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.color = RED;
        this.parent = undefined;
        this.left = undefined;
        this.right = undefined;
    }

    root() {
        return this.parent ? this.parent.root() : this;
    }

    grandparent() {
        return this.parent && this.parent.parent;
    }

    uncle() {
        return this.parent && this.parent.sibling();
    }

    sibling() {
        if (!this.parent) {
            return undefined;
        }
        return this.parent.left === this ? this.parent.right : this.parent.left;
    }
}

function find(n, key) {
    if (!n) {
        return undefined;
    }
    if (key === n.key) {
        return n;
    }
    const child = key < n.key ? n.left : n.right;
    return child ? find(child, key) : n;
}

function rotateLeft(n) {
    const r = n.right;
    replace(n, r);
    n.right = r.left;
    if (n.right) {
        n.right.parent = n;
    }
    r.left = n;
    n.parent = r;
}

function rotateRight(n) {
    const l = n.left;
    replace(n, l);
    n.left = l.right;
    if (n.left) {
        n.left.parent = n;
    }
    l.right = n;
    n.parent = l;
}

function inOrderSuccessor(n) {
    return findMin(n.right);
}

function findMin(n) {
    return n.left ? findMin(n.left) : n;
}

function replace(n, r) {
    // n cannot be undefined, but r can be.
    if (n.parent) {
        if (n.parent.left === n) {
            n.parent.left = r;
        } else {
            n.parent.right = r;
        }
    }
    if (r) {
        r.parent = n.parent;
    }
}

function red(n) {
    return n && n.color === RED;
}

function black(n) {
    return n && n.color === BLACK;
}

function blackOrundefined(n) {
    return !n || n.color === BLACK;
}

function inOrder(n, callback) {
    if (!n) {
        return;
    }
    inOrder(n.left, callback);
    callback(n);
    inOrder(n.right, callback);
}

function insert(p, n) {
    if (p) {
        n.parent = p;
        if (n.key < p.key) {
            p.left = n;
        } else {
            p.right = n;
        }
    }
    insertCase1(n);
}

// Case 1:
// - Preconditions: none.
// - Case handled: the new node is the root.
// - Issue: root violation (the root must be black).
// - Solution: color the node black. Done.
function insertCase1(n) {
    if (!n.parent) {
        n.color = BLACK;
        return;
    }
    insertCase2(n);
}

// Case 2:
// - Preconditions: The new node is not the root.
// - Case handled: The parent is black.
// - Issue: none.
// - Solution: do nothing. Done.
function insertCase2(n) {
    if (black(n.parent)) {
        return;
    }
    insertCase3(n);
}

// Case 3:
// - Preconditions: The new node is not the root, and the parent is red.
// - Case handled: The uncle is red.
// - Issue: red violation (a red parent cannot have a red child).
// - Solution: We know the grandparent is black, because it has red children. Recoloring the parent and uncle black, and
//   the grandparent red, resolves the red violation and does not create any black violation. However, the grandparent
//   being now red might cause a root violation or a red violation. Running the first insert case on the grandparent
//   will fix these violations recursively.
function insertCase3(n) {
    const u = n.uncle();
    if (red(u)) {
        n.parent.color = BLACK;
        u.color = BLACK;
        const g = n.grandparent();
        g.color = RED;
        insertCase1(g);
        return;
    }
    insertCase4(n);
}

// Case 4: "zig-zag"
// - Preconditions: The new node is not the root, the parent is red, and the uncle is black or undefined.
// - Case handled: the new node and its parent are opposite type children (i.e. one is a left child and the other is a
//   right child).
// - Issue: red violation.
// - Solution: rotate the parent away from the new node to get the tree in the "zig-zig" shape (the new node and its
//   parent are same type children) needed for case 5.
function insertCase4(n) {
    const g = n.grandparent();
    if (n === n.parent.right && n.parent === g.left) {
        rotateLeft(n.parent);
        insertCase5(n.left);
        return;
    }
    if (n === n.parent.left && n.parent === g.right) {
        rotateRight(n.parent);
        insertCase5(n.right);
        return;
    }
    insertCase5(n);
}

// Case 5: "zig-zig"
// - Preconditions: The new node is not the root, the parent is red, the uncle is black or undefined, and the new node
//   and its parent are same type children (i.e. they are both left children or both right children).
// - Case handled: all.
// - Issue: red violation.
// - Solution: recolor the parent black, recolor the grandparent red, then rotate the grandparent away from the parent.
//   This fixes the red-violation and does not create any black violation. Done.
function insertCase5(n) {
    const g = n.grandparent();
    g.color = RED;
    n.parent.color = BLACK;
    if (n.parent === g.left) {
        rotateRight(g);
    } else {
        rotateLeft(g);
    }
}

function del(n) {
    // The first step is similar to ordinary binary search tree deletion: if the node to be removed has two children,
    // exchange its value with its in-order successor (or predecessor), which is guaranteed to have at most one child.
    // Then delete the successor.
    if (n.left && n.right) {
        const s = inOrderSuccessor(n);
        n.key = s.key;
        n.value = s.value;
        s.key = 'pending_delete';
        del(s);
        return;
    }
    deleteNodeWithOneChild(n);
}

function deleteNodeWithOneChild(n) {
    const c = n.left || n.right;

    // Case 0a: the node to delete is red.
    // => Solution: replace the node by its child (can be undefined). Done.
    if (red(n)) {
        replace(n, c);
        return;
    }

    // Case 0b: the node to delete is black, and its child is red.
    // => Solution: replace the node by its child, and recolor the child black. Done.
    if (red(c)) {
        replace(n, c);
        c.color = BLACK;
        return;
    }

    // Case 0c: the node to delete is black, and its child is black.
    // => Solution: replace the node by its child, then call deleteCase1 on the child to rebalance the tree. Done.
    if (c) {
        replace(n, c);
        deleteCase1(c);
        return;
    }

    // Case 0d: the node to delete is black, and has no children.
    // => Solution: run the delete case 1 on the node to rebalance the tree. The node will still have no children after
    // this rebalancing. Then delete the node. Done.
    deleteCase1(n);
    replace(n, undefined);
}

// Case 1:
// - Preconditions: the node is black, and the sibling is not undefined (because the node's original parent was black,
//   so if the sibling was undefined there would have been a black violation).
// - Case handled: the node is the root.
// - Issue: none.
// - Solution: do nothing. Done.
function deleteCase1(n) {
    if (n && !n.parent) {
        return;
    }
    deleteCase2(n);
}

// Case 2:
// - Preconditions: the node is black and is not the root, and the sibling is not undefined.
// - Case handled: the sibling is red.
// - Issue: black violation. The node's original parent was black, so removing it caused the paths passing through the
//   node to have one less black node than the others.
// - Solution: we know the parent is black, because it has a red child. Recolor the parent red, the sibling black, then
//   rotate the parent away from the sibling. The tree is now in the shape needed for the delete case 3.
function deleteCase2(n) {
    const s = n.sibling();
    if (red(s)) {
        n.parent.color = RED;
        s.color = BLACK;
        if (s === n.parent.left) {
            rotateRight(n.parent);
        } else {
            rotateLeft(n.parent);
        }
    }
    deleteCase3(n);
}

// Case 3:
// - Preconditions: the node is black and is not the root, and the sibling is black.
// - Case handled: the parent is black and the sibling's children are black or undefined.
// - Issue: same black violation as explained in case 2.
// - Solution: Recolor the sibling red. This fixes the black violation between the node and its sibling. However it
//   pushes the issue up by one level - now, the paths passing through the parent have one less black node than the
//   others. Running the first delete case against the parent will fix this violation recursively.
function deleteCase3(n) {
    if (black(n.parent)) {
        const s = n.sibling();
        if (blackOrundefined(s.left) && blackOrundefined(s.right)) {
            s.color = RED;
            deleteCase1(n.parent);
            return;
        }
    }
    deleteCase4(n);
}

// Case 4:
// - Preconditions: the node is black and is not the root, the sibling is black, and not [the parent is black and the
//   sibling's children are black or undefined].
// - Case handled: the parent is red and the sibling's children are black or undefined.
// - Issue: same black violation as explained in case 2.
// - Solution: Recolor the parent black and the sibling red. This increases the number of black nodes on paths going
//   through the node by one, bringing it back to normal. The paths going through the sibling are not affected, since
//   now it's simply the parent that is black instead of the sibling. Done.
function deleteCase4(n) {
    if (red(n.parent)) {
        const s = n.sibling();
        if (blackOrundefined(s.left) && blackOrundefined(s.right)) {
            n.parent.color = BLACK;
            s.color = RED;
            return;
        }
    }
    deleteCase5(n);
}

// Case 5:
// - Preconditions: the node is black and is not the root, the sibling is black, and at least one of the sibling's
//   children is red.
// - Case handled: one of the sibling's children is red while the other is black or undefined, and the node is a same
//   type child as the sibling's red child.
// - Issue: same black violation as explained in case 2.
// - Solution: Recolor the sibling red, and the sibling's red child black. Then rotate the sibling away from the red
//   child. The tree is now in the shape needed for delete case 6.
function deleteCase5(n) {
    const s = n.sibling();
    if (red(s.left) && blackOrundefined(s.right) && n === n.parent.left) {
        s.color = RED;
        s.left.color = BLACK;
        rotateRight(s);
    } else if (red(s.right) && blackOrundefined(s.left) && n === n.parent.right) {
        s.color = RED;
        s.right.color = BLACK;
        rotateLeft(s);
    }
    deleteCase6(n);
}

// Case 6:
// - Preconditions: the node is black and is not the root, the sibling is black, and the sibling's child of the opposite
//   type of the node is red (the other sibling's child can be any color).
// - Case handled: all.
// - Solution: Recolor the sibling with the color of its parent, recolor the parent black, and make the sibling's red
//   child black. Then rotate the parent away from the sibling. The sibling is now the new parent and has the same color
//   as the old parent, so there is no red violation. And the node has one more black ancestor now, so the black
//   violation is fixed. Done.
function deleteCase6(n) {
    const s = n.sibling();
    s.color = n.parent.color;
    n.parent.color = BLACK;
    if (n === n.parent.left) {
        s.right.color = BLACK;
        rotateLeft(n.parent);
    } else {
        s.left.color = BLACK;
        rotateRight(n.parent);
    }
}

// function log(n, indent) {
//     indent = indent || 0;
//     var spaces = new Array(indent + 1).join(' ');
//     console.log(spaces + str(n));
//     if (n) {
//         log(n.left, indent + 2);
//         log(n.right, indent + 2);
//     }
// }

// function str(n) {
//     if (!n) {
//         return '[nil]';
//     }
//     return '[' + n.color + '] ' + n.key + ': ' + n.value +
//         ' (parent: ' + (n.parent ? n.parent.key : 'nil') + ')';
// }
