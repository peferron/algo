export type Edge = number[];

export interface Graph {
    vertexCount: number;
    edges: Edge[];
}

export function minimumFeedbackEdgeSet(graph: Graph): Edge[] {
    // Sort the vertices by increasing edge imbalance. Multiple vertices can have the same edge
    // imbalance, so we use the vertex number as a second sorting criteria.
    const imba = imbalances(graph);
    const before = (x: number, y: number) => imba[x] < imba[y] || x < y;

    // Split the edges into two sets, depending if they go left-to-right or right-to-left in the
    // vertex ordering.
    const ltr: Edge[] = [];
    const rtl: Edge[] = [];

    for (let edge of graph.edges) {
        const [x, y] = edge;
        if (before(x, y)) {
            ltr.push(edge);
        } else {
            rtl.push(edge);
        }
    }

    // The smallest set is our approximation of the minimum feedback edge set. In most cases, the
    // smallest set should be rtl.
    return ltr.length < rtl.length ? ltr : rtl;
}

// imbalances returns the edge imbalance of the vertices of graph. The edge imbalance of a vertex is
// its in-degree minus its out-degree.
function imbalances(graph: Graph): number[] {
    const imba = new Array(graph.vertexCount).fill(0);

    for (let [x, y] of graph.edges) {
        imba[x]--;
        imba[y]++;
    }

    return imba;
}
