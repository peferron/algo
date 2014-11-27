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
        x = best(distances, visited);
    }

    return null;
}

// path returns an array containing all the ancestors of x, sorted from x's oldest ancestor to x
// itself.
function path(x, parents) {
    if (x < 0) {
        return [];
    }
    return path(parents[x], parents).concat([x]);
}

// best returns the best vertex to visit, or -1 if none.
function best(distances, visited) {
    // The best vertex to visit is the unvisited vertex with the lowest initialized distance.
    var bestIndex = -1;
    var minDistance = Infinity;
    distances.forEach(function(distance, i) {
        if (!visited[i] && distance < minDistance) {
            bestIndex = i;
            minDistance = distance;
        }
    });
    return bestIndex;
}
