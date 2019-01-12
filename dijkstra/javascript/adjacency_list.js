export default function AdjacencyList(graph) {
    this.a = constructAdjacencyList(graph);
}

function constructAdjacencyList(graph) {
    // new Array(vertexCount).fill([]) does not work because it reuses the same array instance for every element.
    const a = Array.from({length: graph.vertexCount}, () => []);

    for (const edge of graph.edges) {
        insertEdge(a, edge.x, edge.y, edge.weight, graph.directed);
    }

    return a;
}

function insertEdge(a, x, y, weight, directed) {
    a[x].push({y, weight});

    if (!directed) {
        insertEdge(a, y, x, weight, true);
    }
}
