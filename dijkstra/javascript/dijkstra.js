/* jshint loopfunc: true */

'use strict';

var Graph = require('./graph.js');

module.exports = function(info, start, end) {
    var g = new Graph(info);
    return dijkstra(g, start, end);
};

function dijkstra(g, start, end) {
    var visited = new Array(g.vertexCount);
    var distances = new Array(g.vertexCount);
    var parents = new Array(g.vertexCount);
    for (var i = 0; i < g.vertexCount; i++) {
        visited[i] = false;
        distances[i] = Infinity;
        parents[i] = -1;
    }
    distances[start] = 0;

    var x = start;
    while (x >= 0) {
        if (x === end) {
            return path(end, parents);
        }

        var dx = distances[x];
        g.edges[x].forEach(function(edge) {
            var dy = dx + edge.distance;
            if (dy < distances[edge.y]) {
                distances[edge.y] = dy;
                parents[edge.y] = x;
            }
        });

        visited[x] = true;
        x = indexOfMinimumDistance(distances, visited);
    }

    return null;
}

function path(end, parents) {
    if (end < 0) {
        return [];
    }
    return path(parents[end], parents).concat([end]);
}

function indexOfMinimumDistance(distances, visited) {
    var minIndex = -1;
    var minDistance = Infinity;
    distances.forEach(function(d, i) {
        if (!visited[i] && d < minDistance) {
            minIndex = i;
            minDistance = d;
        }
    });
    return minIndex;
}
