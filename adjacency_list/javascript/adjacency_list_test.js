import assert from 'assert';
import AdjacencyList from './adjacency_list';

const graph = {
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
};

function testConstruct() {
    const list = new AdjacencyList(graph);
    assert.deepStrictEqual(list.a, [
        [1, 4, 5],
        [0, 2, 4],
        [1, 3],
        [2, 4],
        [0, 1, 3],
        [0],
    ]);
}

function testBreadthFirstSearch() {
    const list = new AdjacencyList(graph);
    const vertices = [];
    list.breadthFirstSearch(0, x => vertices.push(x));
    assert.deepStrictEqual(vertices, [0, 1, 4, 5, 2, 3]);
}

function testDepthFirstSearch() {
    const list = new AdjacencyList(graph);
    const vertices = [];
    list.depthFirstSearch(0, x => vertices.push(x));
    assert.deepStrictEqual(vertices, [0, 1, 2, 3, 4, 5]);
}

testConstruct();
testBreadthFirstSearch();
testDepthFirstSearch();
