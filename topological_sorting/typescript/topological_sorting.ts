/// <reference path="adjacency_list.ts"/>

module topological_sorting {
    export function sort(graph: Graph): number[] {
        if (!graph.directed) {
            throw new Error('Topological sorting only supports directed graphs.');
        }

        const list = new AdjacencyList(graph)

        const sorted: number[] = [];

        const processed: boolean[] = new Array(list.a.length);
        function process(x: number) {
            if (processed[x]) {
                return;
            }
            processed[x] = true;
            // Vertices are processed in reverse topological order. To bring back the correct order,
            // each vertex must be prepended instead of appended.
            sorted.unshift(x);
        }

        for (let i = 0; i < list.a.length; i++) {
            list.depthFirstSearch(i, process);
        }

        return sorted;
    }
}
