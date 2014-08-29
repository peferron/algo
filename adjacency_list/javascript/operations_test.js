'use strict';

var assert = require('assert');

var adjacency_list = require('./adjacency_list.js');
var operations = require('./operations.js');

function testBreadthFirstSearch() {
    testSearch(operations.breadthFirstSearch, [0, 1, 4, 5, 2, 3]);
}

function testDepthFirstSearch() {
    testSearch(operations.depthFirstSearch, [0, 1, 2, 3, 4, 5]);
}

function testSearch(searchFunction, expectedVertices) {
    var list = new adjacency_list.construct({
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
    });

    adjacency_list.log(list);

    assert.strictEqual(list.length, 6);

    var vertices = [];
    var processVertex = function(x) {
        console.log('Processing vertex: ' + x);
        vertices.push(x);
    };

    searchFunction(list, 0, processVertex);

    assert.deepEqual(vertices, expectedVertices);
}

testBreadthFirstSearch();
testDepthFirstSearch();

console.log('All tests OK.');
