export interface Graph {
    vertexCount: number;
    directed: boolean;
    edges: number[][];
}

export class AdjacencyList {
    a: number[][];
    constructor(graph: Graph) {
        this.a = constructAdjacencyList(graph);
    }
}

function constructAdjacencyList(graph: Graph): number[][] {
    // new Array(vertexCount).fill([]) does not work because it reuses the same array instance
    // for every element.
    const a = Array.from({length: graph.vertexCount}, () => []);

    for (const edge of graph.edges) {
        insertEdge(a, edge[0], edge[1], graph.directed);
    }

    return a;
}

function insertEdge(a: number[][], x: number, y: number, directed: boolean): void {
    a[x].push(y);
    if (!directed) {
        insertEdge(a, y, x, true);
    }
}
