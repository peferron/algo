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

export class AdjacencyList {
    a: Edge[][];
    constructor(graph: Graph) {
        this.a = constructAdjacencyList(graph);
    }
}

function constructAdjacencyList(graph: Graph): Edge[][] {
    // new Array(vertexCount).fill([]) does not work because it reuses the same array instance
    // for every element.
    const a = Array.from(new Array(graph.vertexCount), () => []);

    for (let edge of graph.edges) {
        insertEdge(a, edge, graph.directed);
    }

    return a;
}

function insertEdge(a: Edge[][], edge: Edge, directed: boolean): void {
    a[edge.x].push(edge);
    if (!directed) {
        const reversed = {x: edge.y, y: edge.x, weight: edge.weight};
        insertEdge(a, reversed, true);
    }
}
