#[derive(Clone)]
pub struct Edge {
    pub x: usize,
    pub y: usize,
}

pub struct Graph {
    pub vertex_count: usize,
    pub edges: Vec<Edge>,
}

impl Edge {
    pub fn shares_vertex(&self, other: &Edge) -> bool {
        self.x == other.x || self.x == other.y || self.y == other.x || self.y == other.y
    }
}
