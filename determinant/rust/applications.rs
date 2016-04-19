use fraction::Number;
use square_matrix::SquareMatrix;

//
// Singularity
//

impl<T> SquareMatrix<T> where T: Number<T> {
    pub fn is_singular(&self) -> bool {
        self.determinant() == T::zero()
    }
}

//
// Area & volume
//

pub fn triangle_area(ax: i64, ay: i64, bx: i64, by: i64, cx: i64, cy: i64) -> f64 {
    triangle_area_signed(ax, ay, bx, by, cx, cy).abs()
}

fn triangle_area_signed(ax: i64, ay: i64, bx: i64, by: i64, cx: i64, cy: i64) -> f64 {
    let matrix = SquareMatrix::from_vec(&vec![
        ax, ay, 1,
        bx, by, 1,
        cx, cy, 1,
    ]);

    matrix.determinant() as f64 / 2.
}

// The triangle_area function can be generalized to the volume of a tetrahedron, and further to the
// volume of a simplex defined by d+1 points in d dimensions.
pub fn simplex_volume(points: &Vec<Vec<i64>>) -> f64 {
    simplex_volume_signed(points).abs()
}

fn simplex_volume_signed(points: &Vec<Vec<i64>>) -> f64 {
    let d = points.len() - 1;

    let mut matrix_vec = Vec::with_capacity((d + 1) * (d + 1));
    for point in points {
        matrix_vec.extend_from_slice(&point);
        matrix_vec.push(1);
    }

    let matrix = SquareMatrix::from_vec(&matrix_vec);
    matrix.determinant() as f64 / factorial(d) as f64
}

fn factorial(n: usize) -> usize {
    (2..n+1).fold(1, |f, i| f * i)
}

//
// Collinearity & coplanarity
//

pub fn collinear(ax: i64, ay: i64, bx: i64, by: i64, cx: i64, cy: i64) -> bool {
    triangle_area(ax, ay, bx, by, cx, cy) == 0.
}

// Again, the collinear function can be generalized to determine if d+1 points are coplanar in d
// dimensions.
pub fn coplanar(points: &Vec<Vec<i64>>) -> bool {
    simplex_volume(points) == 0.
}

//
// Side of a point relative to a line
//

#[derive(Debug, PartialEq)]
pub enum LineSide {
    Left,
    Right,
    On,
}

// Does c lie to the left, to the right, or on the directed line that passes through a before b?
// Note that "left" and "right" are not relative to the x-axis, but to the direction of the line.
pub fn line_side(ax: i64, ay: i64, bx: i64, by: i64, cx: i64, cy: i64) -> LineSide {
    let area = triangle_area_signed(ax, ay, bx, by, cx, cy);
    if area > 0. {
        LineSide::Left
    } else if area < 0. {
        LineSide::Right
    } else {
        LineSide::On
    }
}

#[derive(Debug, PartialEq)]
pub enum PlaneSide {
    Above,
    Below,
    On,
}

// The line_side function can be generalized to answering if a point lies above, below, or on an
// oriented plane defined by d points in d dimensions.
// Note that "above" and "below" are not relative to the x-axis, but relative to the orientation of
// the plane.
pub fn plane_side(plane: &Vec<Vec<i64>>, point: &Vec<i64>) -> PlaneSide {
    let mut points = plane.clone();
    points.push(point.clone());

    let area = simplex_volume_signed(&points);

    if area > 0. {
        PlaneSide::Above
    } else if area < 0. {
        PlaneSide::Below
    } else {
        PlaneSide::On
    }
}
