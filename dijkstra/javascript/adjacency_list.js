'use strict';

module.exports = AdjacencyList;

function AdjacencyList(graph) {
    this.a = constructAdjacencyList(graph);
}

function constructAdjacencyList(graph) {
    var a = initAdjacencyList(graph.vertexCount);
    graph.edges.forEach(function(edge) {
        insertEdge(a, edge.x, edge.y, edge.distance, false);
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

function insertEdge(edges, x, y, distance, directed) {
    edges[x].push({y: y, distance: distance});
    if (!directed) {
        insertEdge(edges, y, x, distance, true);
    }
}
