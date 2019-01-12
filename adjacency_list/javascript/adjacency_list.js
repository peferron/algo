export default class AdjacencyList {
    constructor(graph) {
        this.a = constructAdjacencyList(graph);
    }

    breadthFirstSearch(start, earlyCallback) {
        breadthFirstSearch(this.a, start, earlyCallback);
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

function breadthFirstSearch(a, start, earlyCallback) {
    if (!a.length) {
        return;
    }

    const processed = new Array(a.length);
    const queue = [];

    earlyCallback(start);
    processed[start] = true;
    queue.push(start);

    while (queue.length) {
         // Use shift() for simplicity, but it can take linear time.
        const x = queue.shift();
        for (const y of a[x]) {
            if (processed[y]) {
                continue;
            }
            earlyCallback(y);
            processed[y] = true;
            queue.push(y);
        }
    }
}

function depthFirstSearch(a, start, earlyCallback) {
    const processed = new Array(a.length);

    const dfs = x => {
        if (processed[x]) {
            return;
        }
        earlyCallback(x);
        processed[x] = true;
        a[x].forEach(dfs);
    };

    dfs(start);
}
