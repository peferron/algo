package pairing_heap

type PairingHeap struct {
	root *Node
}

type Node struct {
	Key      int
	Value    interface{}
	children []*Node
}

func NewPairingHeap() *PairingHeap {
	return &PairingHeap{nil}
}

func (h *PairingHeap) Empty() bool {
	return h.root == nil
}

func (h *PairingHeap) Insert(key int, value interface{}) *Node {
	newNode := &Node{key, value, nil}
	h.root = merge(h.root, newNode)
	return newNode
}

func (h *PairingHeap) DeleteMin() *Node {
	n := h.root
	h.root = mergePairsTwoPass(h.root.children)
	return n
}

func (h *PairingHeap) Merge(a *PairingHeap) {
	h.root = merge(h.root, a.root)
}

func merge(a, b *Node) *Node {
	if a == nil {
		return b
	}
	if b == nil {
		return a
	}
	if a.Key < b.Key {
		a.children = append(a.children, b)
		return a
	}
	b.children = append(b.children, a)
	return b
}

func mergePairsTwoPass(a []*Node) *Node {
	switch len(a) {
	case 0:
		return nil
	case 1:
		return a[0]
	default:
		return merge(merge(a[0], a[1]), mergePairsTwoPass(a[2:]))
	}
}

// mergePairsTwoPass is the recommended merging function, but the ones below are also correct.

// http://www.imdb.com/title/tt0119116/
func mergeMultiPass(a []*Node) *Node {
	l := len(a)
	switch l {
	case 0:
		return nil
	case 1:
		return a[0]
	default:
		return merge(mergeMultiPass(a[:l/2]), mergeMultiPass(a[l/2:]))
	}
}

func mergeMultiPass2(a []*Node) *Node {
	if len(a) < 1 {
		return nil
	}
	// Use the slice as a FIFO queue: extract two trees from the front of the queue, merge them,
	// then put the resulting tree at the end of the queue. Repeat until only one tree remains.
	for len(a) > 1 {
		a = append(a[2:], merge(a[0], a[1]))
	}
	return a[0]
}

// Performs worse than mergePairsTwoPass.
func mergeRightToLeft(a []*Node) *Node {
	if len(a) < 1 {
		return nil
	}
	return merge(a[0], mergeRightToLeft(a[1:]))
}

// Performs *much* worse than mergePairsTwoPass.
func mergeLeftToRight(a []*Node) *Node {
	l := len(a)
	if l < 1 {
		return nil
	}
	return merge(mergeLeftToRight(a[:l-1]), a[l-1])
}
