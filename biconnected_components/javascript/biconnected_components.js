import AdjacencyList from './adjacency_list';

export default function articulations(graph) {
    if (graph.directed) {
        throw new Error('This algorithm only supports undirected graphs');
    }

    if (graph.vertexCount === 0) {
        return [];
    }

    const articuls = [];
    const list = new AdjacencyList(graph);
    const visited = new Array(list.a.length);
    const depth = new Array(list.a.length);
    const lowpoint = new Array(list.a.length);
    const parent = new Array(list.a.length);
    let currentDepth = 0;

    const processVertexEarly = x => {
        visited[x] = true;
        depth[x] = currentDepth;
        lowpoint[x] = currentDepth;
        currentDepth += 1;
    };

    const processEdge = (x, y) => {
        if (!visited[y]) {
            parent[y] = x;
            dfs(y);
            if (parent[x] !== undefined && lowpoint[y] >= depth[x]) {
                articuls.push(x);
            }
            lowpoint[x] = Math.min(lowpoint[x], lowpoint[y]);
        } else if (y !== parent[x] && depth[y] < depth[x]) {
            lowpoint[x] = Math.min(lowpoint[x], depth[y]);
        }
    };

    const processVertexLate = (x, children) => {
        if (parent[x] === undefined && children > 1) {
            articuls.push(x);
        }
    };

    const dfs = x => {
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
