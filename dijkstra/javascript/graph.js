'use strict';

module.exports = Graph;

function Graph(info) {
    this.vertexCount = info.vertexCount;
    this.edges = constructEdges(info);
}

function constructEdges(info) {
    var edges = initEdges(info.vertexCount);
    info.edges.forEach(function(edge) {
        insertEdge(edges, edge.x, edge.y, edge.distance, false);
    });
    return edges;
}

function initEdges(vertexCount) {
    var edges = new Array(vertexCount);
    for (var i = 0; i < vertexCount; i++) {
        edges[i] = [];
    }
    return edges;
}

function insertEdge(edges, x, y, distance, directed) {
    edges[x].push({y: y, distance: distance});
    if (!directed) {
        insertEdge(edges, y, x, distance, true);
    }
}
