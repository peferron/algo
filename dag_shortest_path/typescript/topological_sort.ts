import {AdjacencyList} from './adjacency_list';

export default function topologicalSort(list: AdjacencyList): number[] {
    const sorted: number[] = [];

    // Reuse the discovered array to avoid processing the same vertices multiple times.
    const discovered = new Array(list.a.length);

    for (let x = 0; x < list.a.length; x += 1) {
        // Vertices are processed in reverse topological order. We could prepend vertices by using `sorted.unshift(x)`,
        // but it's faster to append and then reverse at the end.
        list.depthFirstSearch(x, y => sorted.push(y), discovered);
    }

    sorted.reverse();
    return sorted;
}
