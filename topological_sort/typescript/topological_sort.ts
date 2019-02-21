import {Graph, AdjacencyList} from './adjacency_list';

export function sort(graph: Graph): number[] {
    if (!graph.directed) {
        throw new Error('Topological sorting only supports directed graphs.');
    }

    const list = new AdjacencyList(graph);
    const sorted: number[] = [];

    // Reuse the discovered array to avoid processing the same vertices multiple times.
    const discovered: boolean[] = new Array(list.a.length);

    for (let x = 0; x < list.a.length; x += 1) {
        // Vertices are processed in reverse topological order. We could prepend vertices by using `sorted.unshift(x)`,
        // but it's faster to append and then reverse at the end.
        list.depthFirstSearch(x, y => sorted.push(y), discovered);
    }

    sorted.reverse();
    return sorted;
}

export function shortestPaths(graph: Graph, start: number): (number[] | undefined)[] {
    // The adjacency list is created twice, and the list as well as the topological sort could be reused for different
    // start vertices as long as the graph is the same, but we keep it this way for simplicity here.
    const list = new AdjacencyList(graph);
    const sorted = sort(graph);
    const distances: number[] = new Array(list.a.length).fill(Infinity);
    const parents: number[] = new Array(list.a.length).fill(-1);
    distances[start] = 0;

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

function paths(parents: number[], start: number): (number[] | undefined)[] {
    return parents.map((_, end) => path(parents, start, end));
}

function path(parents: number[], start: number, end: number): number[] | undefined {
    if (start !== end && parents[end] === -1) {
        return undefined;
    }

    const result: number[] = [];

    for (let x = end; x !== -1; x = parents[x]) {
        result.push(x);
    }

    result.reverse();
    return result;
}
