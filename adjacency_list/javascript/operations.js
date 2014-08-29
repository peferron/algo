/* jshint loopfunc: true */

'use strict';

exports.breadthFirstSearch = function(list, start, vertexCallback) {
    if (!list.length) {
        return;
    }

    var processed = new Array(list.length);
    var queue = [];

    vertexCallback(start);
    processed[start] = true;
    queue.push(start);

    while (queue.length) {
        var x = queue.shift();
        var edges = list[x];
        edges.forEach(function(y) {
            if (processed[y]) {
                return;
            }

            vertexCallback(y);
            processed[y] = true;
            queue.push(y);
        });
    }
};

exports.depthFirstSearch = function(list, start, vertexCallback) {
    var processed = new Array(list.length);

    function dfs(x) {
        if (processed[x]) {
            return;
        }
        vertexCallback(x);
        processed[x] = true;
        var edges = list[x];
        edges.forEach(dfs);
    }

    dfs(start);
};
