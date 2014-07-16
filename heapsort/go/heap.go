package heapsort

const none node = -1

type node int
type Heap []int

// Exported

func NewHeap(a []int) *Heap {
	h := &Heap{}
	for _, v := range a {
		h.insert(v)
	}
	return h
}

func FasterNewHeap(a []int) *Heap {
	h := make(Heap, len(a))
	copy(h, a)

	for i := len(a) / 2; i >= 0; i-- {
		h.bubbleDown(node(i))
	}
	return &h
}

func (h *Heap) RemoveRoot() int {
	rootValue := h.value(0)

	last := h.last()
	lastValue := h.value(last)
	(*h) = (*h)[:last]

	if last > 0 {
		h.setValue(0, lastValue)
		h.bubbleDown(0)
	}

	return rootValue
}

// Non-exported

func (h *Heap) value(n node) int {
	return (*h)[n]
}

func (h *Heap) setValue(n node, v int) {
	(*h)[n] = v
}

func (h *Heap) last() node {
	return node(len(*h) - 1)
}

func (h *Heap) parent(n node) node {
	if n == 0 {
		return none
	}
	return (n - 1) / 2
}

func (h *Heap) children(n node) (left node, right node) {
	left = 2*n + 1
	if left > h.last() {
		left = none
	}

	right = 2*n + 2
	if right > h.last() {
		right = none
	}

	return
}

func (h *Heap) insert(v int) {
	*h = append(*h, v)
	h.bubbleUp(h.last())
}

func (h *Heap) bubbleUp(n node) {
	if p := h.parent(n); p != none && h.value(p) > h.value(n) {
		h.swap(n, p)
		h.bubbleUp(p)
	}
}

func (h *Heap) bubbleDown(n node) {
	left, right := h.children(n)

	min := n
	if left != none && h.value(left) < h.value(min) {
		min = left
	}
	if right != none && h.value(right) < h.value(min) {
		min = right
	}

	if min != n {
		h.swap(min, n)
		h.bubbleDown(min)
	}
}

func (h *Heap) swap(i, j node) {
	t := h.value(i)
	h.setValue(i, h.value(j))
	h.setValue(j, t)
}
