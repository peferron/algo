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

export function shortestPath(graph: Graph, start: number, end: number): number[] | undefined {
    const visited = new Set<number>();
    const parents = new Map<number, number>();
    const distancesToVertex = new Map<number, number>();
    const distancesToEndViaVertex = new Map<number, number>();

    // Set the initial situation.
    distancesToVertex.set(start, 0);
    distancesToEndViaVertex.set(start, euclideanDistance(graph.coordinates[start], graph.coordinates[end]));

    while (true) {
        const x = best(visited, distancesToEndViaVertex);

        if (x < 0) {
            return undefined;
        }

        if (x === end) {
            return ancestors(end, parents);
        }

        for (const y of graph.adjacencyList[x]) {
            if (visited.has(y)) {
                continue;
            }

            const distanceToY = distancesToVertex.get(y);
            const distanceToYViaX = distancesToVertex.get(x)! +
                euclideanDistance(graph.coordinates[x], graph.coordinates[y]);

            if (distanceToY === undefined || distanceToY > distanceToYViaX) {
                parents.set(y, x);
                distancesToVertex.set(y, distanceToYViaX);
                distancesToEndViaVertex.set(y, distanceToYViaX +
                    euclideanDistance(graph.coordinates[y], graph.coordinates[end]));
            }
        }

        visited.add(x);
    }

    return undefined;
}

// best returns the best vertex to visit, or -1 if none. The best vertex to visit is the discovered (but unvisited)
// vertex with the lowest distance to the end vertex.
function best(visited: Set<number>, distancesToEndViaVertex: Map<number, number>): number {
    let bestVertex = -1;
    let minDistance = Infinity;

    for (const [x, distance] of distancesToEndViaVertex.entries()) {
        if (!visited.has(x) && distance < minDistance) {
            bestVertex = x;
            minDistance = distance;
        }
    }

    return bestVertex;
}

// ancestors returns an array containing all the ancestors of x, sorted from x's oldest ancestor to x itself.
function ancestors(x: number, parents: Map<number, number>): number[] {
    // Recursive one-liner: return x === undefined ? [] : [...path(parents.get(x), parents), x];
    const p: number[] = [];
    while (x !== undefined) {
        p.push(x);
        x = parents.get(x)!;
    }
    return p.reverse();
}
