export function getAdjacencyMatrix(graph) {
    // new Array(vertexCount).fill([]) does not work because it reuses the same array instance for
    // every element.
    const m = Array.from(
        {length: graph.vertexCount},
        () => new Array(graph.vertexCount).fill(false)
    );

    for (let [x, y] of graph.edges) {
        m[x][y] = true;
        m[y][x] = true;
    }

    return m;
}
