export interface Vertex {
    label: number;
    neighbors: this[];
}

export function cloneRecursive(source: Vertex): Vertex {
    const clones = new Map<Vertex, Vertex>();
    return cloneRecursiveHelper(source, clones);
}

function cloneRecursiveHelper(source: Vertex, clones: Map<Vertex, Vertex>): Vertex {
    if (clones.has(source)) {
        return clones.get(source)!;
    }

    const cloned: Vertex = {label: source.label, neighbors: []};
    clones.set(source, cloned);
    cloned.neighbors = source.neighbors.map(n => cloneRecursiveHelper(n, clones));
    return cloned;
}

export function cloneIterative(source: Vertex): Vertex {
    const originals = [source];
    const clones = new Map<Vertex, Vertex>();
    clones.set(source, {label: source.label, neighbors: []});

    while (originals.length > 0) {
        const original = originals.pop()!;
        const cloned = clones.get(original)!;

        for (const neighbor of original.neighbors) {
            let clonedNeighbor = clones.get(neighbor);

            if (!clonedNeighbor) {
                clonedNeighbor = {label: neighbor.label, neighbors: []};
                clones.set(neighbor, clonedNeighbor);
                originals.push(neighbor);
            }

            cloned.neighbors.push(clonedNeighbor);
        }
    }

    return clones.get(source)!;
}
