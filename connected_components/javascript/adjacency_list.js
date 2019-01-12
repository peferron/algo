export default class AdjacencyList {
    constructor(graph) {
        this.a = constructAdjacencyList(graph);
    }

    depthFirstSearch(start, earlyCallback) {
        depthFirstSearch(this.a, start, earlyCallback);
    }
}

function constructAdjacencyList(graph) {
    // new Array(vertexCount).fill([]) does not work because it reuses the same array instance for every element.
    const a = Array.from({length: graph.vertexCount}, () => []);

    for (const [x, y] of graph.edges) {
        insertEdge(a, x, y, graph.directed);
    }

    return a;
}

function insertEdge(a, x, y, directed) {
    a[x].push(y);

    if (!directed) {
        insertEdge(a, y, x, true);
    }
}

function depthFirstSearch(a, start, earlyCallback) {
    const processed = new Array(a.length);

    const dfs = x => {
        if (processed[x]) {
            return;
        }
        processed[x] = true;
        earlyCallback(x);
        a[x].forEach(dfs);
    };

    dfs(start);
}
