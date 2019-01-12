const COUNTER_CLOCKWISE = 'counter-clockwise';
const CLOCKWISE = 'clockwise';
const COLLINEAR = 'collinear';

const direction = (a, b, c) => {
    // The signed area of the triangle (a, b, c) is half the determinant of the following matrix:
    //     [ ax, ay, 1 ]
    //     [ bx, by, 1 ]
    //     [ cx, cy, 1 ]
    // If the signed area is > 0 then a-b-c is a counter-clockwise turn.
    // If the signed area is < 0 then a-b-c is a clockwise turn.
    // If the signed area is = 0 then a-b-c are collinear.
    const det = a.x * b.y + b.x * c.y + c.x * a.y - c.x * b.y - a.x * c.y - b.x * a.y;
    return det > 0 ? COUNTER_CLOCKWISE : det < 0 ? CLOCKWISE : COLLINEAR;
};

const inTriangle = (point, a, b, c) =>
    direction(a, b, point) === COUNTER_CLOCKWISE &&
    direction(b, c, point) === COUNTER_CLOCKWISE &&
    direction(c, a, point) === COUNTER_CLOCKWISE;

function deleteFirst(set) {
    const value = set.values().next().value;
    set.delete(value);
    return value;
}

function some(set, test) {
    for (const value of set) {
        if (test(value)) {
            return true;
        }
    }
    return false;
}

class Point {
    constructor({x, y}) {
        this.x = x;
        this.y = y;
        this.diagonals = new Set();
    }

    isEar(reflexPoints) {
        return this.convex() && !some(reflexPoints, p => inTriangle(p, this.prev, this, this.next));
    }

    convex() {
        return direction(this.prev, this, this.next) === COUNTER_CLOCKWISE;
    }

    reflex() {
        return direction(this.prev, this, this.next) === CLOCKWISE;
    }

    delete() {
        this.prev.next = this.next;
        this.next.prev = this.prev;
    }

    opposite(diagonal) {
        return diagonal[0] === this ? diagonal[1] : diagonal[0];
    }

    raw() {
        return {x: this.x, y: this.y};
    }

    static link(points) {
        for (const [i, point] of points.entries()) {
            point.prev = points[(i - 1 + points.length) % points.length];
            point.next = points[(i + 1) % points.length];
        }
    }

    static from(polygon) {
        const points = polygon.map(coordinates => new Point(coordinates));
        Point.link(points);
        return points;
    }

    static diagonals(points) {
        const diagonals = new Set();
        for (const point of points) {
            for (const diagonal of point.diagonals) {
                diagonals.add(diagonal);
            }
        }
        return [...diagonals];
    }

    static rawDiagonals(points) {
        return Point.diagonals(points).map(d => d.map(p => p.raw()));
    }
}

// polygon must be a simple polygon without holes, expressed as an array of points sorted in counter-clockwise order.
export function triangulate(polygon) {
    const points = Point.from(polygon);
    triangulatePoints(points);
    return Point.rawDiagonals(points);
}

function triangulatePoints(points) {
    const reflexPoints = new Set(points.filter(p => p.reflex()));
    const earPoints = new Set(points.filter(p => p.isEar(reflexPoints)));

    // Stop clipping ears when the remaining polygon is a triangle.
    for (let n = points.length; n > 3; n -= 1) {
        const earPoint = deleteFirst(earPoints);
        earPoint.delete();

        const diagonal = [earPoint.prev, earPoint.next];
        earPoint.prev.diagonals.add(diagonal);
        earPoint.next.diagonals.add(diagonal);

        for (const neighbor of diagonal) {
            if (!neighbor.reflex()) {
                reflexPoints.delete(neighbor);
            }

            if (neighbor.isEar(reflexPoints)) {
                earPoints.add(neighbor);
            } else {
                earPoints.delete(neighbor);
            }
        }
    }

    // Restore prev & next.
    Point.link(points);
}

// polygon must be a simple polygon without holes, expressed as an array of points sorted in counter-clockwise order.
export function partition(polygon) {
    const points = Point.from(polygon);
    triangulatePoints(points);
    removeNonEssentialDiagonals(points);
    return Point.rawDiagonals(points);
}

function removeNonEssentialDiagonals(points) {
    // General note: there are n-3 diagonals in total for n points, and a diagonal belongs to only 2 points, so
    // iterating through the diagonals of a point takes amortized constant time.

    const essential = (diagonal, point) => {
        const diagonals = [...point.diagonals];
        const i = diagonals.indexOf(diagonal);
        const prevDiagonal = diagonals[i - 1] || [point, point.prev];
        const nextDiagonal = diagonals[i + 1] || [point, point.next];
        return direction(point.opposite(prevDiagonal), point, point.opposite(nextDiagonal)) === CLOCKWISE;
    };

    const essentialDiagonals = new Set();

    for (const point of points) {
        for (const diagonal of point.diagonals) {
            if (essentialDiagonals.has(diagonal)) {
                continue;
            }

            if (point.convex()) {
                const opposite = point.opposite(diagonal);
                if (essential(diagonal, opposite)) {
                    essentialDiagonals.add(diagonal);
                } else {
                    point.diagonals.delete(diagonal);
                    opposite.diagonals.delete(diagonal);
                }
            } else if (essential(diagonal, point)) {
                essentialDiagonals.add(diagonal);
            }
        }
    }
}
