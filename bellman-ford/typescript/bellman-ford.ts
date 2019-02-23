export interface Graph {
    vertexCount: number;
    directed: boolean;
    edges: Edge[];
}

export interface Edge {
    x: number;
    y: number;
    weight: number;
}

export type Path = number[] | undefined;

export function shortestPath(graph: Graph, start: number, end: number): Path {
    const distances = new Array(graph.vertexCount).fill(Infinity);
    const parents = new Array(graph.vertexCount).fill(-1);

    distances[start] = 0;

    // |V| - 1 iterations should be enough to reach the final distances. If the distances are getting updated past
    // that, then it means the graph has a negative cycle.
    for (let i = 0; i < graph.vertexCount; i += 1) {
        let updated = false;

        for (const {x, y, weight} of graph.edges) {
            const dxy = distances[x] + weight;
            if (dxy < distances[y]) {
                distances[y] = dxy;
                parents[y] = x;
                updated = true;
            }
        }

        if (!updated) {
            // This iteration didn't update the distances. This means the distances are final, and the shortest path can
            // be returned.
            const reachable = start === end || parents[end] !== -1;
            return reachable ? path(end, parents) : undefined;
        }
    }

    // |V| iterations ran without finalizing the distances. This means the graph has a negative cycle.
    throw new Error('This graph contains a negative cycle');
}

function path(end: number, parents: number[]): Path {
    const result: number[] = [];

    for (let x = end; x !== -1; x = parents[x]) {
        result.push(x);
    }

    result.reverse();
    return result;
}
