export class AdjacencyList {
    constructor(graph) {
        this.a = constructAdjacencyList(graph);
    }
    depthFirstSearch(start, earlyCallback) {
        depthFirstSearch(this.a, start, earlyCallback);
    }
}

function constructAdjacencyList(graph) {
    // new Array(vertexCount).fill([]) does not work because it reuses the same array instance for
    // every element.
    let a = Array.from(new Array(graph.vertexCount), () => []);

    for (let edge of graph.edges) {
        insertEdge(a, edge[0], edge[1], false);
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
    let processed = new Array(a.length);

    let dfs = x => {
        if (processed[x]) {
            return;
        }
        processed[x] = true;
        earlyCallback(x);
        a[x].forEach(dfs);
    };

    dfs(start);
}
