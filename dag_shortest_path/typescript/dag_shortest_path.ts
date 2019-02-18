import {AdjacencyList, Graph, Edge} from './adjacency_list';
import topologicalSort from './topological_sort';

export default function shortestPath(graph: Graph, start: number, end: number): number[] | undefined {
    if (!graph.directed) {
        throw new Error('This algorithm only supports directed graphs.');
    }

    const list = new AdjacencyList(graph);
    const sorted = topologicalSort(list);

    // distance[x] is the distance between start and x.
    const distance = new Array(graph.vertexCount).fill(Infinity);
    distance[start] = 0;

    // parent[x] is the vertex that precedes x in the shortest path from start to x.
    const parent = new Array(graph.vertexCount);

    const processVertex = (x: number) => list.a[x].forEach(processEdge);

    const processEdge = (edge: Edge) => {
        // dxy is the distance from start to y via x.
        const dxy = distance[edge.x] + edge.weight;
        if (dxy < distance[edge.y]) {
            distance[edge.y] = dxy;
            parent[edge.y] = edge.x;
        }
    };

    sorted.forEach(processVertex);

    if (distance[end] === Infinity) {
        // There is no path from start to end.
        return undefined;
    }

    return path(parent, end);
}

function path(parent: number[], end: number): number[] {
    if (isNaN(end)) {
        return [];
    }
    return path(parent, parent[end]).concat(end);
}
