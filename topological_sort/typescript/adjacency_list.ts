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

type VertexCallback = (x: number) => void;

export class AdjacencyList {
    a: Edge[][];

    constructor(graph: Graph) {
        this.a = constructAdjacencyList(graph);
    }

    depthFirstSearch(start: number, lateCallback: VertexCallback, discovered: boolean[]) {
        if (discovered[start]) {
            return;
        }

        discovered[start] = true;

        for (const edge of this.a[start]) {
            this.depthFirstSearch(edge.y, lateCallback, discovered);
        }

        lateCallback(start);
    }
}

function constructAdjacencyList(graph: Graph): Edge[][] {
    // new Array(vertexCount).fill([]) does not work because it reuses the same array instance for every element.
    const a = Array.from({length: graph.vertexCount}, () => []);

    for (const edge of graph.edges) {
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
