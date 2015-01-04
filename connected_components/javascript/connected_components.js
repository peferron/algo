/* jshint loopfunc: true */

'use strict';

var AdjacencyList = require('./adjacency_list.js');

module.exports = connectedComponents;

function connectedComponents(graph) {
    var list = new AdjacencyList(graph);

    var currentComponent = 0;
    var components = new Array(list.a.length);

    for (var x = 0; x < list.a.length; x++) {
        if (!isNaN(components[x])) {
            // This vertex has already been processed.
            continue;
        }

        // Mark this vertex and all connected vertices with the current component number.
        components[x] = currentComponent;
        list.depthFirstSearch(x, function(y) {
            components[y] = currentComponent;
        });

        currentComponent++;
    }

    return components;
}
