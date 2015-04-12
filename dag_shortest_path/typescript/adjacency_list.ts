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
    depthFirstSearch(start: number, lateCallback: VertexCallback) {
        depthFirstSearch(this.a, start, lateCallback);
    }
}

function constructAdjacencyList(graph: Graph): Edge[][] {
    // new Array(vertexCount).fill([]) does not work because it reuses the same array instance
    // for every element.
    const a = Array.from(new Array(graph.vertexCount), () => []);

    graph.edges.forEach(edge => {
        insertEdge(a, edge, graph.directed);
    });

    return a;
}

function insertEdge(a: Edge[][], edge: Edge, directed: boolean): void {
    a[edge.x].push(edge);
    if (!directed) {
        const reversed = {x: edge.y, y: edge.x, weight: edge.weight};
        insertEdge(a, reversed, true);
    }
}

function depthFirstSearch(a: Edge[][], start: number, lateCallback: VertexCallback): void {
    const discovered = new Array(a.length);

    function dfs(x: number) {
        if (discovered[x]) {
            return;
        }
        discovered[x] = true;
        a[x].forEach(edge => dfs(edge.y));
        lateCallback(x);
    }

    dfs(start);
}
