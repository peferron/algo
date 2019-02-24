package binary_search_tree

type Bst struct {
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

func NewBst() *Bst {
	return &Bst{nil}
}

func (t *Bst) Get(key int) (value interface{}, ok bool) {
	if n := find(t.root, key); n != nil {
		return n.data.Value, true
	}
	return 0, false
}

func (t *Bst) Set(key int, value interface{}) {
	t.root = insert(t.root, key, value)
}

func (t *Bst) Del(key int) {
	t.root = remove(t.root, key)
}

func (t *Bst) InOrder() []Data {
	return collect(inOrder, t.root)
}

func (t *Bst) PostOrderRecursive() []Data {
	return collect(postOrderRecursive, t.root)
}

func (t *Bst) PostOrderIterative() []Data {
	return collect(postOrderIterative, t.root)
}

func find(n *node, key int) *node {
	if n == nil || n.data.Key == key {
		return n
	}
	if key < n.data.Key {
		return find(n.left, key)
	}
	return find(n.right, key)
}

func insert(n *node, key int, value interface{}) *node {
	if n == nil {
		return &node{Data{key, value}, nil, nil}
	}
	if key == n.data.Key {
		n.data.Value = value
		return n
	}
	if key < n.data.Key {
		n.left = insert(n.left, key, value)
	} else {
		n.right = insert(n.right, key, value)
	}
	return n
}

func remove(n *node, key int) *node {
	if n == nil {
		return nil
	}
	if key == n.data.Key {
		if n.left == nil {
			return n.right
		}
		if n.right == nil {
			return n.left
		}
		return removeNodeWithTwoChildren(n)
	}
	if key < n.data.Key {
		n.left = remove(n.left, key)
	} else {
		n.right = remove(n.right, key)
	}
	return n
}

func removeNodeWithTwoChildren(n *node) *node {
	var predecessor *node
	n.left, predecessor = removeMax(n.left)
	n.data = predecessor.data
	return n
}

func removeMax(n *node) (root, max *node) {
	if n.right == nil {
		return n.left, n
	}
	n.right, max = removeMax(n.right)
	return n, max
}

func collect(fn func(*node, func(Data)), n *node) []Data {
	a := []Data{}
	fn(n, func(d Data) {
		a = append(a, d)
	})
	return a
}

func inOrder(n *node, cb func(Data)) {
	if n == nil {
		return
	}
	inOrder(n.left, cb)
	cb(n.data)
	inOrder(n.right, cb)
}

func postOrderRecursive(n *node, cb func(Data)) {
	if n == nil {
		return
	}
	postOrderRecursive(n.left, cb)
	postOrderRecursive(n.right, cb)
	cb(n.data)
}

func postOrderIterative(n *node, cb func(Data)) {
	parents := []*node{}
	var child *node

	for {
		if child == nil && n.left != nil {
			parents = append(parents, n)
			n = n.left
		} else if (child == nil || child == n.left) && n.right != nil {
			parents = append(parents, n)
			n = n.right
			child = nil
		} else {
			cb(n.data)
			if len(parents) == 0 {
				return
			}
			child = n
			n = parents[len(parents)-1]
			parents = parents[:len(parents)-1]
		}
	}
}
