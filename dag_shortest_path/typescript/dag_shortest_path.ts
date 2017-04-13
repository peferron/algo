import {AdjacencyList, Graph, Edge} from './adjacency_list';

export default function shortestPath(graph: Graph, start: number, end: number): number[] | undefined {
    if (!graph.directed) {
        throw new Error('This algorithm only supports directed graphs.');
    }

    const list = new AdjacencyList(graph)
    const sorted = topologicalSort(list);

    // distance[x] is the distance between start and x.
    const distance = new Array(graph.vertexCount).fill(Infinity);
    distance[start] = 0;

    // parent[x] is the vertex that precedes x in the shortest path from start to x.
    const parent = new Array(graph.vertexCount);

    function processVertex(x: number): void {
        list.a[x].forEach(processEdge);
    }

    function processEdge(edge: Edge): void {
        // dxy is the distance from start to y via x.
        const dxy = distance[edge.x] + edge.weight;
        if (dxy < distance[edge.y]) {
            distance[edge.y] = dxy;
            parent[edge.y] = edge.x;
        }
    }

    sorted.forEach(processVertex);

    if (distance[end] === Infinity) {
        // There is no path from start to end.
        return undefined;
    }

    return path(parent, end);
}

function topologicalSort(list: AdjacencyList): number[] {
    const sorted: number[] = [];

    const processed: boolean[] = new Array(list.a.length);
    function process(x: number) {
        if (processed[x]) {
            return;
        }
        processed[x] = true;
        // Vertices are processed in reverse topological order. To bring back the correct order,
        // each vertex must be prepended instead of appended.
        sorted.unshift(x);
    }

    for (let i = 0; i < list.a.length; i++) {
        list.depthFirstSearch(i, process);
    }

    return sorted;
}

function path(parent: number[], end: number): number[] {
    if (isNaN(end)) {
        return [];
    }
    return path(parent, parent[end]).concat(end);
}
