export default class AdjacencyList {
    constructor(graph) {
        this.a = constructAdjacencyList(graph);
    }

    breadthFirstSearch(start, callback) {
        breadthFirstSearch(this.a, start, callback);
    }

    depthFirstSearch(start, preOrderCallback, postOrderCallback) {
        const discovered = new Array(this.a.length);
        depthFirstSearch(this.a, start, preOrderCallback, postOrderCallback, discovered);
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

function breadthFirstSearch(a, start, callback) {
    const discovered = new Array(a.length);
    const queue = [];

    discovered[start] = true;
    callback(start);
    queue.push(start);

    while (queue.length) {
         // Use shift() for simplicity, but it can take linear time.
        const x = queue.shift();

        for (const y of a[x]) {
            if (discovered[y]) {
                continue;
            }
            discovered[y] = true;
            callback(y);
            queue.push(y);
        }
    }
}

function depthFirstSearch(a, start, preOrderCallback, postOrderCallback, discovered) {
    if (discovered[start]) {
        return;
    }

    discovered[start] = true;
    preOrderCallback(start);

    for (const neighbor of a[start]) {
        depthFirstSearch(a, neighbor, preOrderCallback, postOrderCallback, discovered);
    }

    postOrderCallback(start);
}
