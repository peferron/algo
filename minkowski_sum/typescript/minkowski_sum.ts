export interface Point {
    x: number;
    y: number;
}

export type Polygon = Point[];

type Vector = Point;

enum Direction {
    Clockwise,
    CounterClockwise,
    Collinear,
}

// direction returns whether a-b-c forms a counter-clockwise turn, a clockwise turn, or are
// collinear.
const direction = (a: Point, b: Point, c: Point) => {
    // The signed area of the triangle (a, b, c) is half the determinant of the following matrix:
    //     [ ax, ay, 1 ]
    //     [ bx, by, 1 ]
    //     [ cx, cy, 1 ]
    // If the signed area is > 0 then a-b-c is a counter-clockwise turn.
    // If the signed area is < 0 then a-b-c is a clockwise turn.
    // If the signed area is = 0 then a-b-c are collinear.

    // The determinant can be calculated with https://en.wikipedia.org/wiki/Rule_of_Sarrus
    const det = a.x * b.y + b.x * c.y + c.x * a.y - c.x * b.y - a.x * c.y - b.x * a.y;

    return det > 0 ? Direction.CounterClockwise : det < 0 ? Direction.Clockwise : Direction.Collinear;
};

// vectors returns the vectors corresponding to each edge of polygon.
const vectors = (polygon: Polygon) => polygon.map((start, i) => {
    const end = polygon[(i + 1) % polygon.length];
    return {
        x: end.x - start.x,
        y: end.y - start.y,
    };
});

// merge merges the pre-sorted vectors in a and b according to their polar angle.
function merge(a: Vector[], b: Vector[]): Vector[] {
    const origin = {x: 0, y: 0};
    const merged: Vector[] = [];
    let i = 0;
    let j = 0;

    while (i < a.length && j < b.length) {
        if (direction(a[i], origin, b[j]) === Direction.Clockwise) {
            merged.push(a[i]);
            i += 1;
        } else {
            merged.push(b[j]);
            j += 1;
        }
    }

    return merged.concat(a.slice(i)).concat(b.slice(j));
}

// minkowskiSum returns the Minkowski sum of the convex polygons a and b.
// a and b must be expressed as an array of vertices in counter-clockwise order, starting with the
// lowest point in lexicographical order.
export function minkowskiSum(a: Polygon, b: Polygon): Polygon {
    // The first point in lexicographical order of the Minkowski sum is the sum of the corresponding
    // points of a and b.
    const sum = [{
        x: a[0].x + b[0].x,
        y: a[0].y + b[0].y,
    }];

    // We compute the remaining points of the Minkowski sum by moving along the vector of each edge
    // in polar angle order.
    const sortedVectors = merge(vectors(a), vectors(b));
    for (const v of sortedVectors) {
        const prev = sum[sum.length - 1];
        const next = {
            x: prev.x + v.x,
            y: prev.y + v.y,
        };
        sum.push(next);
    }

    // Since we did a complete cycle, the first point is also the last point. Remove it.
    sum.pop();

    return sum;
}
