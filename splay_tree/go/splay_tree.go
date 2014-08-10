package splay_tree

type SplayTree struct {
	root *node
}

type Data struct {
	Key   int
	Value interface{}
}

type node struct {
	data  Data
	left  *node
	right *node
}

type dataCallback func(Data)

func NewSplayTree() *SplayTree {
	return &SplayTree{nil}
}

func (t *SplayTree) Get(key int) (value interface{}, ok bool) {
	t.root = splay(t.root, key)
	if t.root == nil || key != t.root.data.Key {
		return 0, false
	}
	return t.root.data.Value, true
}

func (t *SplayTree) Set(key int, value interface{}) {
	t.root = insert(t.root, key, value)
}

func (t *SplayTree) Del(key int) {
	t.root = remove(t.root, key)
}

func (t *SplayTree) All() []Data {
	a := []Data{}
	inOrder(t.root, func(d Data) {
		a = append(a, d)
	})
	return a
}

func insert(n *node, key int, value interface{}) *node {
	n = splay(n, key)
	if n != nil && key == n.data.Key {
		n.data.Value = value
		return n
	}
	newNode := &node{Data{key, value}, nil, nil}
	if n == nil {
		return newNode
	}
	if key < n.data.Key {
		// n.data.Key is the smallest key > key in the tree, which guarantees n.left.data.Key < key.
		newNode.left = n.left
		newNode.right = n
		n.left = nil
	} else {
		// Symmetrical case: n.data.Key is the greatest key < key in the tree, which guarantees
		// n.right.data.Key > key.
		newNode.right = n.right
		newNode.left = n
		n.right = nil
	}
	return newNode
}

func remove(n *node, key int) *node {
	n = splay(n, key)
	if n == nil || key != n.data.Key {
		return n
	}
	if n.left == nil {
		return n.right
	}
	if n.right == nil {
		return n.left
	}
	// n has two children, so after deleting n we have two subtrees: n.left and n.right. Steps:
	// 1. Splay the maximum node of the left subtree. This can be done by simply calling
	//    splay(n.left, key), since we know that key > any key in n.left.
	// 2. The root of left subtree now has no right child, since it's the maximum node of the left
	//    subtree. So we can simply graft the right subtree there.
	l := splay(n.left, key)
	l.right = n.right
	return l
}

// splay performs a top-down splay on the given key, and returns the new root of the tree. If key
// is in the tree, the new root is the node with the key. If key is not in the tree, the new root is
// either the node with the greatest key < key in the tree, or the node with the smallest key > key
// in the tree.
func splay(n *node, key int) *node {
	if n == nil {
		return nil
	}

	var leftRoot, leftLast, rightRoot, rightLast *node

	for {
		if key == n.data.Key {
			break
		}
		if key < n.data.Key {
			if n.left != nil && key < n.left.data.Key {
				// Zig-zig.
				n = rotateRight(n)
			}
			if n.left == nil {
				break
			}
			rightRoot, rightLast = linkRight(rightRoot, rightLast, n)
			n = n.left
		} else {
			if n.right != nil && key > n.right.data.Key {
				// Zig-zig.
				n = rotateLeft(n)
			}
			if n.right == nil {
				break
			}
			leftRoot, leftLast = linkLeft(leftRoot, leftLast, n)
			n = n.right
		}
	}

	// Assemble.
	n.right, _ = linkRight(rightRoot, rightLast, n.right)
	n.left, _ = linkLeft(leftRoot, leftLast, n.left)

	return n
}

func linkLeft(root, last, n *node) (newRoot, newLast *node) {
	if root == nil {
		newRoot = n
	} else {
		newRoot = root
		last.right = n
	}
	newLast = n
	return
}

func linkRight(root, last, n *node) (newRoot, newLast *node) {
	if root == nil {
		newRoot = n
	} else {
		newRoot = root
		last.left = n
	}
	newLast = n
	return
}

func rotateLeft(n *node) *node {
	r := n.right
	n.right = r.left
	r.left = n
	return r
}

func rotateRight(n *node) *node {
	l := n.left
	n.left = l.right
	l.right = n
	return l
}

func inOrder(n *node, cb dataCallback) {
	if n == nil {
		return
	}
	inOrder(n.left, cb)
	cb(n.data)
	inOrder(n.right, cb)
}
