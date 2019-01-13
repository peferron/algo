import {Graph, Edge, BipartiteGraph, AdjacencyMatrix} from './adjacency_matrix';

interface Network extends Graph {
    source: number;
    sink: number;
}

export default function bipartiteMatching(graph: BipartiteGraph): Edge[] {
    if (graph.directed) {
        throw new Error('This bipartite matching algorithm only supports undirected graphs');
    }

    const network = constructNetwork(graph);

    // The residual flow is initially just the same as the network.
    const residual = new AdjacencyMatrix(network);

    // Add augmenting paths to the residual flow until no more augmenting paths can be found, which
    // means the maximum flow has been reached.
    while (addAugmentingPath(residual, network.source, network.sink)) {}

    return graph.edges.filter(edge => {
        // The edges of the bipartite matching are the edges of the maximum flow (minus the edges
        // connected to the source or sink, which we do not need to worry about here because we are
        // iterating over the edges of the original bipartite graph).
        // An edge is in the maximum flow if the residual flow has the same edge but in the reverse
        // direction.
        const [x, y] = edge;
        return residual.a[y][x];
    });
}

function constructNetwork(graph: BipartiteGraph): Network {
    // The first edge vertex must be in the first set (flag === true), and the second edge vertex
    // must be in the second set (flag === false).
    const directedEdges = graph.edges.map(edge => {
        const [x, y] = edge;
        if (graph.flags[x] === graph.flags[y]) {
            throw new Error(`This bipartite graph has an edge between two vertices of the same set: ${x} -> ${y}`);
        }
        return graph.flags[x] ? [x, y] : [y, x];
    });

    // The source node must have a directed edge to each vertex in the first set (flag === true).
    // The sink node must have a directed edge to each vertex in the second set (flag === false).
    const source = graph.vertexCount;
    const sink = graph.vertexCount + 1;
    const additionalEdges = graph.flags.map((flag, x) => flag ? [source, x] : [x, sink]);

    return {
        directed: true,
        vertexCount: graph.vertexCount + 2,
        edges: directedEdges.concat(additionalEdges),
        source,
        sink,
    };
}

function addAugmentingPath(residual: AdjacencyMatrix, source: number, sink: number): boolean {
    const parents = new Array(residual.a.length).fill(-1);

    residual.breadthFirstSearch(source, edge => {
        const [x, y] = edge;
        parents[y] = x;
        // Return true to abort the BFS.
        return y === sink;
    });

    if (parents[sink] < 0) {
        // No augmenting path was found.
        return false;
    }

    subtractPath(residual, parents, sink);
    return true;
}

function subtractPath(residual: AdjacencyMatrix, parents: number[], end: number): void {
    const p = parents[end];
    if (p < 0) {
        return;
    }
    residual.a[p][end] = false;
    residual.a[end][p] = true;
    subtractPath(residual, parents, p);
}
