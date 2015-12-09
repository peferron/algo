use graph::{Edge, Graph};

// vertex_cover returns a vertex cover of g whose size is at most twice as large as optimal.
pub fn vertex_cover(g: &Graph) -> Vec<usize> {
    let mut vertices = vec![];
    for edge in maximal_matching(&g.edges) {
        vertices.push(edge.x);
        vertices.push(edge.y);
    }
    vertices

    // The five lines above can be replaced with this ridiculous one-liner:
    // maximal_matching(&g.edges).iter().flat_map(|e| vec![e.x, e.y].into_iter()).collect()
    // Maybe there's a better solution?
}

// maximal_matching returns a set of edges where no two edges share a common vertex, and which
// cannot be enlarged by adding additional edges.
fn maximal_matching(edges: &Vec<Edge>) -> Vec<Edge> {
    if edges.is_empty() {
        return vec![];
    }

    let first_edge = edges[0].clone();

    // Only keep edges that do not share a common vertex with first_edge.
    let remaining_edges = edges
        .iter()
        .filter(|e| !e.shares_vertex(&first_edge))
        .cloned()
        .collect();

    let mut remaining_matching = maximal_matching(&remaining_edges);
    remaining_matching.push(first_edge);
    remaining_matching
}
