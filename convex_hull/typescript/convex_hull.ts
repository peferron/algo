export interface Point {
    x: number;
    y: number;
}

// eql returns whether the points a and b are equal.
const eql = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

enum Side {
    Left,
    Right,
    On,
}

// side returns whether point is to the left, the right, or on the directed line that passes through
// lineFrom before lineTo.
const side = (lineFrom: Point, lineTo: Point, point: Point) => {
    // The signed area of the triangle (a, b, c) is half the determinant of the following matrix:
    //     [ ax, ay, 1 ]
    //     [ bx, by, 1 ]
    //     [ cx, cy, 1 ]
    // If the signed area is > 0 then c lies to the left of the directed line a->b.
    // If the signed area is < 0 then c lies to the right of the directed line a->b.
    // If the signed area is = 0 then c lies on the line a-b.

    // The determinant can be calculated with https://en.wikipedia.org/wiki/Rule_of_Sarrus
    const determinant = lineFrom.x * lineTo.y + lineTo.x * point.y + point.x * lineFrom.y -
        point.x * lineTo.y - lineFrom.x * point.y - lineTo.x * lineFrom.y;
    return determinant > 0 ? Side.Left : determinant < 0 ? Side.Right : Side.On;
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
        .reduce((best, p) => side(prev, best, p) === Side.Left ? p : best);

// graham returns the convex hull of the points, using the Graham scan algorithm.
export function graham(points: Point[]): Point[] {
    if (points.length <= 3) {
        return points;
    }

    // Start with the bottom-most point. If there are ties, pick the left-most point.
    const start = points.reduce((best, p) =>
        p.y < best.y || p.y === best.y && p.x < best.x ? p : best);

    // Sort the remaining points in increasing order of the angle they and the start point make with
    // the x-axis. This could be optimized to use only one pass.
    const ordered = points
        .filter(p => !eql(start, p))
        .sort((a, b) => {
            switch (side(start, a, b)) {
                case Side.Left: return -1;
                case Side.Right: return 1;
                default: return 0;
            }
        });

    // In order to correctly remove the last possible clockwise turns, we need to make a complete
    // cycle.
    ordered.push(start);

    // We could initialize hull as [start, ordered[0]], and then iterate starting from ordered[1].
    // However, we know for sure that ordered[0] is in the convex hull, because it's the point with
    // the lowest angle. So there's no point in running the removeClockwiseTurns function against
    // [start, ordered[0], ordered[1]].
    // This means we can initialize hull as [start, ordered[0], ordered[1]] and then iterate
    // starting from ordered[2]. However, if we do that, at the end of the iteration start will be
    // present twice, as both the first and last element. We could add a hull.pop(), but it's
    // simpler to initialize hull to [ordered[0], ordered[1]] and keep start as the last element.
    const hull: Point[] = [ordered[0], ordered[1]];

    for (let i = 2; i < ordered.length; i++) {
        hull.push(ordered[i]);
        removeClockwiseTurns(hull);
    }

    return hull;
}

function removeClockwiseTurns(hull: Point[]) {
    while (hull.length > 2 &&
        side(hull[hull.length - 3], hull[hull.length - 2], hull[hull.length - 1]) !== Side.Left) {
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
        removeClockwiseTurns(lower);
    }

    const upper = [ordered[n - 1], ordered[n - 2]];
    for (let i = n - 3; i >= 0; i--) {
        upper.push(ordered[i]);
        removeClockwiseTurns(upper);
    }

    // The first and last points in ordered are present in both lower and upper. We need to make
    // sure not to include them twice in the returned convex hull.
    lower.pop();
    upper.pop();
    return lower.concat(upper);
}
