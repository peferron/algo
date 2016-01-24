#[derive(Debug)]
pub struct Edge {
    pub x: usize,
    pub y: usize,
    pub d: u32,
}

#[derive(Debug)]
pub struct Graph {
    pub vertex_count: usize,
    pub edges: Vec<Edge>,
}
