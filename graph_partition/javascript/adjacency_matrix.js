export default function newAdjacencyMatrix(graph) {
    const m = Array.from(
        {length: graph.vertexCount},
        () => new Array(graph.vertexCount).fill(false)
    );

    for (const [x, y] of graph.edges) {
        m[x][y] = true;
        m[y][x] = true;
    }

    return m;
}
