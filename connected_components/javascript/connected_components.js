import AdjacencyList from './adjacency_list';

export default function connectedComponents(graph) {
    if (graph.directed) {
        throw new Error('This algorithm only supports undirected graphs');
    }

    const list = new AdjacencyList(graph);
    const components = new Array(list.a.length);
    let currentComponent = 0;

    for (let x = 0; x < list.a.length; x += 1) {
        if (components[x] !== undefined) {
            // This vertex has already been processed.
            continue;
        }

        // Mark this vertex and all connected vertices with the current component number.
        list.depthFirstSearch(x, y => {
            components[y] = currentComponent;
        });

        currentComponent += 1;
    }

    return components;
}
