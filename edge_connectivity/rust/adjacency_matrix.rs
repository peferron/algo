use std::ops::{Index, IndexMut};
use std::iter::repeat;

use graph::{Edge, Graph};

#[derive(Debug)]
pub struct AdjacencyMatrix {
    rows: Vec<Vec<u32>>,
}

impl AdjacencyMatrix {
    fn new(size: usize) -> AdjacencyMatrix {
        let row = vec![0; size];
        let rows = repeat(row).take(size).collect();
        AdjacencyMatrix { rows: rows }
    }

    pub fn from_graph(g: &Graph) -> AdjacencyMatrix {
        let mut m = AdjacencyMatrix::new(g.vertex_count);
        for edge in &g.edges {
            m[edge.x][edge.y] = 1;
            if !g.directed {
                m[edge.y][edge.x] = 1;
            }
        }
        m
    }

    pub fn size(&self) -> usize {
        self.rows.len()
    }

    pub fn breadth_first_search<C>(&self, start: usize, mut callback: C) where C: FnMut(Edge) -> bool {
        let mut visited = vec!(false; self.size());
        visited[start] = true;

        let mut queue = vec![start];

        while queue.len() > 0 {
            // Dequeue first element.
            let x = queue.remove(0);

            for y in 0..self.size() {
                if visited[y] || self[x][y] == 0 {
                    continue;
                }
                visited[y] = true;
                queue.push(y);
                // The edge callback can return true to abort the current graph traversal.
                if callback(Edge { x: x, y: y }) {
                    return;
                }
            }
        }
    }
}

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

