import AdjacencyList from './adjacency_list';

export default function dijkstra(graph, start, end) {
    const list = new AdjacencyList(graph);
    const visited = new Array(list.a.length).fill(false);
    const distances = new Array(list.a.length).fill(Infinity);
    const parents = new Array(list.a.length).fill(-1);

    distances[start] = 0;

    while (true) {
        const x = best(distances, visited);

        if (x < 0) {
            return undefined;
        }

        if (x === end) {
            return path(end, parents);
        }

        const dx = distances[x];

        for (const {y, weight} of list.a[x]) {
            const dy = dx + weight;
            if (dy < distances[y]) {
                distances[y] = dy;
                parents[y] = x;
            }
        }

        visited[x] = true;
    }
}

// path returns an array containing all the ancestors of x, sorted from x's oldest ancestor to x itself.
function path(x, parents) {
    // The recursive implementation is the simplest, but a loop of pushes followed by a reverse would be faster.
    return x < 0 ? [] : [...path(parents[x], parents), x];
}

// best returns the best vertex to visit, or -1 if none. The best vertex to visit is the discovered (but unvisited)
// vertex with the lowest distance. The "discovered" state is indicated by distance < Infinity.
function best(distances, visited) {
    let bestIndex = -1;
    let minDistance = Infinity;

    for (const [x, distance] of distances.entries()) {
        if (!visited[x] && distance < minDistance) {
            bestIndex = x;
            minDistance = distance;
        }
    }

    return bestIndex;
}
