#![feature(core)]

mod graph;
mod adjacency_matrix;
mod edge_connectivity;
mod maximum_flow;

use graph::{Edge, Graph};
use edge_connectivity::edge_connectivity;

#[test]
fn test() {
    assert_eq!(0, edge_connectivity(&Graph {
        vertex_count: 2,
        directed: false,
        edges: vec![],
    }));

    assert_eq!(1, edge_connectivity(&Graph {
        vertex_count: 2,
        directed: false,
        edges: vec![
            Edge { x: 0, y: 1 },
        ],
    }));

    assert_eq!(1, edge_connectivity(&Graph {
        vertex_count: 3,
        directed: false,
        edges: vec![
            Edge { x: 0, y: 1 },
            Edge { x: 1, y: 2 },
        ],
    }));

    assert_eq!(1, edge_connectivity(&Graph {
        vertex_count: 3,
        directed: false,
        edges: vec![
            Edge { x: 0, y: 1 },
            Edge { x: 1, y: 2 },
        ],
    }));

    assert_eq!(2, edge_connectivity(&Graph {
        vertex_count: 3,
        directed: false,
        edges: vec![
            Edge { x: 0, y: 1 },
            Edge { x: 0, y: 2 },
            Edge { x: 1, y: 2 },
        ],
    }));

    assert_eq!(2, edge_connectivity(&Graph {
        vertex_count: 4,
        directed: false,
        edges: vec![
            Edge { x: 0, y: 1 },
            Edge { x: 0, y: 2 },
            Edge { x: 1, y: 2 },
            Edge { x: 1, y: 3 },
            Edge { x: 2, y: 3 },
        ],
    }));

    assert_eq!(3, edge_connectivity(&Graph {
        vertex_count: 4,
        directed: false,
        edges: vec![
            Edge { x: 0, y: 1 },
            Edge { x: 0, y: 2 },
            Edge { x: 0, y: 3 },
            Edge { x: 1, y: 2 },
            Edge { x: 1, y: 3 },
            Edge { x: 2, y: 3 },
        ],
    }));
}
