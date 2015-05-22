use graph::Graph;
use maximum_flow::maximum_flow;

use std::u32;

pub fn edge_connectivity(g: &Graph) -> u32 {
    assert!(!g.directed, "This edge connectivity algorithm only supports undirected graphs");

    let mut connectivity = u32::MAX;
    for i in 1..g.vertex_count {
        let flow = maximum_flow(g, 0, i);
        if flow < connectivity {
            connectivity = flow;
        }
    }
    connectivity
}
