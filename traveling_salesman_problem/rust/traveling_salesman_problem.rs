use graph::Graph;
use adjacency_matrix::AdjacencyMatrix;

pub fn traveling_salesman_problem(g: &Graph) -> Vec<usize> {
    if g.vertex_count == 0 {
        return vec![];
    }
    let m = AdjacencyMatrix::from_graph(&g);
    optimize_tour(&construct_tour(&m), &m)
}

// construct_tour incrementally inserts the furthest vertex to create a tour.
fn construct_tour(m: &AdjacencyMatrix) -> Vec<usize> {
    let mut tour = vec![0];
    while tour.len() < m.size() {
        let (x, index) = furthest_vertex(&tour, m);
        tour.insert(index, x);
    }
    tour
}

// furthest_vertex returns the vertex furthest away from tour, and the position at which it should
// be inserted in tour to add the smallest amount of distance.
fn furthest_vertex(tour: &Vec<usize>, m: &AdjacencyMatrix) -> (usize, usize) {
    let (x, (index, _)) = (0..m.size())
        .filter(|x| !tour.contains(x))
        .map(|x| (x, smallest_insertion(x, tour, m)))
        .max_by_key(|&(_, (_, distance))| distance)
        .unwrap();

    (x, index)
}

// smallest_insertion finds where x should be inserted in tour to add the smallest amount of
// distance, and returns the resulting index and added distance.
fn smallest_insertion(x: usize, tour: &Vec<usize>, m: &AdjacencyMatrix) -> (usize, u32) {
    (0..tour.len())
        .map(|i| {
            let prev_vertex = if i == 0 { tour[tour.len() - 1] } else { tour[i - 1] };
            let next_vertex = tour[i];
            m[prev_vertex][x] + m[x][next_vertex]
        })
        .enumerate()
        .min_by_key(|&(_, distance)| distance)
        .unwrap()
}

// optimize_tour returns a new tour improved with 2-opt optimization.
fn optimize_tour(tour: &Vec<usize>, m: &AdjacencyMatrix) -> Vec<usize> {
    let mut optimized_tour = tour.to_vec();
    while let Some(swapped_tour) = find_optimized_tour(&optimized_tour, m) {
        optimized_tour = swapped_tour
    }
    optimized_tour
}

// find_optimized_tour tries to return a new tour obtained by swapping two vertices of tour and that
// has a smaller distance than tour.
fn find_optimized_tour(tour: &Vec<usize>, m: &AdjacencyMatrix) -> Option<Vec<usize>> {
    for i in 0..tour.len()-1 {
        for j in i+1..tour.len() {
            let new_tour = swap_tour(&tour, i, j);
            if m.distance(&new_tour) < m.distance(&tour) {
                return Some(new_tour);
            }
        }
    }
    None
}

// swap_tour returns a new tour where the positions of the vertices at indexes i and j have been
// swapped.
fn swap_tour(tour: &Vec<usize>, i: usize, j: usize) -> Vec<usize> {
    let a = 0..i;
    let b = (i..j+1).rev();
    let c = j+1..tour.len();
    a.chain(b).chain(c).map(|index| tour[index]).collect()
}
