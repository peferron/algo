'use strict';

exports.construct = function(info) {
    var list = emptyList(info.vertexCount);
    info.edges.forEach(function(edge) {
        insertEdge(list, edge[0], edge[1], false);
    });
    return list;
};

function emptyList(vertexCount) {
    var list = new Array(vertexCount);
    for (var i = 0; i < vertexCount; i++) {
        list[i] = [];
    }
    return list;
}

function insertEdge(list, x, y, directed) {
    list[x].push(y);
    if (!directed) {
        insertEdge(list, y, x, true);
    }
}

// exports.log = function(list) {
//     list.forEach(function(edges, x) {
//         var str = 'Vertex ' + x + ': ';
//         edges.forEach(function(y) {
//             str += y + ' ';
//         });
//         console.log(str);
//     });
// };
