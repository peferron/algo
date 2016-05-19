export type Point = number[];

export interface Range {
    origin: Point;
    diagonal: Point;
}

const distance = (a: Point, b: Point) => a.reduce((dist, v, i) => dist + Math.pow(b[i] - v, 2), 0);

const nearest = (p: Point, candidate1: Point, candidate2: Point) =>
    distance(p, candidate1) < distance(p, candidate2) ? candidate1 : candidate2;

const inRange = (p: Point, r: Range) => p.every((v, i) => r.origin[i] <= v && v <= r.diagonal[i]);

export class KDTree {
    axis: number;
    point: Point;
    left: KDTree;
    right: KDTree;

    constructor(points: Point[], depth: number = 0) {
        const dimensions = points[0].length;
        this.axis = depth % dimensions;

        points.sort((a, b) => a[this.axis] - b[this.axis]);
        const medianIndex = Math.floor(points.length / 2);

        this.point = points[medianIndex];

        const leftPoints = points.slice(0, medianIndex);
        if (leftPoints.length) {
            this.left = new KDTree(leftPoints, depth + 1);
        }

        const rightPoints = points.slice(medianIndex + 1);
        if (rightPoints.length) {
            this.right = new KDTree(rightPoints, depth + 1);
        }
    }

    nearestNeighbor(point: Point): Point {
        // Start with the splitting point as best nearest neighbor candidate.
        let best = this.point;

        const [subtree, otherSubtree] = point[this.axis] < this.point[this.axis] ?
            [this.left, this.right] : [this.right, this.left];

        // Try to find a nearer neighbor in the subtree that contains the point.
        if (subtree) {
            best = nearest(point, best, subtree.nearestNeighbor(point));
        }

        // Try to find a nearer neighbor in the subtree that does *not* contain the point.
        // This is only possible if the splitting plane is closer to the point than the current best
        // candidate.
        if (otherSubtree) {
            const splittingPlaneDistance = Math.pow(point[this.axis] - this.point[this.axis], 2);
            if (splittingPlaneDistance < distance(point, best)) {
                best = nearest(point, best, otherSubtree.nearestNeighbor(point));
            }
        }

        return best;
    }

    inRange(range: Range): Point[] {
        let points = inRange(this.point, range) ? [this.point] : [];

        // Does range intersect the left side of the splitting plane?
        if (this.left && range.origin[this.axis] <= this.point[this.axis]) {
            points.push(...this.left.inRange(range));
        }

        // Does range intersect the right side of the splitting plane?
        if (this.right && range.diagonal[this.axis] >= this.point[this.axis]) {
            points.push(...this.right.inRange(range));
        }

        return points;
    }
}
