use fraction::Number;
use square_matrix::SquareMatrix;

impl<T> SquareMatrix<T> where T: Number<T> {
    pub fn is_singular(&self) -> bool {
        self.determinant() == T::zero()
    }
}

pub fn triangle_area(ax: i64, ay: i64, bx: i64, by: i64, cx: i64, cy: i64) -> f64 {
    let matrix = SquareMatrix::from_vec(&vec![
        ax, ay, 1,
        bx, by, 1,
        cx, cy, 1,
    ]);

    matrix.determinant().abs() as f64 / 2.
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
    matrix.determinant().abs() as f64 / factorial(d) as f64
}

fn factorial(n: usize) -> usize {
    (2..n+1).fold(1, |f, i| f * i)
}

pub fn collinear(ax: i64, ay: i64, bx: i64, by: i64, cx: i64, cy: i64) -> bool {
    triangle_area(ax, ay, bx, by, cx, cy) == 0.
}

// Again, the collinear function can be generalized to determine if d+1 points are coplanar in d
// dimensions.
pub fn coplanar(points: Vec<Vec<i64>>) -> bool {
    simplex_volume(points) == 0.
}
