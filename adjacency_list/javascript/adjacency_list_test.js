'use strict';

var assert = require('assert');

var AdjacencyList = require('./adjacency_list.js');

var graph = {
    vertexCount: 6,
    edges: [
        [0, 1],
        [0, 4],
        [0, 5],
        [1, 2],
        [1, 4],
        [2, 3],
        [3, 4]
    ]
};

function testConstruct() {
    var list = new AdjacencyList(graph);
    assert.deepEqual(list.a, [
        [1, 4, 5],
        [0, 2, 4],
        [1, 3],
        [2, 4],
        [0, 1, 3],
        [0]
    ]);
}

function testBreadthFirstSearch() {
    var list = new AdjacencyList(graph);
    var vertices = [];
    list.breadthFirstSearch(0, vertices.push.bind(vertices));
    assert.deepEqual(vertices, [0, 1, 4, 5, 2, 3]);
}

function testDepthFirstSearch() {
    var list = new AdjacencyList(graph);
    var vertices = [];
    list.depthFirstSearch(0, vertices.push.bind(vertices));
    assert.deepEqual(vertices, [0, 1, 2, 3, 4, 5]);
}

testConstruct();
testBreadthFirstSearch();
testDepthFirstSearch();

console.log('All tests OK.');
