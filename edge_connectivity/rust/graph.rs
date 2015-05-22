#[derive(Debug)]
pub struct Edge {
    pub x: usize,
    pub y: usize,
}

#[derive(Debug)]
pub struct Graph {
    pub vertex_count: usize,
    pub directed: bool,
    pub edges: Vec<Edge>,
}
