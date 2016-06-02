package polygon_simplification

import (
	"reflect"
	"testing"
)

var tests = []struct {
	chain       []Point
	maxDistance float64
	simplified  []Point
}{
	{
		[]Point{},
		1,
		[]Point{},
	},
	{
		[]Point{
			Point{x: 0, y: 0},
		},
		1,
		[]Point{
			Point{x: 0, y: 0},
		},
	},
	{
		[]Point{
			Point{x: 0, y: 0},
			Point{x: 10, y: 2},
		},
		1,
		[]Point{
			Point{x: 0, y: 0},
			Point{x: 10, y: 2},
		},
	},
	{
		[]Point{
			Point{x: 0, y: 0},
			Point{x: 5, y: 2},
			Point{x: 10, y: 2},
		},
		1,
		[]Point{
			Point{x: 0, y: 0},
			Point{x: 10, y: 2},
		},
	},
	{
		[]Point{
			Point{x: 0, y: 0},
			Point{x: 5, y: 3},
			Point{x: 10, y: 2},
		},
		1,
		[]Point{
			Point{x: 0, y: 0},
			Point{x: 5, y: 3},
			Point{x: 10, y: 2},
		},
	},
	{
		[]Point{
			Point{x: 0, y: 0},
			Point{x: 5, y: 3},
			Point{x: 10, y: 2},
		},
		2,
		[]Point{
			Point{x: 0, y: 0},
			Point{x: 10, y: 2},
		},
	},
	{
		[]Point{
			Point{1, 0},
			Point{2, 0},
			Point{3, 1},
			Point{3, 2},
			Point{2, 3},
		},
		0,
		[]Point{
			Point{1, 0},
			Point{2, 0},
			Point{3, 1},
			Point{3, 2},
			Point{2, 3},
		},
	},
	{
		[]Point{
			Point{1, 0},
			Point{2, 0},
			Point{3, 1},
			Point{3, 2},
			Point{2, 3},
		},
		1,
		[]Point{
			Point{1, 0},
			Point{3, 1},
			Point{2, 3},
		},
	},
	{
		[]Point{
			Point{1, 0},
			Point{2, 0},
			Point{3, 1},
			Point{3, 2},
			Point{2, 3},
			Point{1, 3},
			Point{0, 2},
			Point{0, 1},
		},
		1,
		[]Point{
			Point{1, 0},
			Point{3, 2},
			Point{1, 3},
			Point{0, 1},
		},
	},
	{
		[]Point{
			Point{1, 0},
			Point{2, 0},
			Point{3, 1},
			Point{3, 2},
			Point{2, 3},
			Point{1, 3},
			Point{0, 2},
			Point{0, 1},
		},
		2,
		[]Point{
			Point{1, 0},
			Point{3, 2},
			Point{0, 1},
		},
	},
}

func Test(t *testing.T) {
	for _, test := range tests {
		simplified := Simplify(test.chain, test.maxDistance)
		if !reflect.DeepEqual(simplified, test.simplified) {
			t.Fatalf("For input chain %v and max distance %f, "+
				"expected simplified chain to be %v, but was %v",
				test.chain, test.maxDistance, test.simplified, simplified)
		}
	}
}
