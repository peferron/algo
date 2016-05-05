export interface Point {
    x: number;
    y: number;
}

// eql returns whether the points a and b are equal.
const eql = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

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

// giftWrap returns the convex hull of the points, using the gift wrapping algorithm.
export function giftWrap(points: Point[]): Point[] {
    if (points.length <= 3) {
        return points;
    }

    const hull: Point[] = [];

    // Start with the left-most point.
    const start = points.reduce((best, p) => p.x < best.x ? p : best);

    for (let p = start; !hull.length || !eql(p, start); p = giftWrapNext(points, p)) {
        hull.push(p);
    }

    return hull;
}

// giftWrapNext return the next convex hull point, going clockwise from prev.
const giftWrapNext = (points: Point[], prev: Point) =>
    // This could be optimized to use only one pass.
    points
        .filter(p => !eql(prev, p))
        .reduce((best, p) => direction(prev, best, p) === Direction.Clockwise ? best : p);

// graham returns the convex hull of the points, using the Graham scan algorithm.
export function graham(points: Point[]): Point[] {
    if (points.length <= 3) {
        return points;
    }

    // Start with the first point in lexicographical order. We know that this point must be in the
    // convex hull.
    const start = points.reduce((best, p) =>
        p.x < best.x || p.x === best.x && p.y < best.y ? p : best);

    // Sort the other points by the slope of the line connecting them to start.
    const ordered = points
        .filter(p => !eql(start, p))
        .sort((a, b) => {
            switch (direction(start, a, b)) {
                case Direction.CounterClockwise: return -1;
                case Direction.Clockwise: return 1;
                default: return 0;
            }
        });

    // In order to correctly remove the last possible clockwise turns, we need to make a complete
    // cycle.
    ordered.push(start);

    const hull: Point[] = [];

    for (const point of ordered) {
        hull.push(point);
        removeClockwiseAndCollinearTurns(hull);
    }

    return hull;
}

function removeClockwiseAndCollinearTurns(hull: Point[]) {
    while (hull.length > 2 &&
        direction(hull[hull.length - 3], hull[hull.length - 2], hull[hull.length - 1]) !== Direction.CounterClockwise) {
        hull.splice(hull.length - 2, 1);
    }
}

// monotoneChain returns the convex hull of the points, using the monotone chain algorithm.
export function monotoneChain(points: Point[]): Point[] {
    const n = points.length;

    if (n <= 3) {
        return points;
    }

    // Sort the points lexicographically, i.e. by x first and y second.
    const ordered = points.sort((a, b) => (a.x - b.x) || (a.y - b.y));

    const lower = [ordered[0], ordered[1]];
    for (let i = 2; i < n; i++) {
        lower.push(ordered[i]);
        removeClockwiseAndCollinearTurns(lower);
    }

    const upper = [ordered[n - 1], ordered[n - 2]];
    for (let i = n - 3; i >= 0; i--) {
        upper.push(ordered[i]);
        removeClockwiseAndCollinearTurns(upper);
    }

    // The first and last points in ordered are present in both lower and upper. We need to make
    // sure not to include them twice in the returned convex hull.
    lower.pop();
    upper.pop();
    return lower.concat(upper);
}
