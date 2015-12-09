mod graph;
mod vertex_cover;

use graph::{Edge, Graph};
use vertex_cover::vertex_cover;

fn test(g: &Graph, optimal_size: usize) {
    let cover = vertex_cover(g);
    assert!(is_vertex_cover(g, &cover));
    assert!(cover.len() <= 2 * optimal_size);
}

fn is_vertex_cover(g: &Graph, vertices: &Vec<usize>) -> bool {
    g.edges.iter().all(|e| vertices.contains(&e.x) || vertices.contains(&e.y))
}

#[test]
fn test_zero_vertices() {
    test(&Graph {
        vertex_count: 0,
        edges: vec![],
    }, 0)
}

#[test]
fn test_one_vertex() {
    test(&Graph {
        vertex_count: 1,
        edges: vec![],
    }, 0)
}

#[test]
fn test_two_vertices_zero_edges() {
    test(&Graph {
        vertex_count: 2,
        edges: vec![],
    }, 0)
}

#[test]
fn test_two_vertices_one_edge() {
    test(&Graph {
        vertex_count: 2,
        edges: vec![
            Edge { x: 0, y: 1 },
        ],
    }, 1); // An optimal vertex covers is [0].
}

#[test]
fn test_first_wikipedia_example() {
    // Example taken from https://en.wikipedia.org/wiki/Vertex_cover
    test(&Graph {
        vertex_count: 6,
        edges: vec![
            Edge { x: 0, y: 1 },
            Edge { x: 0, y: 2 },
            Edge { x: 1, y: 2 },
            Edge { x: 1, y: 3 },
            Edge { x: 1, y: 4 },
            Edge { x: 1, y: 5 },
        ],
    }, 2); // An optimal vertex cover is [0, 1].
}

#[test]
fn test_second_wikipedia_example() {
    // Example taken from https://en.wikipedia.org/wiki/Vertex_cover
    test(&Graph {
        vertex_count: 7,
        edges: vec![
            Edge { x: 0, y: 1 },
            Edge { x: 0, y: 2 },
            Edge { x: 1, y: 2 },
            Edge { x: 1, y: 3 },
            Edge { x: 3, y: 4 },
            Edge { x: 3, y: 5 },
        ],
    }, 3); // An optimal vertex cover is [1, 2, 3].
}

#[test]
fn test_skiena() {
    // Example from http://www3.cs.stonybrook.edu/~algorith/files/vertex-cover.shtml
    test(&Graph {
        vertex_count: 16,
        edges: vec![
            Edge { x: 0, y: 7 },
            Edge { x: 1, y: 7 },
            Edge { x: 2, y: 7 },
            Edge { x: 3, y: 7 },
            Edge { x: 4, y: 7 },
            Edge { x: 5, y: 7 },
            Edge { x: 6, y: 7 },
            Edge { x: 7, y: 8 },
            Edge { x: 8, y: 9 },
            Edge { x: 8, y: 10 },
            Edge { x: 8, y: 11 },
            Edge { x: 8, y: 12 },
            Edge { x: 8, y: 13 },
            Edge { x: 8, y: 14 },
            Edge { x: 8, y: 15 },
        ],
    }, 2); // An optimal vertex cover is [7, 8].
}
