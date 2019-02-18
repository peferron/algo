import AdjacencyList from './adjacency_list';

export default function connectedComponents(graph) {
    if (graph.directed) {
        throw new Error('This algorithm only supports undirected graphs');
    }

    const list = new AdjacencyList(graph);
    const components = new Array(list.a.length);
    let currentComponent = 0;

    for (let x = 0; x < list.a.length; x += 1) {
        if (assignComponent(list, x, currentComponent, components)) {
            currentComponent += 1;
        }
    }

    return components;
}

function assignComponent(list, x, currentComponent, components) {
    if (components[x] !== undefined) {
        // This vertex has already been assigned to a component.
        return false;
    }

    components[x] = currentComponent;

    for (const y of list.a[x]) {
        assignComponent(list, y, currentComponent, components);
    }

    return true;
}
