package polygon_simplification

import "math"

type Point struct {
	x, y float64
}

type line [2]Point

func Simplify(chain []Point, maxDistance float64) []Point {
	if len(chain) < 3 {
		return chain
	}

	furthestIndex, furthestDistance := furthestPoint(chain)
	if furthestDistance <= maxDistance {
		// All points on the chain are close to the line; we can eliminate all of them.
		return []Point{chain[0], chain[len(chain)-1]}
	}

	// Add the point at chain[furthestIndex] to the simplified chain. Then recurse on both sides.
	firstHalf := Simplify(chain[:furthestIndex+1], maxDistance)
	secondHalf := Simplify(chain[furthestIndex:], maxDistance)

	// The point at chain[furthestIndex] is the last point of firstHalf, and the first point of
	// secondHalf. We need to make sure to not include it twice when merging.
	return append(firstHalf, secondHalf[1:]...)
}

func furthestPoint(chain []Point) (furthestIndex int, furthestDistance float64) {
	line := line{chain[0], chain[len(chain)-1]}
	for i := 1; i < len(chain)-1; i++ {
		if d := distance(chain[i], line); d > furthestDistance {
			furthestIndex = i
			furthestDistance = d
		}
	}
	return
}

func distance(point Point, line line) float64 {
	// The area of a triangle is A = BH/2, where B is the length of a side and H the perpendicular
	// height from the opposite vertex. If we pick the provided line as a side, then H is the value
	// we want to find!

	// Let's calculate A first. The determinant of the following matrix is equal to 2A:
	// [ point.x,   point.y,   1 ]
	// [ line[0].x, line[0].y, 1 ]
	// [ line[1].x, line[1].y, 1 ]
	doubleA := math.Abs(point.x*line[0].y + line[0].x*line[1].y + line[1].x*point.y -
		line[1].x*line[0].y - point.x*line[1].y - line[0].x*point.y)

	// Then let's calculate B.
	// math.Hypot(dx, dy) is equivalent to √(dx² + dy²).
	b := math.Hypot(line[0].x-line[1].x, line[0].y-line[1].y)

	// A = BH/2 => H = 2A/B
	return doubleA / b
}
