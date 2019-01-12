import AdjacencyList from './adjacency_list';

// getVertexColoring returns the vertex coloring of the graph, with colors are represented as positive integers.
export default function getVertexColoring(graph) {
    const list = new AdjacencyList(graph);

    // coloring[x] is the color of the vertex x.
    const coloring = new Array(graph.vertexCount).fill(-1);

    // neighboringColors[x] is the set of colors adjacent to x.
    // Caching these sets allows this algorithm to run in O(n²) time.
    const neighboringColors = Array.from({length: graph.vertexCount}, () => new Set());

    while (true) {
        // At each iteration, Brélaz's heuristic selects the uncolored vertex with highest color degree.
        const x = getUncoloredVertexWithHighestColorDegree(list, coloring, neighboringColors);

        if (x < 0) {
            // All vertices are colored. Done!
            return coloring;
        }

        // Color x.
        const color = lowestAvailableColor(neighboringColors[x]);
        coloring[x] = color;
        for (const y of list.a[x]) {
            neighboringColors[y].add(color);
        }
    }
}

// getUncoloredVertexWithHighestColorDegree returns the uncolored vertex adjacent to the most different colors, or -1 if
// no uncolored vertex can be found.
function getUncoloredVertexWithHighestColorDegree(list, coloring, neighboringColors) {
    return list.a.reduce((best, _, x) => {
        if (coloring[x] >= 0) {
            // x is colored and not eligible.
            return best;
        }

        if (best < 0) {
            return x;
        }

        return neighboringColors[x].size > neighboringColors[best].size ? x : best;
    }, -1);
}

// lowestAvailableColor returns the lowest color not present in colors.
function lowestAvailableColor(colors) {
    let i = 0;
    while (colors.has(i)) {
        i += 1;
    }
    return i;
}
