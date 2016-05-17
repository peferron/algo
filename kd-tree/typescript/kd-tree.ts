export type Point = number[];

const distance = (a: Point, b: Point) => a.reduce((dist, v, i) => dist + Math.pow(b[i] - v, 2), 0);

const nearest = (a: Point, candidate1: Point, candidate2: Point) =>
    distance(a, candidate1) < distance(a, candidate2) ? candidate1 : candidate2;

export const equal = (a: Point, b: Point) => a.every((v, i) => v === b[i]);

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

        const remainingLeft = points.slice(0, medianIndex);
        this.left = remainingLeft.length ? new KDTree(remainingLeft, depth + 1) : null;

        const remainingRight = points.slice(medianIndex + 1);
        this.right = remainingRight.length ? new KDTree(remainingRight, depth + 1) : null;
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
}
