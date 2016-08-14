package transitive_closure

type AdjacencyList [][]int

func (g AdjacencyList) DepthFirstSearch(start int, callback func(int)) {
	discovered := make([]bool, len(g))
	stack := []int{start}

	for len(stack) > 0 {
		// Pop last vertex.
		x := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if discovered[x] {
			continue
		}

		discovered[x] = true
		stack = append(stack, g[x]...)
		callback(x)
	}
}
