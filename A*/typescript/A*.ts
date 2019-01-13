import MinHeap from './min_heap';

export interface Coordinates {
    x: number;
    y: number;
}

export interface Graph {
    coordinates: Coordinates[];
    adjacencyList: number[][];
}

const euclideanDistance = (a: Coordinates, b: Coordinates) =>
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const path = (end: number, parents: Map<number, number>) => {
    // Recursive one-liner:
    // return isNaN(end) ? [] : [...path(parents.get(end), parents), end];

    const p: number[] = [];
    while (!isNaN(end)) {
        p.push(end);
        end = parents.get(end)!;
    }
    return p.reverse();
};

export function shortestPath(graph: Graph, start: number, end: number): number[] | undefined {
    const processed = new Set<number>();

    const pendingSet = new Set<number>();
    const pendingHeap = new MinHeap<number>((a, b) =>
        distancesToEndViaPoint.get(a)! - distancesToEndViaPoint.get(b)!);

    const parents = new Map<number, number>();

    const distancesToPoint = new Map<number, number>();
    const distancesToEndViaPoint = new Map<number, number>();

    // Set the initial situation.
    pendingSet.add(start);
    pendingHeap.add(start);
    distancesToPoint.set(start, 0);

    while (pendingSet.size) {
        const point = pendingHeap.deleteMin();
        pendingSet.delete(point);

        if (point === end) {
            return path(end, parents);
        }

        processed.add(point);

        for (const neighbor of graph.adjacencyList[point]) {
            if (processed.has(neighbor)) {
                continue;
            }

            if (!pendingSet.has(neighbor)) {
                pendingSet.add(neighbor);
                pendingHeap.add(neighbor);
            }

            const oldDistanceToNeighbor = distancesToPoint.get(neighbor);
            const newDistanceToNeighbor = distancesToPoint.get(point)! +
                euclideanDistance(graph.coordinates[point], graph.coordinates[neighbor]);

            if (oldDistanceToNeighbor === undefined ||
                newDistanceToNeighbor < oldDistanceToNeighbor) {
                parents.set(neighbor, point);
                distancesToPoint.set(neighbor, newDistanceToNeighbor);
                distancesToEndViaPoint.set(neighbor, newDistanceToNeighbor +
                    euclideanDistance(graph.coordinates[neighbor], graph.coordinates[end]));
            }
        }
    }

    return undefined;
}
