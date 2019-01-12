// distance returns the distance between the points p1 and p2.
export function distance(p1, p2) {
    const distanceSquared = p1.reduce((sum, _, dimension) => {
        const delta = p1[dimension] - p2[dimension];
        return sum + delta * delta;
    }, 0);

    return Math.sqrt(distanceSquared);
}

// allPairs returns all the possible pairs of points.
function allPairs(points) {
    const pairs = [];

    for (let i = 0; i < points.length - 1; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
            pairs.push([points[i], points[j]]);
        }
    }

    return pairs;
}

// closest returns the closest pair of points.
function closest(pairs) {
    return pairs.reduce((closestPair, pair) =>
        distance(...pair) < distance(...closestPair) ? pair : closestPair
    );
}

// closestPairBruteForce returns the closest pair of points, using a brute-force algorithm.
export function closestPairBruteForce(points) {
    return closest(allPairs(points));
}

// findPairs1D returns the pairs of points that are potentially less than maxDistance apart, based on their distance
// along dimension.
function findPairs1D(points, maxDistance, dimension) {
    const sortedPoints = points.sort((p1, p2) => p1[dimension] - p2[dimension]);
    const pairs = [];

    for (let i = 0; i < sortedPoints.length - 1; i += 1) {
        for (let j = i + 1; j < sortedPoints.length; j += 1) {
            const pi = points[i];
            const pj = points[j];
            const d = Math.abs(pi[dimension] - pj[dimension]);

            if (d >= maxDistance) {
                break;
            }

            pairs.push([pi, pj]);
        }
    }

    return pairs;
}

// findPairs returns the pairs of points that are potentially less than maxDistance apart, based on their distance along
// dimension, dimension + 1, ..., last dimension.
function findPairs(points, maxDistance, dimension) {
    if (points.length < 4) {
        return allPairs(points);
    }

    const dimensions = points[0].length;
    if (dimension === dimensions - 1) {
        return findPairs1D(points, maxDistance, dimension);
    }

    // Sort points by dimension and split around a median hyperplane.
    const sortedPoints = points.sort((p1, p2) => p1[dimension] - p2[dimension]);
    const mid = Math.floor(points.length / 2);
    const midPoint = sortedPoints[mid];
    const leftPoints = sortedPoints.slice(0, mid);
    const rightPoints = sortedPoints.slice(mid);

    // Solve the problem recursively in the two halves.
    const leftPairs = findPairs(leftPoints, maxDistance, dimension);
    const rightPairs = findPairs(rightPoints, maxDistance, dimension);

    // Find all points lying within maxDistance of the median hyperplane.
    const slabPoints = sortedPoints.filter(p =>
        Math.abs(p[dimension] - midPoint[dimension]) < maxDistance
    );

    // Project the slab points on the median hyperplane and solve the problem recursively in the slab.
    const slabPairs = findPairs(slabPoints, maxDistance, dimension + 1);

    return [...leftPairs, ...rightPairs, ...slabPairs];
}

// closestPair1D returns the closest pair of points, in the special case where the points are one-dimensional. The
// points must be pre-sorted.
function closestPair1D(sortedPoints) {
    let closestPair;
    let closestDistance = Infinity;

    for (let i = 0; i < sortedPoints.length - 1; i += 1) {
        const p1 = sortedPoints[i];
        const p2 = sortedPoints[i + 1];
        const d = distance(p1, p2);

        if (d < closestDistance) {
            closestPair = [p1, p2];
            closestDistance = d;
        }
    }

    return closestPair;
}

// closestPairDivideAndConquer returns the closest pair of points, using a divide-and-conquer algorithm.
export function closestPairDivideAndConquer(points) {
    const sortedPoints = points.sort((p1, p2) => p1[0] - p2[0]);

    const dimensions = points[0].length;
    if (dimensions === 1) {
        return closestPair1D(sortedPoints);
    }

    return closestPairDivideAndConquerRecursive(sortedPoints);
}

// closestPairDivideAndConquerRecursive returns the closest pair of points. The points must be at least two-dimensional,
// and pre-sorted along their first dimension.
function closestPairDivideAndConquerRecursive(sortedPoints) {
    if (sortedPoints.length < 4) {
        return closestPairBruteForce(sortedPoints);
    }

    // Split the points around a median hyperplane.
    const mid = Math.floor(sortedPoints.length / 2);
    const midPoint = sortedPoints[mid];
    const leftPoints = sortedPoints.slice(0, mid);
    const rightPoints = sortedPoints.slice(mid);

    // Solve the problem recursively in the two halves.
    const leftPair = closestPairDivideAndConquerRecursive(leftPoints);
    const rightPair = closestPairDivideAndConquerRecursive(rightPoints);

    // Find all points lying within maxDistance of the median hyperplane.
    const maxDistance = Math.min(distance(...leftPair), distance(...rightPair));
    const slabPoints = sortedPoints.filter(p => Math.abs(p[0] - midPoint[0]) < maxDistance);

    // Project all slab points on the median hyperplane, and find all potential closest pairs.
    const slabPairs = findPairs(slabPoints, maxDistance, 1);

    return closest([leftPair, rightPair, ...slabPairs]);
}
