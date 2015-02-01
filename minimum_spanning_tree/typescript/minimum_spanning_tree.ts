/// <reference path="adjacency_list.ts"/>

module minimum_spanning_tree {
    export function edges(graph: Graph): Edge[] {
        let list = new AdjacencyList(graph);

        let mstEdges: Edge[] = [];
        let mstVertices = new Array(graph.vertexCount).fill(false);

        // Start with vertex #0 in the MST.
        mstVertices[0] = true;

        while (true) {
            let edge = lightestCrossEdge(list, mstVertices);
            if (!edge) {
                break;
            }
            mstVertices[edge.x] = true;
            mstVertices[edge.y] = true;
            mstEdges.push(edge);
        }

        return mstEdges;
    }

    // lightestCrossEdge returns the minimum weight edge with exactly one vertex in the MST.
    function lightestCrossEdge(list: AdjacencyList, mstVertices: boolean[]): Edge {
        var best: Edge = null;

        function processEdge(edge: Edge) {
            if (mstVertices[edge.x] !== mstVertices[edge.y] &&
                (!best || best.weight > edge.weight)) {
                best = edge;
            }
        }

        list.a.forEach(edges => {
            edges.forEach(processEdge)
        });

        return best;
    }
}
