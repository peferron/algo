export class AdjacencyList {
    constructor(graph) {
        this.a = constructAdjacencyList(graph);
    }
}

function constructAdjacencyList(graph) {
    // new Array(vertexCount).fill([]) does not work because it reuses the same array instance for
    // every element.
    const a = Array.from({length: graph.vertexCount}, () => []);

    for (let [x, y] of graph.edges) {
        a[x].push(y);
        a[y].push(x);
    }

    return a;
}
