import {AdjacencyList, Graph} from './adjacency_list';

export function articulations(graph: Graph): number[] {
    if (graph.directed) {
        throw new Error('This algorithm only supports undirected graphs');
    }

    if (graph.vertexCount === 0) {
        return [];
    }

    const articuls: number[] = [];
    const list = new AdjacencyList(graph);
    const visited: boolean[] = new Array(list.a.length);
    const depth: number[] = new Array(list.a.length);
    const lowpoint: number[] = new Array(list.a.length);
    const parent: number[] = new Array(list.a.length);
    let currentDepth = 0;

    const processVertexEarly = (x: number) => {
        visited[x] = true;
        depth[x] = currentDepth;
        lowpoint[x] = currentDepth;
        currentDepth += 1;
    };

    const processEdge = (x: number, y: number) => {
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
    };

    const processVertexLate = (x: number, children: number) => {
        if (isNaN(parent[x]) && children > 1) {
            articuls.push(x);
        }
    };

    const dfs = (x: number) => {
        processVertexEarly(x);
        let children = 0;
        for (const y of list.a[x]) {
            if (!visited[y]) {
                children += 1;
            }
            processEdge(x, y);
        }
        processVertexLate(x, children);
    };

    dfs(0);

    return articuls;
}
