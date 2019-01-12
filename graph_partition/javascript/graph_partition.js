import newAdjacencyMatrix from './adjacency_matrix';

export default function bisect(graph) {
    // This algorithm works by swapping vertices. If the graph has an odd number of vertices, we can end up in a
    // situation where all vertices but one have been swapped. The last unswapped vertex is then "stuck" in its original
    // subset because there is no other unswapped vertex to swap it with.
    // A simple solution is to add a temporary vertex to the graph. This makes the number of vertices even, and since
    // the temporary vertex has zero edges, we can remove it at the end without changing the cut size.
    const oddVertexCount = graph.vertexCount % 2 !== 0;
    if (oddVertexCount) {
        graph = {vertexCount: graph.vertexCount + 1, edges: graph.edges};
    }

    const matrix = newAdjacencyMatrix(graph);
    const subsets = split(graph, 2);

    // Experiments have shown that the number of iterations of this loop does not increase with n, and should be
    // considered constant for time complexity analysis.
    while (true) {
        const swaps = getSwaps(matrix, subsets);
        if (!swaps.length) {
            break;
        }
        for (const {x, y} of swaps) {
            swapVertices(x, y, subsets);
        }
    }

    if (oddVertexCount) {
        subsets.pop();
    }

    return subsets;
}

function getSwaps(matrix, subsets) {
    const swapped = new Array(matrix.length).fill(false);
    const swaps = [];
    const subsetsCopy = subsets.slice();

    // The loop below can be optimized to run in O(n² log n) instead of O(n³):
    //
    // 1. getCostDifferences runs in O(n²), and is called in each iteration so the total is O(n³). Instead of calling it
    //    in each iteration, we could call it only once before the loop, and then after each swap update only the cost
    //    differences of the neighbors of the swapped vertices (+1 if the neighbor is now in a different subset, or -1
    //    if the neighbor is now in the same subset). This would bring the time complexity down to O(n) per iteration,
    //    for a total of O(n²).
    //
    // 2. The nested loop that finds the best pair of vertices to swap also runs in O(n²). But it can be optimized to
    //    run in O(n log n). Recall that we want to select the pair that optimizes the cost reduction. We can sort the
    //    cost differences of each subset's vertices in decreasing order: Da1 >= Da2 >= ... and Db1 >= Db2 >= ..., in
    //    O(n log n) time. Then we examine the pairs in order. If we come across a pair (Dai, Dbj) such that (Dai + Dbj)
    //    is less than the gain seen so far in this iteration, then we do not need to examine any more pairs. It is
    //    almost never required to examine all the pairs, so the time complexity is O(n log n) per iteration, for a
    //    total of O(n² log n).

    while (true) {
        const costDiffs = getCostDifferences(matrix, subsetsCopy);
        let bestSwap;

        for (const [x, subsetX] of subsets.entries()) {
            for (const [y, subsetY] of subsets.entries()) {
                if (!swapped[x] && !swapped[y] && subsetX !== subsetY) {
                    // Calculate the cost reduction that would result from swapping x and y.
                    const costReduction = costDiffs[x] + costDiffs[y] - 2 * matrix[x][y];
                    if (!bestSwap || costReduction > bestSwap.costReduction) {
                        bestSwap = {x, y, costReduction};
                    }
                }
            }
        }

        if (!bestSwap) {
            break;
        }

        swapped[bestSwap.x] = true;
        swapped[bestSwap.y] = true;

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

    for (const [i, swap] of swaps.entries()) {
        totalCostReduction += swap.costReduction;
        if (totalCostReduction > bestTotalCostReduction) {
            bestTotalCostReduction = totalCostReduction;
            bestSwapCount = i + 1;
        }
    }

    return swaps.slice(0, bestSwapCount);
}

// split splits graph into count subsets of similar size.
function split(graph, count) {
    return Array.from({length: graph.vertexCount}, (_, x) => Math.floor(x * count / graph.vertexCount));
}

// getCostDifferences return the external cost (number of edges going to a different subset) minus the internal cost
// (number of edges staying in the same subset) of each vertex.
function getCostDifferences(matrix, subsets) {
    return subsets.map((_, x) =>
        matrix[x].reduce((costDifference, connected, y) => {
            if (!connected) {
                return costDifference;
            }
            return subsets[x] === subsets[y] ? costDifference - 1 : costDifference + 1;
        }, 0)
    );
}
