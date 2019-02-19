// Vertex states
const UNDISCOVERED = 'undiscovered';
const DISCOVERED = 'discovered';
const PROCESSED = 'processed';

// Edge types
export const TREE = 'tree';
export const BACK = 'back';
export const FORWARD = 'forward';
export const CROSS = 'cross';

export class AdjacencyList {
    constructor(graph) {
        this.a = constructAdjacencyList(graph);
        this.directed = graph.directed;
    }

    breadthFirstSearch(start, vertexCallback, edgeCallback) {
        breadthFirstSearch(this.a, this.directed, start, vertexCallback, edgeCallback);
    }

    depthFirstSearch(start, preOrderCallback, postOrderCallback, edgeCallback) {
        const metadata = Array.from(this.a, () => ({state: UNDISCOVERED}));

        // Directed vs. undirected does not change how DFS processes vertices, but it changes how DFS processes and
        // classifies edges. Handling both cases within the same DFS function makes that function less readable,
        // especially compared to an undirected-only implementation. To keep each case as readable as possible, each is
        // implemented as a separate function.
        if (this.directed) {
            depthFirstSearchDirected(this.a, start, preOrderCallback, postOrderCallback, edgeCallback, metadata, 0);
        } else {
            depthFirstSearchUndirected(this.a, start, preOrderCallback, postOrderCallback, edgeCallback, metadata);
        }
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

function breadthFirstSearch(a, directed, start, vertexCallback, edgeCallback) {
    const states = new Array(a.length).fill(UNDISCOVERED);
    const queue = [];

    states[start] = DISCOVERED;
    vertexCallback(start);
    queue.push(start);

    while (queue.length) {
         // Use shift() for simplicity, but it can take linear time.
        const x = queue.shift();

        for (const y of a[x]) {
            if (states[y] !== PROCESSED || directed) {
                edgeCallback([x, y]);
            }

            if (states[y] === UNDISCOVERED) {
                states[y] = DISCOVERED;
                vertexCallback(y);
                queue.push(y);
            }
        }

        states[x] = PROCESSED;
    }
}

function depthFirstSearchUndirected(a, x, preOrderCallback, postOrderCallback, edgeCallback, metadata) {
    if (metadata[x].state !== UNDISCOVERED) {
        return;
    }

    metadata[x].state = DISCOVERED;
    preOrderCallback(x);

    for (const y of a[x]) {
        let edgeType;

        if (metadata[y].state === UNDISCOVERED) {
            edgeType = TREE;
            metadata[y].parent = x;
        } else if (metadata[y].state === DISCOVERED && metadata[x].parent !== y) {
            edgeType = BACK;
        } else {
            // This edge has already been explored.
        }

        if (edgeType) {
            edgeCallback([x, y, edgeType]);
        }

        depthFirstSearchUndirected(a, y, preOrderCallback, postOrderCallback, edgeCallback, metadata);
    }

    metadata[x].state = PROCESSED;
    postOrderCallback(x);
}

function depthFirstSearchDirected(a, x, preOrderCallback, postOrderCallback, edgeCallback, metadata, time) {
    if (metadata[x].state !== UNDISCOVERED) {
        return time;
    }

    metadata[x].state = DISCOVERED;
    metadata[x].entryTime = time;
    time += 1;

    preOrderCallback(x);

    for (const y of a[x]) {
        let edgeType;

        if (metadata[y].state === UNDISCOVERED) {
            edgeType = TREE;
            metadata[y].parent = x;
        } else if (metadata[y].state === DISCOVERED) {
            edgeType = BACK;
        } else if (metadata[y].state === PROCESSED) {
            edgeType = metadata[y].entryTime < metadata[x].entryTime ? CROSS : FORWARD;
        }

        edgeCallback([x, y, edgeType]);
        time = depthFirstSearchDirected(a, y, preOrderCallback, postOrderCallback, edgeCallback, metadata, time);
    }

    metadata[x].state = PROCESSED;
    postOrderCallback(x);
    return time;
}
