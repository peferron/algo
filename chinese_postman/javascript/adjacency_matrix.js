export default class AdjacencyMatrix {
    constructor(graph) {
        this.a = Array.from(
            new Array(graph.vertexCount),
            () => new Array(graph.vertexCount).fill(Infinity)
        );

        for (let edge of graph.edges) {
            insertEdge(this.a, edge, graph.directed);
        }
    }

    breadthFirstSearch(start, callback) {
        const visited = new Array(this.a.length);
        visited[start] = true;

        const queue = [start];

        while (queue.length) {
            const x = queue.shift();

            for (let y = 0; y < this.a.length; y++) {
                const weight = this.a[x][y];
                if (visited[y] || weight === Infinity) {
                    continue;
                }
                visited[y] = true;
                queue.push(y);

                // The edge callback can return true to abort the current graph traversal.
                const edge = {x, y, weight};
                if (callback(edge)) {
                    return;
                }
            }
        }
    }
}

function insertEdge(a, edge, directed) {
    const {x, y} = edge;

    // For unweighted graphs, use 1 as the edge weight.
    const weight = isNaN(edge.weight) ? 1 : edge.weight;

    a[x][y] = weight;

    if (!directed) {
        const reversed = {x: y, y: x, weight: weight};
        insertEdge(a, reversed, true);
    }
}
