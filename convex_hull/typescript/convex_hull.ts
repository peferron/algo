export interface Point2D {
    x: number;
    y: number;
}

const eql = (a: Point2D, b: Point2D) => a.x === b.x && a.y === b.y;

const next = (points: Point2D[], prev: Point2D) =>
    // This could be optimized to use only one pass.
    points.filter(p => !eql(prev, p)).reduce((best, p) => left(prev, best, p) ? p : best);

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

export function giftWrap2D(points: Point2D[]): Point2D[] {
    if (points.length <= 3) {
        return points;
    }

    const hull: Point2D[] = [];
    const start = points.reduce((best, p) => p.x < best.x ? p : best);

    for (let p = start; !hull.length || !eql(p, start); p = next(points, p)) {
        hull.push(p);
    }

    return hull;
}
