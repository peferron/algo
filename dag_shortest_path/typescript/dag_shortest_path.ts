import {AdjacencyList, Graph} from './adjacency_list';
import topologicalSort from './topological_sort';

export type Path = number[] | undefined;

export function shortestPaths(graph: Graph, start: number): Path[] {
    if (!graph.directed) {
        throw new Error('This algorithm only supports directed graphs.');
    }

    const list = new AdjacencyList(graph);
    const sorted = topologicalSort(list);

    // distances[x] is the distance between start and x.
    const distances = new Array(graph.vertexCount).fill(Infinity);
    distances[start] = 0;

    // parents[x] is the vertex that precedes x in the shortest path from start to x.
    const parents = new Array(graph.vertexCount).fill(-1);

    for (let i = sorted.indexOf(start); i < sorted.length; i += 1) {
        const x = sorted[i];

        for (const {y, weight} of list.a[x]) {
            const dxy = distances[x] + weight;
            if (dxy < distances[y]) {
                distances[y] = dxy;
                parents[y] = x;
            }
        }
    }

    return paths(parents, start);
}

function paths(parents: number[], start: number): Path[] {
    return parents.map((_, end) => {
        const reachable = start === end || parents[end] !== -1;
        return reachable ? path(parents, end) : undefined;
    });
}

function path(parents: number[], end: number): Path {
    const result: number[] = [];

    for (let x = end; x !== -1; x = parents[x]) {
        result.push(x);
    }

    result.reverse();
    return result;
}
