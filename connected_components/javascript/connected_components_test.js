'use strict';

var assert = require('assert');

var connectedComponents = require('./connected_components.js');

var tests = [
    {
        graph: {
            vertexCount: 0,
            edges: []
        },
        components: []
    },
    {
        graph: {
            vertexCount: 1,
            edges: []
        },
        components: [0]
    },
    {
        graph: {
            vertexCount: 2,
            edges: []
        },
        components: [0, 1]
    },
    {
        graph: {
            vertexCount: 2,
            edges: [
                [0, 1]
            ]
        },
        components: [0, 0]
    },
    {
        graph: {
            vertexCount: 7,
            edges: [
                [0, 2],
                [2, 3],
                [2, 5],
                [1, 4]
            ]
        },
        components: [0, 1, 0, 0, 1, 0, 2]
    }
];

function runTest(test) {
    assert.deepEqual(connectedComponents(test.graph), test.components);
}

tests.forEach(runTest);

console.log('All tests OK.');
