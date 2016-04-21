export interface Point2D {
    x: number;
    y: number;
}

// eql returns whether the points a and b are equal.
const eql = (a: Point2D, b: Point2D) => a.x === b.x && a.y === b.y;

// next return the next convex hull point, going clockwise from prev.
const next = (points: Point2D[], prev: Point2D) =>
    // This could be optimized to use only one pass.
    points.filter(p => !eql(prev, p)).reduce((best, p) => left(prev, best, p) ? p : best);

// left returns whether point is to the left of the directed line that passes through lineFrom
// before lineTo.
const left = (lineFrom: Point2D, lineTo: Point2D, point: Point2D) =>
    // The signed area of the triangle (a, b, c) is half the determinant of the following matrix:
    //     [ ax, ay, 1 ]
    //     [ bx, by, 1 ]
    //     [ cx, cy, 1 ]
    // If the signed area is positive then c lies to the left of the directed line a->b.
    // If the signed area is negative then c lies to the right of the directed line a->b.
    // If the signed area is zero then c lies on the line a-b.
    // The determinant can be calculated with https://en.wikipedia.org/wiki/Rule_of_Sarrus
    (lineFrom.x * lineTo.y + lineTo.x * point.y + point.x * lineFrom.y -
    point.x * lineTo.y - lineFrom.x * point.y - lineTo.x * lineFrom.y) > 0;

// giftWrap2D returns the convex hull of the points, using the gift wrapping algorithm.
export function giftWrap2D(points: Point2D[]): Point2D[] {
    if (points.length <= 3) {
        return points;
    }

    const hull: Point2D[] = [];

    // Start with the left-most point.
    const start = points.reduce((best, p) => p.x < best.x ? p : best);

    for (let p = start; !hull.length || !eql(p, start); p = next(points, p)) {
        hull.push(p);
    }

    return hull;
}

// graham2D returns the convex hull of the points, using the Graham scan algorithm.
export function graham2D(points: Point2D[]): Point2D[] {
    if (points.length <= 3) {
        return points;
    }

    // Start with the bottom-most point. If there are ties, pick the left-most point.
    const start = points.reduce((best, p) =>
        p.y < best.y || p.y === best.y && p.x < best.x ? p : best);

    // Sort the remaining points in increasing order of the angle they and the start point make with
    // the x-axis.
    const ordered = points.filter(p => !eql(start, p)).sort((a, b) => left(start, a, b) ? -1 : 1);

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
    const hull: Point2D[] = [ordered[0], ordered[1]];

    for (let i = 2; i < ordered.length; i++) {
        hull.push(ordered[i]);
        removeClockwiseTurns(hull);
    }

    return hull;
}

function removeClockwiseTurns(hull: Point2D[]) {
    while (!left(hull[hull.length - 3], hull[hull.length - 2], hull[hull.length - 1])) {
        hull.splice(hull.length - 2, 1);
    }
}
