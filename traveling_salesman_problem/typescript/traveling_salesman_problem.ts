import {AdjacencyMatrix, Graph} from './adjacency_matrix';

export default function shortestTour(g: Graph): number[] {
    const m = new AdjacencyMatrix(g);
    const tour: number[] = [];

    // Repeatedy add the vertex furthest from the tour.
    while (tour.length < g.vertexCount) {
        const {x, index: insertionIndex} = getFurthestVertex(tour, m);
        tour.splice(insertionIndex, 0, x);
    }

    return optimize(tour, m);
}

// Return the vertex furthest from the tour, and the index at which it should be inserted to add the minimum distance.
function getFurthestVertex(tour: number[], m: AdjacencyMatrix): {x: number, index: number} {
    let furthestVertex: number;
    let bestIndex: number;
    let maxAddedDistance = -1;

    for (let x = 0; x < m.m.length; x += 1) {
        if (tour.includes(x)) {
            continue;
        }

        const {index, addedDistance} = getInsertionIndex(x, tour, m);

        if (addedDistance > maxAddedDistance) {
            furthestVertex = x;
            bestIndex = index;
            maxAddedDistance = addedDistance;
        }
    }

    return {x: furthestVertex!, index: bestIndex!};
}

// Return the index at which the vertex should be inserted in the tour to add the minimum distance to the tour.
function getInsertionIndex(x: number, tour: number[], m: AdjacencyMatrix): {index: number, addedDistance: number} {
    let bestIndex: number;
    let minAddedDistance = Infinity;

    for (let i = 0; i < tour.length; i += 1) {
        const j = (i + 1) % tour.length;
        const addedDistance = m.m[i][x] + m.m[x][j] - m.m[i][j];

        if (addedDistance < minAddedDistance) {
            bestIndex = i;
            minAddedDistance = addedDistance;
        }
    }

    return {index: bestIndex!, addedDistance: minAddedDistance};
}

// Return an optimized tour using 2-opt.
function optimize(tour: number[], m: AdjacencyMatrix): number[] {
    while (true) {
        const smallerTour = findSmallerTour(tour, m);
        if (!smallerTour) {
            return tour;
        }
        tour = smallerTour;
    }
}

// Return a smaller tour obtained by swapping two vertices of tour, or undefined if there is no such tour.
function findSmallerTour(tour: number[], m: AdjacencyMatrix): number[] | undefined {
    const distance = m.tourDistance(tour);

    for (let i = 0; i < tour.length - 1; i += 1) {
        for (let j = i + 1; j < tour.length; j += 1) {
            const swappedTour = swap(tour, i, j);
            if (m.tourDistance(swappedTour) < distance) {
                return swappedTour;
            }
        }
    }

    return undefined;
}

// Return a new tour where the positions of the vertices at indexes i and j have been swapped.
function swap(tour: number[], i: number, j: number): number[] {
    return [
        ...tour.slice(0, i),
        ...tour.slice(i, j + 1).reverse(),
        ...tour.slice(j + 1),
    ];
}
