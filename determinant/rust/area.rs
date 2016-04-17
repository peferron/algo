use square_matrix::SquareMatrix;

pub fn triangle_area(ax: i64, ay: i64, bx: i64, by: i64, cx: i64, cy: i64) -> f64 {
    let matrix = SquareMatrix::from_vec(&vec![
        ax, ay, 1,
        bx, by, 1,
        cx, cy, 1,
    ]);

    (matrix.determinant().abs() as f64) / 2.
}

// The triangle_area function can be generalized to the volume of a tetrahedron, and further to the
// volume of a simplex defined by d+1 points in d dimensions.
pub fn simplex_volume(points: Vec<Vec<i64>>) -> f64 {
    let d = points.len() - 1;

    let mut matrix_vec = Vec::with_capacity((d + 1) * (d + 1));
    for point in points {
        matrix_vec.extend_from_slice(&point);
        matrix_vec.push(1);
    }

    let matrix = SquareMatrix::from_vec(&matrix_vec);
    (matrix.determinant().abs() as f64) / (factorial(d) as f64)
}

fn factorial(n: usize) -> usize {
    (2..n+1).fold(1, |f, i| f * i)
}
