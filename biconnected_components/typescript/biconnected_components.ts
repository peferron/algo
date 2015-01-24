/// <reference path="graph.d.ts"/>
/// <reference path="adjacency_list.ts"/>

module biconnected_components {
    export function articulations(graph: Graph): number[] {
        if (graph.directed) {
            throw new Error('This algorithm only supports undirected graphs');
        }
        if (graph.vertexCount === 0) {
            return [];
        }

        let articuls: number[] = [];

        let list = new AdjacencyList(graph);

        let visited: boolean[] = new Array(list.a.length);
        let depth: number[] = new Array(list.a.length);
        let lowpoint: number[] = new Array(list.a.length);
        let parent: number[] = new Array(list.a.length);

        let currentDepth = 0;

        function processVertexEarly(x: number): void {
            visited[x] = true;
            depth[x] = currentDepth;
            lowpoint[x] = currentDepth;
            currentDepth++;
        }

        function processEdge(x: number, y: number): void {
            if (!visited[y]) {
                parent[y] = x;
                dfs(y);
                if (!isNaN(parent[x]) && lowpoint[y] >= depth[x]) {
                    articuls.push(x);
                }
                lowpoint[x] = Math.min(lowpoint[x], lowpoint[y]);
            } else if (y !== parent[x] && depth[y] < depth[x]) {
                lowpoint[x] = Math.min(lowpoint[x], depth[y]);
            }
        }

        function processVertexLate(x: number, children: number): void {
            if (isNaN(parent[x]) && children > 1) {
                articuls.push(x);
            }
        }

        function dfs(x: number): void {
            processVertexEarly(x);
            let children = 0;
            list.a[x].forEach(y => {
                if (!visited[y]) {
                    children++;
                }
                processEdge(x, y);
            });
            processVertexLate(x, children);
        }

        dfs(0);

        return articuls;
    }
}
