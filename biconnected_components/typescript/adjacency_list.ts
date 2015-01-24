module adjacency_list {
    export class AdjacencyList {
        a = null;
        constructor(graph) {
            this.a = constructAdjacencyList(graph);
        }
    }

    function constructAdjacencyList(graph) {
        // new Array(vertexCount).fill([]) does not work because it reuses the same array instance for
        // every element.
        let a = Array.from(new Array(graph.vertexCount), () => []);

        graph.edges.forEach(edge => {
            insertEdge(a, edge[0], edge[1], graph.directed);
        });

        return a;
    }

    function insertEdge(a, x, y, directed) {
        a[x].push(y);
        if (!directed) {
            insertEdge(a, y, x, true);
        }
    }
}
