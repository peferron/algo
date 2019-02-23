import {AdjacencyList, Graph} from './adjacency_list';
import topologicalSort from './topological_sort';

export type Path = number[] | undefined;

export function shortestPath(graph: Graph, start: number, end: number): Path {
    if (!graph.directed) {
        throw new Error('This algorithm only supports directed graphs.');
    }

    const list = new AdjacencyList(graph);
    const sorted = topologicalSort(list);

    // distances[x] is the distance between start and x.
    const distances = new Array(list.a.length).fill(Infinity);
    distances[start] = 0;

    // parents[x] is the vertex that precedes x in the shortest path from start to x.
    const parents = new Array(list.a.length).fill(-1);

    // To change the algorithm to compute shortest paths from start to all other vertices, replace endIndex with
    // list.a.length.
    const endIndex = sorted.indexOf(end);

    for (let i = sorted.indexOf(start); i < endIndex; i += 1) {
        const x = sorted[i];

        for (const {y, weight} of list.a[x]) {
            const dxy = distances[x] + weight;
            if (dxy < distances[y]) {
                distances[y] = dxy;
                parents[y] = x;
            }
        }
    }

    const reachable = start === end || parents[end] !== -1;
    return reachable ? path(parents, end) : undefined;
}

function path(parents: number[], end: number): Path {
    const result: number[] = [];

    for (let x = end; x !== -1; x = parents[x]) {
        result.push(x);
    }

    result.reverse();
    return result;
}
