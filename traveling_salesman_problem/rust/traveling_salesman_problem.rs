use std::u32;

use graph::Graph;
use adjacency_matrix::AdjacencyMatrix;

pub fn traveling_salesman_problem(g: &Graph) -> Vec<usize> {
    if g.vertex_count == 0 {
        return vec![];
    }
    let m = AdjacencyMatrix::from_graph(&g);
    optimize_tour(&construct_tour(&m), &m)
}

// construct_tour uses incremental insertion (furthest point) to create a tour.
fn construct_tour(m: &AdjacencyMatrix) -> Vec<usize> {
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
        let prev_vertex = if i == 0 { tour[tour.len() - 1] } else { tour[i - 1] };
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
    let mut optimized_tour = tour.to_vec();
    while let Some(swapped_tour) = find_optimized_swapped_tour(&optimized_tour, m) {
        optimized_tour = swapped_tour
    }
    optimized_tour
}

fn find_optimized_swapped_tour(tour: &Vec<usize>, m: &AdjacencyMatrix) -> Option<Vec<usize>> {
    for i in 0..tour.len() - 1 {
        for j in i + 1..tour.len() {
            let new_tour = swap_tour(&tour, i, j);
            if m.distance(&new_tour) < m.distance(&tour) {
                return Some(new_tour);
            }
        }
    }
    None
}

fn swap_tour(tour: &Vec<usize>, i: usize, j: usize) -> Vec<usize> {
    let mut swapped_tour = vec![];
    for x in 0..i {
        swapped_tour.push(tour[x]);
    }
    for x in (i..j + 1).rev() {
        swapped_tour.push(tour[x]);
    }
    for x in j + 1..tour.len() {
        swapped_tour.push(tour[x]);
    }
    swapped_tour
}
