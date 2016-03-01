import {AdjacencyList} from './adjacency_list.js';

export function bisect(graph) {
    const oddVertexCount = graph.vertexCount % 2 !== 0;
    if (oddVertexCount) {
        graph = {vertexCount: graph.vertexCount + 1, edges: graph.edges};
    }

    const list = new AdjacencyList(graph);

    const subsets = split(graph);
    const [subsetA, subsetB] = subsets;

    while (true) {
        let d = deltas(list, subsets);
        const used = new Array(list.vertexCount);

        const gv = [];
        const av = [];
        const bv = [];

        let subsetACopy = subsetA.slice();
        let subsetBCopy = subsetB.slice();

        for (let i = 0; i < graph.vertexCount / 2; i++) {
            let bestA;
            let bestB;
            let bestCostReduction = -Infinity;

            for (let a of subsetA) {
                if (used[a]) {
                    continue;
                }
                for (let b of subsetB) {
                    if (used[b]) {
                        continue;
                    }
                    const costReduction = d[a] + d[b] - 2 * list.a[a].includes(b);
                    if (costReduction > bestCostReduction) {
                        bestA = a;
                        bestB = b;
                        bestCostReduction = costReduction;
                    }
                }
            }

            if (bestCostReduction === -Infinity) {
                break;
            }

            used[bestA] = true;
            used[bestB] = true;

            gv.push(bestCostReduction);
            av.push(bestA);
            bv.push(bestB);

            const ai = subsetACopy.indexOf(bestA);
            const bi = subsetBCopy.indexOf(bestB);
            subsetACopy[ai] = bestB;
            subsetBCopy[bi] = bestA;

            d = deltas(list, [subsetACopy, subsetBCopy]);
        }

        let sum = 0;
        let bestSum = -Infinity;
        let bestK;
        gv.forEach((gk, k) => {
            sum += gk;
            if (sum > bestSum) {
                bestK = k;
                bestSum = sum;
            }
        });

        if (bestSum <= 0) {
            break;
        }

        for (let k = 0; k <= bestK; k++) {
            const ai = subsetA.indexOf(av[k]);
            const bi = subsetB.indexOf(bv[k]);
            subsetA[ai] = bv[k];
            subsetB[bi] = av[k];
        }
    }

    if (oddVertexCount) {
        let fakeVertex = graph.vertexCount - 1;
        for (let subset of subsets) {
            let i = subset.indexOf(fakeVertex);
            if (i >= 0) {
                subset.splice(i, 1);
                break;
            }
        }
    }

    return subsets;
}

function split(graph) {
    const vertices = Array.from({length: graph.vertexCount}, (_, x) => x);
    const a = vertices.slice(0, graph.vertexCount / 2);
    const b = vertices.slice(graph.vertexCount / 2);
    return [a, b];
}

function deltas(list, subsets) {
    const d = new Array(list.length);
    for (let subset of subsets) {
        for (let x of subset) {
            d[x] = list.a[x].reduce((acc, y) => subset.includes(y) ? acc - 1 : acc + 1, 0);
        }
    }
    return d;
}
