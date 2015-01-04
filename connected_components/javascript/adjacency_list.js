/* jshint loopfunc: true */

'use strict';

module.exports = AdjacencyList;

function AdjacencyList(graph) {
    this.a = constructAdjacencyList(graph);
}

AdjacencyList.prototype.depthFirstSearch = function(start, earlyCallback) {
    depthFirstSearch(this.a, start, earlyCallback);
};

function constructAdjacencyList(graph) {
    var a = initAdjacencyList(graph.vertexCount);
    graph.edges.forEach(function(edge) {
        insertEdge(a, edge[0], edge[1], false);
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

function insertEdge(a, x, y, directed) {
    a[x].push(y);
    if (!directed) {
        insertEdge(a, y, x, true);
    }
}

function depthFirstSearch(a, start, earlyCallback) {
    var processed = new Array(a.length);

    function dfs(x) {
        if (processed[x]) {
            return;
        }
        processed[x] = true;
        earlyCallback(x);
        var edges = a[x];
        edges.forEach(dfs);
    }

    dfs(start);
}
