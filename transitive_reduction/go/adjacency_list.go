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

func (a AdjacencyList) DepthFirstSearch(start int, late VertexCallback, discovered []bool) {
	if discovered[start] {
		return
	}
	discovered[start] = true
	for _, neighbor := range a[start] {
		a.DepthFirstSearch(neighbor, late, discovered)
	}
	late(start)
}
