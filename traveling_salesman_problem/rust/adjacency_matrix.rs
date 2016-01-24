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

        for &Edge { x, y, distance } in &g.edges {
            matrix[x][y] = distance;
            matrix[y][x] = distance;
        }

        matrix
    }

    pub fn size(&self) -> usize {
        self.rows.len()
    }

    pub fn distance(&self, tour: &Vec<usize>) -> u32 {
        // TODO: change to reduce
        let mut distance = 0;
        for i in 0..tour.len() {
            let j = if i < tour.len() - 1 { i + 1 } else { 0 };
            distance += self[tour[i]][tour[j]];
        }
        distance
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
