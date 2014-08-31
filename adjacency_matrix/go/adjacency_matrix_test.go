package adjacency_matrix

import (
	"reflect"
	"testing"
)

var info = Info{
	6,
	[]Edge{
		Edge{0, 1},
		Edge{0, 4},
		Edge{0, 5},
		Edge{1, 2},
		Edge{1, 4},
		Edge{2, 3},
		Edge{3, 4},
	},
}

func TestConstruct(t *testing.T) {
	m := NewAdjacencyMatrix(info)
	expected := &AdjacencyMatrix{
		[]bool{false, true, false, false, true, true},
		[]bool{true, false, true, false, true, false},
		[]bool{false, true, false, true, false, false},
		[]bool{false, false, true, false, true, false},
		[]bool{true, true, false, true, false, false},
		[]bool{true, false, false, false, false, false},
	}
	if !reflect.DeepEqual(m, expected) {
		t.Errorf("For info %+v, expected matrix to be %v, but was %v", info, expected, m)
	}
}

func TestBreadthFirstSearch(t *testing.T) {
	vertices := []int{}
	NewAdjacencyMatrix(info).BreadthFirstSearch(0, func(x int) {
		vertices = append(vertices, x)
	})

	if expected := []int{0, 1, 4, 5, 2, 3}; !reflect.DeepEqual(vertices, expected) {
		t.Errorf("For info %+v, expected breadth-first search order to be %v, but was %v",
			info, expected, vertices)
	}
}

func TestDepthFirstSearch(t *testing.T) {
	vertices := []int{}
	NewAdjacencyMatrix(info).DepthFirstSearch(0, func(x int) {
		vertices = append(vertices, x)
	})

	if expected := []int{0, 1, 2, 3, 4, 5}; !reflect.DeepEqual(vertices, expected) {
		t.Errorf("For info %+v, expected depth-first search order to be %v, but was %v",
			info, expected, vertices)
	}
}
