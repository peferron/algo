import {AdjacencyList} from './adjacency_list.js';


export function color(graph) {
    const list = new AdjacencyList(graph);

    const colors = new Array(graph.vertexCount).fill(-1);

    while (true) {
        const x = nextVertex(list, colors);
        if (x < 0) {
            return colors;
        }
        colors[x] = lowestAvailableColor(x, list, colors);
    }
}

function nextVertex(list, colors) {
    return list.a.reduce((best, edges, x) => {
        if (colors[x] >= 0) {
            return best;
        }
        if (best < 0) {
            return x;
        }
        return colorDegree(x, list, colors) > colorDegree(best, list, colors) ? x : best;
    }, -1);
}

function colorDegree(x, list, colors) {
    return neighboringColors(x, list, colors).size;
}

function neighboringColors(x, list, colors) {
    return new Set(list.a[x].map(y => colors[y]).filter(color => color >= 0));
}

function lowestAvailableColor(x, list, colors) {
    const unavailableColors = neighboringColors(x, list, colors);
    let i = 0;
    while (unavailableColors.has(i)) {
        i++;
    }
    return i;
}
