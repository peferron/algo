import AdjacencyMatrix from './adjacency_matrix.js';

export default function solve(graph) {
    if (graph.directed) {
        throw new Error('This algorithm only supports undirected graphs');
    }

    // How to solve the Chinese Postman problem:
    // - Construct a weighted graph containing all the odd-degree vertices from the graph.
    // - In this weighted graph, connect each pair of vertices by an edge whose weight is the
    //   shortest path between the two vertices in the original graph.
    // - Perform a minimum weight perfect matching on this weighted graph. (We know that the number
    //   of odd-degree vertices must be even.)
    // - Merge the edges of this perfect matching into the graph. Congratulations! The
    //   graph is now Eulerian.
    // - Find an Eulerian cycle for the graph.
    // - This Eulerian cycle might use some edges that were in the original graph, and some edges
    //   that were added from the perfect matching. Replace the edges that were added from the
    //   perfect matching with their corresponding path in the original graph. Done!
    const oddDegreeVertices = getOddDegreeVertices(graph);
    const shortestPaths = getShortestPathsBetweenPairs(graph, oddDegreeVertices);
    const weightedGraph = {
        vertexCount: oddDegreeVertices.length,
        directed: false,
        edges: shortestPaths.map(p => ({x: p[0], y: p[p.length - 1], weight: p.length - 1}))
    };
}

// getOddDegreeVertices returns an array of the vertices of graph that have an odd degree.
function getOddDegreeVertices(graph) {
    const degrees = new Array(graph.vertexCount).fill(0);
    graph.edges.forEach(({x, y}) => {
        degrees[x]++;
        degrees[y]++;
    });

    const oddDegreeVertices = [];
    degrees.forEach((degree, x) => {
        if (degree % 2) {
            oddDegreeVertices.push(x);
        }
    });

    return oddDegreeVertices;
}

// getShortestPaths returns an array of shortest paths between each pair of vertices in graph. Each
// path is represented as an array of vertices.
function getShortestPathsBetweenPairs(graph, vertices) {
    const matrix = new AdjacencyMatrix(graph);
    let paths = [];
    for (let xi = 0; xi < vertices.length - 1; xi++) {
        const fromVertex = vertices[xi];
        const toVertices = vertices.slice(xi + 1);
        paths = paths.concat(getShortestPathsFromVertex(matrix, fromVertex, toVertices));
    }
    return paths;
}

// getShortestPathsFromVertex returns an array of shortest paths from fromVertex to each vertex in
// toVertices. Each path is represented as an array of vertices.
function getShortestPathsFromVertex(matrix, fromVertex, toVertices) {
    const parents = new Array(matrix.a.length).fill(-1);
    const paths = [];

    matrix.breadthFirstSearch(fromVertex, ({x, y}) => {
        parents[y] = x;
        if (toVertices.indexOf(y) >= 0) {
            paths.push(getPath(parents, fromVertex, y));
        }
        // Return true to abort the BFS if all the paths have been found.
        return paths.length === toVertices.length;
    });

    return paths;
}

function getPath(parents, from, to) {
    const p = parents[to];
    if (p < 0) {
        throw new Error(`Cannot reconstruct path, parents: ${parents}, from: ${from}, to: ${to}`);
    }
    if (p === from) {
        return [from, to];
    }
    return getPath(parents, from, p).concat(to);
}
