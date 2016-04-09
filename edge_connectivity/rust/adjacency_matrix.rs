use std::ops::{Index, IndexMut};
use std::iter::{Iterator, repeat};

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

        for &Edge { x, y } in &g.edges {
            matrix[x][y] = 1;
            if !g.directed {
                matrix[y][x] = 1;
            }
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

// Breadth-first search.

pub struct BreadthFirstSearch<'a> {
    matrix: &'a AdjacencyMatrix,
    visited: Vec<bool>,
    queue: Vec<usize>,
    y: usize,
}

impl AdjacencyMatrix {
    pub fn breadth_first_search(&self, start: usize) -> BreadthFirstSearch {
        let mut visited = vec!(false; self.size());
        visited[start] = true;

        BreadthFirstSearch {
            matrix: self,
            visited: visited,
            queue: vec![start],
            y: 0
        }
    }
}

impl<'a> Iterator for BreadthFirstSearch<'a> {
    type Item = Edge;

    fn next(&mut self) -> Option<Edge> {
        while !self.queue.is_empty() {
            let x = self.queue[0];

            for y in self.y..self.matrix.size() {
                if self.visited[y] || self.matrix[x][y] == 0 {
                    continue;
                }
                self.visited[y] = true;
                self.queue.push(y);
                self.y = y + 1;
                return Some(Edge { x: x, y: y });
            }

            // Process the next element in the queue.
            self.queue.remove(0);
            self.y = 0;
        }

        None
    }
}

// Breadth-first search using std::iter::Unfold. In this situation there's no reason to use it over
// implementing Iterator directly. Unfold seems to shine in situations where we can just pass it a
// closure, but here we cannot use a closure because we need to return an iterator (see
// http://is.gd/2MDM1r).

// struct BFS<'a> {
//     matrix: &'a AdjacencyMatrix,
//     visited: Vec<bool>,
//     queue: Vec<usize>,
//     y: usize,
// }

// impl AdjacencyMatrix {
//     pub fn breadth_first_search(&self, start: usize) ->
//         Unfold<BFS, fn(&mut BFS) -> Option<Edge>> {

//         let mut visited = vec!(false; self.size());
//         visited[start] = true;

//         let state = BFS {
//             matrix: self,
//             visited: visited,
//             queue: vec![start],
//             y: 0
//         };

//         Unfold::new(state, unfold_breadth_first_search)
//     }
// }

// fn unfold_breadth_first_search(state: &mut BFS) -> Option<Edge> {
//     while !state.queue.is_empty() {
//         let x = state.queue[0];

//         for y in state.y..state.matrix.size() {
//             if state.visited[y] || state.matrix[x][y] == 0 {
//                 continue;
//             }

//             state.visited[y] = true;
//             state.queue.push(y);
//             state.y = y + 1;

//             return Some(Edge { x: x, y: y });
//         }

//         // Process the next element in the queue.
//         state.queue.remove(0);
//         state.y = 0;
//     }

//     None
// }

// Breadth-first search using a callback closure. The implementation is much simpler than the
// iterator-based BFS, however the external API is not as nice (forced to use a callback closure
// instead of a classic for loop).

// impl AdjacencyMatrix {
//     pub fn breadth_first_search<C>(&self, start: usize, mut callback: C)
//        where C: FnMut(Edge) -> bool {

//         let mut visited = vec!(false; self.size());
//         visited[start] = true;

//         let mut queue = vec![start];

//         while queue.len() > 0 {
//             // Dequeue first element.
//             let x = queue.remove(0);

//             for y in 0..self.size() {
//                 if visited[y] || self[x][y] == 0 {
//                     continue;
//                 }
//                 visited[y] = true;
//                 queue.push(y);
//                 // The edge callback can return true to abort the current graph traversal.
//                 if callback(Edge { x: x, y: y }) {
//                     return;
//                 }
//             }
//         }
//     }
// }
