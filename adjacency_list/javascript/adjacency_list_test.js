import assert from 'assert';
import {AdjacencyList, TREE, BACK, FORWARD, CROSS} from './adjacency_list';

const tests = [
    {
        graph: {
            vertexCount: 6,
            directed: false,
            edges: [
                [0, 1],
                [0, 4],
                [0, 5],
                [1, 2],
                [1, 4],
                [2, 3],
                [3, 4],
            ],
        },
        list: [
            [1, 4, 5],
            [0, 2, 4],
            [1, 3],
            [2, 4],
            [0, 1, 3],
            [0],
        ],
        bfs: {
            vertices: [0, 1, 4, 5, 2, 3],
            edges: [
                [0, 1],
                [0, 4],
                [0, 5],
                [1, 2],
                [1, 4],
                [4, 3],
                [2, 3],
            ],
        },
        dfs: {
            verticesPreOrder: [0, 1, 2, 3, 4, 5],
            verticesPostOrder: [4, 3, 2, 1, 5, 0],
            edges: [
                [0, 1, TREE],
                [1, 2, TREE],
                [2, 3, TREE],
                [3, 4, TREE],
                [4, 0, BACK],
                [4, 1, BACK],
                [0, 5, TREE],
            ],
        },
    },
    {
        graph: {
            vertexCount: 8,
            directed: true,
            edges: [
                [0, 1],
                [1, 2],
                [1, 3],
                [1, 4],
                [2, 0],
                [3, 0],
                [3, 5],
                [3, 7],
                [4, 5],
                [5, 6],
                [6, 4],
                [7, 5],
            ],
        },
        list: [
            [1],
            [2, 3, 4],
            [0],
            [0, 5, 7],
            [5],
            [6],
            [4],
            [5],
        ],
        bfs: {
            vertices: [0, 1, 2, 3, 4, 5, 7, 6],
            edges: [
                [0, 1],
                [1, 2],
                [1, 3],
                [1, 4],
                [2, 0],
                [3, 0],
                [3, 5],
                [3, 7],
                [4, 5],
                [5, 6],
                [7, 5],
                [6, 4],
            ],
        },
        dfs: {
            verticesPreOrder: [0, 1, 2, 3, 5, 6, 4, 7],
            verticesPostOrder: [2, 4, 6, 5, 7, 3, 1, 0],
            edges: [
                [0, 1, TREE],
                [1, 2, TREE],
                [2, 0, BACK],
                [1, 3, TREE],
                [3, 0, BACK],
                [3, 5, TREE],
                [5, 6, TREE],
                [6, 4, TREE],
                [4, 5, BACK],
                [3, 7, TREE],
                [7, 5, CROSS],
                [1, 4, FORWARD],
            ],
        },
    },
];

for (const test of tests) {
    // Test construction.
    const list = new AdjacencyList(test.graph);
    assert.deepStrictEqual(list.a, test.list);

    // Test BFS.
    {
        const vertices = [];
        const edges = [];
        list.breadthFirstSearch(0, x => vertices.push(x), e => edges.push(e));
        assert.deepStrictEqual(vertices, test.bfs.vertices);
        assert.deepStrictEqual(edges, test.bfs.edges);
    }

    // Test DFS.
    {
        const verticesPreOrder = [];
        const verticesPostOrder = [];
        const edges = [];
        list.depthFirstSearch(0, x => verticesPreOrder.push(x), x => verticesPostOrder.push(x), e => edges.push(e));
        assert.deepStrictEqual(verticesPreOrder, test.dfs.verticesPreOrder);
        assert.deepStrictEqual(verticesPostOrder, test.dfs.verticesPostOrder);
        assert.deepStrictEqual(edges, test.dfs.edges);
    }
}
