use std::iter::{repeat};
use std::ops::{Index, IndexMut};

use graph::{Edge, Graph};

pub struct AdjacencyMatrix {
    rows: Vec<Vec<u32>>,
}

impl AdjacencyMatrix {
    fn new(size: usize) -> Self {
        let row = vec![0; size];
        let rows = repeat(row).take(size).collect();

        AdjacencyMatrix { rows: rows }
    }

    pub fn from_graph(g: &Graph) -> Self {
        let mut matrix = AdjacencyMatrix::new(g.vertex_count);

        for &Edge { x, y, d } in &g.edges {
            matrix[x][y] = d;
            matrix[y][x] = d;
        }

        matrix
    }

    pub fn size(&self) -> usize {
        self.rows.len()
    }
}

// For convenience, enable writing matrix[x] instead of matrix.rows[x].

impl Index<usize> for AdjacencyMatrix {
    type Output = Vec<u32>;

    fn index<'a>(&'a self, _index: usize) -> &'a Vec<u32> {
        &self.rows[_index]
    }
}

impl IndexMut<usize> for AdjacencyMatrix {
    fn index_mut<'a>(&'a mut self, _index: usize) -> &'a mut Vec<u32> {
        &mut self.rows[_index]
    }
}
