export interface Graph {
    directed: boolean;
    vertexCount: number;
    edges: Edge[];
}

export type Edge = number[];

export interface BipartiteGraph extends Graph {
    flags: boolean[];
}

type EdgeCallback = (edge: Edge) => boolean;

export class AdjacencyMatrix {
    a: boolean[][];

    constructor(graph: Graph) {
        this.a = constructAdjacencyMatrix(graph);
    }

    breadthFirstSearch(start: number, callback: EdgeCallback) {
        const visited = new Array(this.a.length);
        visited[start] = true;

        const queue = [start];

        while (queue.length) {
            const x = queue.shift();

            for (let y = 0; y < this.a.length; y++) {
                if (visited[y] || !this.a[x][y]) {
                    continue;
                }
                visited[y] = true;
                queue.push(y);
                // The edge callback can return true to abort the current graph traversal.
                if (callback([x, y])) {
                    return;
                }
            }
        }
    }
}

function constructAdjacencyMatrix(graph: Graph): boolean[][] {
    const a = Array.from(
        {length: graph.vertexCount},
        () => new Array(graph.vertexCount).fill(false)
    );

    for (let edge of graph.edges) {
        insertEdge(a, edge, graph.directed);
    }

    return a;
}

function insertEdge(a: boolean[][], edge: Edge, directed: boolean): void {
    const [x, y] = edge;
    a[x][y] = true;

    if (!directed) {
        insertEdge(a, edge.reverse(), true);
    }
}
