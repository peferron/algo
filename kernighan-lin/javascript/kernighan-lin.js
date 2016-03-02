import {AdjacencyList} from './adjacency_list.js';

export function bisect(graph) {
    // This algorithm works by swapping vertices. If the graph has an odd number of vertices, we can
    // end up in a situation where all vertices but one have been swapped. The last unswapped vertex
    // is then "stuck" in its original subset because there is no other unswapped vertex to swap it
    // with.
    // A simple solution is to add a temporary vertex to the graph. This makes the number of
    // vertices even, and since the temporary vertex has zero edges, we can remove it at
    // the end without changing the cut size.
    const oddVertexCount = graph.vertexCount % 2 !== 0;
    if (oddVertexCount) {
        graph = {vertexCount: graph.vertexCount + 1, edges: graph.edges};
    }

    const list = new AdjacencyList(graph);
    const subsets = split(graph, 2);

    while (true) {
        const swaps = getSwaps(list, subsets);
        if (!swaps.length) {
            break;
        }
        swaps.forEach(swap => swapVertices(swap.x, swap.y, subsets));
    }

    if (oddVertexCount) {
        subsets.pop();
    }

    return subsets;
}

function getSwaps(list, subsets) {
    const used = new Set();
    const swaps = [];
    const subsetsCopy = subsets.slice();

    while (true) {
        const costDiffs = getCostDifferences(list, subsetsCopy);

        let bestSwap;

        subsetsCopy.forEach((subsetX, x) => {
            subsetsCopy.forEach((subsetY, y) => {
                if (subsetX !== subsetY && !used.has(x) && !used.has(y)) {
                    const costReduction = costDiffs[x] + costDiffs[y] - 2 * list.a[x].includes(y);
                    if (!bestSwap || costReduction > bestSwap.costReduction) {
                        bestSwap = {x, y, costReduction};
                    }
                }
            });
        });

        if (!bestSwap) {
            break;
        }

        used.add(bestSwap.x);
        used.add(bestSwap.y);

        swapVertices(bestSwap.x, bestSwap.y, subsetsCopy);

        swaps.push(bestSwap);
    }

    return trimSwaps(swaps);
}

// swapVertices swaps the subsets of x and y.
function swapVertices(x, y, subsets) {
    const subsetX = subsets[x];
    subsets[x] = subsets[y];
    subsets[y] = subsetX;
}

// trimSwaps trims the swap sequence to yield the best total cost reduction.
function trimSwaps(swaps) {
    let totalCostReduction = 0;
    let bestTotalCostReduction = 0;
    let bestSwapCount = 0;

    swaps.forEach((swap, i) => {
        totalCostReduction += swap.costReduction;
        if (totalCostReduction > bestTotalCostReduction) {
            bestTotalCostReduction = totalCostReduction;
            bestSwapCount = i + 1;
        }
    });

    return swaps.slice(0, bestSwapCount);
}

// split splits graph into count subsets of similar size.
function split(graph, count) {
    return Array.from({length: graph.vertexCount}, (_, x) =>
        Math.floor(x * count / graph.vertexCount)
    );
}

// getCostDifferences return the external cost minus internal cost of each vertex.
function getCostDifferences(list, subsets) {
    return subsets.map((subset, x) =>
        list.a[x].reduce((delta, y) => subsets[x] === subsets[y] ? delta - 1 : delta + 1, 0)
    );
}
