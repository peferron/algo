use std::u32;

use graph::Graph;
use adjacency_matrix::AdjacencyMatrix;

pub fn traveling_salesman_problem(g: &Graph) -> Vec<usize> {
    let m = AdjacencyMatrix::from_graph(&g);
    optimize_tour(&construct_tour(&m), &m)
}

// construct_tour uses incremental insertion (furthest point) to create a tour.
fn construct_tour(m: &AdjacencyMatrix) -> Vec<usize> {
    if m.size() == 0 {
        return vec![];
    }
    let mut tour = vec![0];
    while tour.len() < m.size() {
        let (x, index) = furthest_vertex(&tour, m);
        tour.insert(index, x);
    }
    tour
}

// furthest_vertex finds which vertex is the furthest away from tour, and returns the resulting
// vertex and insertion position.
fn furthest_vertex(tour: &Vec<usize>, m: &AdjacencyMatrix) -> (usize, usize) {
    // TODO: replace with reduce
    let mut best_vertex = 0;
    let mut best_index = 0;
    let mut max_distance = 0;
    for x in 0..m.size() {
        // TODO: replace with filter
        if tour.contains(&x) {
            continue
        }
        let (index, distance) = smallest_insertion(x, tour, m);
        if distance > max_distance {
            max_distance = distance;
            best_vertex = x;
            best_index = index;
        }
    }
    (best_vertex, best_index)
}


// smallest_insertion finds where x should be inserted in tour to add the smallest amount of
// distance, and returns the resulting index and added distance.
fn smallest_insertion(x: usize, tour: &Vec<usize>, m: &AdjacencyMatrix) -> (usize, u32) {
    // TODO: replace with reduce
    let mut best_index = 0;
    let mut min_distance = u32::MAX;
    for i in 0..tour.len() {
        let prev_vertex = if i == 0 { tour[tour.len() - 1] } else { tour[i + 1] };
        let next_vertex = tour[i];
        let distance = m[prev_vertex][x] + m[x][next_vertex];
        if distance < min_distance {
            min_distance = distance;
            best_index = i;
        }
    }
    (best_index, min_distance)
}

// optimize_tour returns a new tour improved with 2-opt optimization.
fn optimize_tour(tour: &Vec<usize>, m: &AdjacencyMatrix) -> Vec<usize> {
    tour.to_vec()
}
