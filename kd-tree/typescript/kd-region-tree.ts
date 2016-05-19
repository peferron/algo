import {Point} from './kd-tree';

export type Region = Point[];

// inRegion returns whether point is inside region.
function inRegion(point: Point, region: Region): boolean {
    if (point.length !== 2) {
        throw new Error('This algorithm only works in 2 dimensions.');
    }

    // We trace a ray originating from point and progressing along the x-axis. If this ray
    // intersects an odd number of region edges, then point is in region. Otherwise, point is
    // outside region.

    return region.reduce((inside, p1, i) => {
        const p2 = region[(i + 1) % region.length];

        // See http://geomalgorithms.com/a03-_inclusion.html for the list of rules.

        // Rule #3: Exclude horizontal edges.
        if (p2[1] == p1[1]) {
            return inside;
        }

        // Rule #1: Upward edges include their starting endpoint, and exclude their final endpoint.
        if (p2[1] > p1[1] && !(p1[1] <= point[1] && point[1] < p2[1])) {
            return inside;
        }

        // Rule #2: Downward edges exclude their starting endpoint, and include their final endpoint.
        if (p1[1] > p2[1] && !(p2[1] <= point[1] && point[1] < p1[1])) {
            return inside;
        }

        // Rule #4: The intersection point must be strictly right of point.
        const intersectionX = p1[0] + (p2[0] - p1[0]) * (point[1] - p1[1]) / (p2[1] - p1[1]);
        if (intersectionX <= point[0]) {
            return inside;
        }

        // We've got an intersection. Toggle the value!
        return !inside;
    }, false);
}

// KDRegionTree is a variant of KDTree where the leaf nodes, instead of being undefined, hold the
// list of regions they can potentially intersect with.
export class KDRegionTree {
    axis: number;
    point: Point;
    left: KDRegionTree | Region[];
    right: KDRegionTree | Region[];

    constructor(points: Point[], regions: Region[], depth: number = 0) {
        const dimensions = points[0].length;
        this.axis = depth % dimensions;

        points.sort((a, b) => a[this.axis] - b[this.axis]);
        const medianIndex = Math.floor(points.length / 2);

        this.point = points[medianIndex];

        const leftPoints = points.slice(0, medianIndex);
        const leftRegions = regions.filter(r =>
            r.some(p => p[this.axis] < this.point[this.axis])
        );
        this.left = leftPoints.length ?
            new KDRegionTree(leftPoints, leftRegions, depth + 1) :
            leftRegions;

        const rightPoints = points.slice(medianIndex + 1);
        const rightRegions = regions.filter(r =>
            r.some(p => p[this.axis] >= this.point[this.axis])
        );
        this.right = rightPoints.length ?
            new KDRegionTree(rightPoints, rightRegions, depth + 1) :
            rightRegions;
    }

    region(point: Point): Region {
        const child = point[this.axis] < this.point[this.axis] ? this.left : this.right;

        if (child instanceof KDRegionTree) {
            return child.region(point);
        } else {
            return child.find(region => inRegion(point, region));
        }
    }
}
