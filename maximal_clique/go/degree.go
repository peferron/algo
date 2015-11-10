package maximal_clique

import "sort"

type vertices []vertex

type vertex struct {
	x      int
	degree int
}

func newVertices(g Graph) vertices {
	v := make(vertices, g.VertexCount)
	for x := range v {
		v[x].x = x
	}

	for _, edge := range g.Edges {
		v[edge.X].degree++
		v[edge.Y].degree++
	}

	return v
}

func (v vertices) Len() int {
	return len(v)
}

func (v vertices) Less(i, j int) bool {
	// We are sorting by decreasing degree.
	// i should be before j if the degree of i is greater than the degree of j.
	return v[i].degree > v[j].degree
}

func (v vertices) Swap(i, j int) {
	v[i], v[j] = v[j], v[i]
}

func (v vertices) xs() []int {
	xs := make([]int, len(v))
	for i, vertex := range v {
		xs[i] = vertex.x
	}
	return xs
}

func verticesSortedByDecreasingDegree(g Graph) []int {
	v := newVertices(g)
	sort.Sort(v)
	return v.xs()
}
