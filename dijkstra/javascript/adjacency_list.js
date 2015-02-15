'use strict';

module.exports = AdjacencyList;

function AdjacencyList(graph) {
    this.a = constructAdjacencyList(graph);
}

function constructAdjacencyList(graph) {
    var a = initAdjacencyList(graph.vertexCount);
    graph.edges.forEach(function(edge) {
        insertEdge(a, edge.x, edge.y, edge.weight, graph.directed);
    });
    return a;
}

function initAdjacencyList(vertexCount) {
    var a = new Array(vertexCount);
    for (var i = 0; i < vertexCount; i++) {
        a[i] = [];
    }
    return a;
}

function insertEdge(a, x, y, weight, directed) {
    a[x].push({y: y, weight: weight});
    if (!directed) {
        insertEdge(a, y, x, weight, true);
    }
}
