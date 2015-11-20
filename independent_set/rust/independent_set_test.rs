mod graph;
mod bit_vector;
mod independent_set;

use graph::{Edge, Graph};
use independent_set::{maximal_independent_set, maximum_independent_set};

fn graph_one_vertex() -> Graph {
    Graph {
        vertex_count: 1,
        edges: vec![],
    }
}

// Example taken from https://en.wikipedia.org/wiki/Clique_problem
fn graph_wikipedia() -> Graph {
    Graph {
        vertex_count: 6,
        edges: vec![
            Edge { x: 0, y: 1 },
            Edge { x: 0, y: 4 },
            Edge { x: 1, y: 2 },
            Edge { x: 1, y: 4 },
            Edge { x: 2, y: 3 },
            Edge { x: 3, y: 4 },
            Edge { x: 3, y: 5 },
        ],
    }
}

#[test]
fn test_maximal_independent_set_one_vertex() {
    let g = graph_one_vertex();
    assert_eq!(vec![0], maximal_independent_set(&g, &vec![0]));
}

#[test]
fn test_maximal_independent_set_wikipedia() {
    let g = graph_wikipedia();
    assert_eq!(vec![0, 2, 5], maximal_independent_set(&g, &vec![0, 1, 2, 3, 4, 5]));
    assert_eq!(vec![1, 3], maximal_independent_set(&g, &vec![1, 0, 2, 3, 4, 5]));
    assert_eq!(vec![0, 2, 5], maximal_independent_set(&g, &vec![2, 0, 1, 3, 4, 5]));
    assert_eq!(vec![0, 3], maximal_independent_set(&g, &vec![3, 0, 1, 2, 4, 5]));
    assert_eq!(vec![2, 4, 5], maximal_independent_set(&g, &vec![4, 0, 1, 2, 3, 5]));
    assert_eq!(vec![0, 2, 5], maximal_independent_set(&g, &vec![5, 0, 1, 2, 3, 4]));
}

#[test]
fn test_maximum_independent_set_one_vertex() {
    let g = graph_one_vertex();
    assert_eq!(vec![0], maximum_independent_set(&g));
}

#[test]
fn test_maximum_independent_set_wikipedia() {
    let g = graph_wikipedia();
    assert_eq!(vec![0, 2, 5], maximum_independent_set(&g));
}
