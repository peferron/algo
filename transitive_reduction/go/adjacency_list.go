package transitive_reduction

type AdjacencyList [][]int
type VertexCallback func(int)

func NewAdjacencyList(length int) AdjacencyList {
	a := make(AdjacencyList, length)

	for x := range a {
		a[x] = []int{}
	}

	return a
}

func (a AdjacencyList) Transpose() AdjacencyList {
	t := make(AdjacencyList, len(a))

	for x, neighbors := range a {
		for _, y := range neighbors {
			t[y] = append(t[y], x)
		}
	}

	return t
}

func (a AdjacencyList) DepthFirstSearch(x int, lateCallback VertexCallback) {
	discovered := make([]bool, len(a))
	dfs(a, discovered, x, lateCallback)
}

func dfs(a AdjacencyList, discovered []bool, x int, lateCallback VertexCallback) {
	if discovered[x] {
		return
	}
	discovered[x] = true
	for _, y := range a[x] {
		dfs(a, discovered, y, lateCallback)
	}
	lateCallback(x)
}
