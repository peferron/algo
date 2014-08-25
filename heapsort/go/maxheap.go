package heapsort

type MaxHeap []int
type node int

type MaxHeapifyFunc func(a []int) MaxHeap

func SlowMaxHeapify(a []int) MaxHeap {
	h := (MaxHeap)(a)
	for i := range h {
		h.bubbleUp(node(i))
	}
	return h
}

func FastMaxHeapify(a []int) MaxHeap {
	h := (MaxHeap)(a)
	for i := parent(h.last()); i >= 0; i-- {
		h.bubbleDown(node(i))
	}
	return h
}

func (h *MaxHeap) DeleteMax() int {
	a := (*h)
	maxValue := a[0]

	l := a.last()
	a[0] = a[l]
	(*h) = (*h)[:l]
	h.bubbleDown(0)

	return maxValue
}

func (h MaxHeap) last() node {
	return node(len(h) - 1)
}

func (h MaxHeap) bubbleUp(n node) {
	if n == 0 {
		return
	}
	if p := parent(n); h[p] < h[n] {
		h.swap(n, p)
		h.bubbleUp(p)
	}
}

func (h MaxHeap) bubbleDown(n node) {
	max := n
	if l := leftChild(n); l <= h.last() && h[l] > h[max] {
		max = l
	}
	if r := rightChild(n); r <= h.last() && h[r] > h[max] {
		max = r
	}

	if max != n {
		h.swap(max, n)
		h.bubbleDown(max)
	}
}

func (h MaxHeap) swap(i, j node) {
	h[i], h[j] = h[j], h[i]
}

func parent(n node) node {
	return (n - 1) / 2
}

func leftChild(n node) node {
	return 2*n + 1
}

func rightChild(n node) node {
	return 2*n + 2
}
