pub struct Edge {
    pub x: usize,
    pub y: usize,
    pub distance: u32,
}

pub struct Graph {
    pub vertex_count: usize,
    pub edges: Vec<Edge>,
}
