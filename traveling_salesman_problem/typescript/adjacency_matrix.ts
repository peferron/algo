export interface Graph {
    vertexCount: number;
    edges: Edge[];
}

export interface Edge {
    x: number;
    y: number;
    distance: number;
}

export class AdjacencyMatrix {
    m: number[][];

    constructor(graph: Graph) {
        this.m = constructAdjacencyMatrix(graph);
    }

    tourDistance(tour: number[]) {
        return tourDistance(this.m, tour);
    }
}

function constructAdjacencyMatrix(graph: Graph): number[][] {
    const m = Array.from(
        {length: graph.vertexCount},
        () => new Array(graph.vertexCount)
    );

    for (const edge of graph.edges) {
        insertEdge(m, edge);
    }

    return m;
}

function insertEdge(m: number[][], edge: Edge): void {
    const {x, y, distance} = edge;
    m[x][y] = distance;
    m[y][x] = distance;
}

function tourDistance(m: number[][], tour: number[]): number {
    return tour.length < 2 ? 0 : tour.reduce((d, x, i) => {
        const j = (i + 1) % tour.length;
        const y = tour[j];
        return d + m[x][y];
    }, 0);
}
