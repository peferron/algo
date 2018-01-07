export type Vertex = number;

export interface Edge {
    from: Vertex;
    to: Vertex;
    distance: number;
}

export interface Graph {
    vertexCount: number;
    directed: boolean;
    edges: Edge[];
}

interface Distance {
    distance: number;
    count: number;
}

const compare = (a: Distance, b: Distance) =>
    a.distance !== b.distance ? a.distance - b.distance : a.count - b.count;

export function getShortestPath(graph: Graph, from: Vertex, to: Vertex): Vertex[] | undefined {
    const parents = dijkstra(graph, from);
    const path = getPath(parents, to);
    return path[0] === from ? path : undefined;
}

function dijkstra(graph: Graph, source: Vertex): Vertex[] {
    const a = getAdjacencyList(graph);
    const distances = new Array(a.length).fill({distance: Infinity, count: Infinity});
    const parents = new Array<Vertex>(a.length);
    const visited = new Array(a.length).fill(false);
    distances[source] = {distance: 0, count: 0};

    while (true) {
        const x = getClosestUnvisitedVertex(distances, visited);

        if (x === undefined) {
            return parents;
        }

        visited[x] = true;
        const dx = distances[x];

        for (const {to: y, distance: d} of a[x]) {
            const dy = distances[y];
            const dxy = {distance: dx.distance + d, count: dx.count + 1};
            if (compare(dxy, dy) < 0) {
                distances[y] = dxy;
                parents[y] = x;
            }
        }
    }
}

function getClosestUnvisitedVertex(distances: Distance[], visited: boolean[]): Vertex | undefined {
    return visited.reduce((best: Vertex | undefined, v, x) =>
        !v && (best === undefined || compare(distances[x], distances[best]) < 0) ? x : best,
        undefined
    );
}

function getAdjacencyList(graph: Graph): Edge[][] {
    const a: Edge[][] = Array.from({length: graph.vertexCount}, () => []);

    for (const edge of graph.edges) {
        a[edge.from].push(edge);

        if (!graph.directed) {
            a[edge.to].push({from: edge.to, to: edge.from, distance: edge.distance});
        }
    }

    return a;
}

function getPath(parents: Vertex[], to: Vertex): Vertex[] {
    const path: Vertex[] = [];
    let x = to;

    while (x !== undefined) {
        path.push(x);
        x = parents[x];
    }

    return path.reverse();
}
