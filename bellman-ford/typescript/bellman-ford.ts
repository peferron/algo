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

    for (let i = 0; i < graph.vertexCount - 1; i += 1) {
        for (const {x, y, weight} of graph.edges) {
            const dxy = distances[x] + weight;
            if (dxy < distances[y]) {
                distances[y] = dxy;
                parents[y] = x;
            }
        }
    }

    for (const {x, y, weight} of graph.edges) {
        if (distances[x] + weight < distances[y]) {
            throw new Error('This graph contains a negative cycle');
        }
    }

    const reachable = start === end || parents[end] !== -1;
    return reachable ? path(end, parents) : undefined;
}

function path(end: number, parents: number[]): Path {
    const result: number[] = [];

    for (let x = end; x !== -1; x = parents[x]) {
        result.push(x);
    }

    result.reverse();
    return result;
}
