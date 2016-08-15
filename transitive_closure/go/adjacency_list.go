package transitive_closure

type AdjacencyList [][]int

func NewAdjacencyList(length int) AdjacencyList {
	a := make(AdjacencyList, length)

	for x := range a {
		a[x] = []int{}
	}

	return a
}

func (a AdjacencyList) DepthFirstSearch(start int, callback func(int)) {
	discovered := make([]bool, len(a))
	stack := []int{start}

	for len(stack) > 0 {
		// Pop last vertex.
		x := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if discovered[x] {
			continue
		}

		discovered[x] = true
		stack = append(stack, a[x]...)
		callback(x)
	}
}
