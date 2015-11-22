use std::iter::repeat;

use graph::{Graph, Edge};
use bit_vector::BitVector;

// maximal_independent_set processes vertices in order and returns the resulting maximal independent
// set in g.
pub fn maximal_independent_set(g: &Graph, vertices: &Vec<usize>) -> Vec<usize> {
    let adjacency_list = adjacency_list(g);

    let mut maximal_set = BitVector::new();
    for &x in vertices {
        let neighbors = &adjacency_list[x];
        if maximal_set.intersect(&neighbors).is_empty() {
            // x is not adjacent to any set vertices. This means x is eligible to join the set.
            maximal_set.set(x)
        }
    }

    maximal_set.to_vec()
}

// adjacency_list returns the adjacency list of g.
fn adjacency_list(g: &Graph) -> Vec<BitVector> {
    let mut adjacency_list: Vec<_> = repeat(BitVector::new()).take(g.vertex_count).collect();
    for &Edge { x, y } in &g.edges {
        adjacency_list[x].set(y);
        adjacency_list[y].set(x);
    }
    adjacency_list
}


// maximum_independent_set returns an independent set that is hopefully the maximum independent set
// in g.
pub fn maximum_independent_set(g: &Graph) -> Vec<usize> {
    let mut vertices: Vec<_> = (0..g.vertex_count).collect();

    // Sort vertices by increasing degree.
    let degrees = degrees(g);
    vertices.sort_by(|&x, &y| degrees[x].cmp(&degrees[y]));

    maximal_independent_set(g, &vertices)
}

// degrees returns the degree of all vertices in g.
fn degrees(g: &Graph) -> Vec<usize> {
    let mut degrees = vec![0; g.vertex_count];
    for &Edge { x, y } in &g.edges {
        degrees[x] += 1;
        degrees[y] += 1;
    }
    degrees
}
