/* jshint loopfunc: true */

'use strict';

var AdjacencyList = require('./adjacency_list.js');

module.exports = function(graph, start, end) {
    var list = new AdjacencyList(graph);
    return dijkstra(list, start, end);
};

function dijkstra(list, start, end) {
    var n = list.a.length;

    var visited = new Array(n);
    var distances = new Array(n);
    var parents = new Array(n);
    for (var i = 0; i < n; i++) {
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
        list.a[x].forEach(function(edge) {
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
