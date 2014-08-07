package binary_search_tree

type Bst struct {
	root *node
}

type Data struct {
	key   string
	value int
}

type node struct {
	data  Data
	left  *node
	right *node
}

type dataCallback func(Data)

func NewBst() *Bst {
	return &Bst{nil}
}

func (t *Bst) Get(key string) (value int, ok bool) {
	if n := find(t.root, key); n != nil {
		return n.data.value, true
	}
	return 0, false
}

func (t *Bst) Set(key string, value int) {
	t.root = insert(t.root, key, value)
}

func (t *Bst) Del(key string) {
	t.root = remove(t.root, key)
}

func (t *Bst) All() []Data {
	a := []Data{}
	inOrder(t.root, func(d Data) {
		a = append(a, d)
	})
	return a
}

func find(n *node, key string) *node {
	if n == nil || n.data.key == key {
		return n
	}
	if key < n.data.key {
		return find(n.left, key)
	}
	return find(n.right, key)
}

func insert(n *node, key string, value int) *node {
	if n == nil {
		return &node{Data{key, value}, nil, nil}
	}
	if key == n.data.key {
		n.data.value = value
		return n
	}
	if key < n.data.key {
		n.left = insert(n.left, key, value)
	} else {
		n.right = insert(n.right, key, value)
	}
	return n
}

func remove(n *node, key string) *node {
	if n == nil {
		return nil
	}
	if key == n.data.key {
		if n.left == nil {
			return n.right
		}
		if n.right == nil {
			return n.left
		}
		return removeNodeWithTwoChildren(n)
	}
	if key < n.data.key {
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

func inOrder(n *node, cb dataCallback) {
	if n == nil {
		return
	}
	inOrder(n.left, cb)
	cb(n.data)
	inOrder(n.right, cb)
}
