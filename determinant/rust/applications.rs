use fraction::Number;
use square_matrix::SquareMatrix;

#[derive(Debug, Clone, Copy)]
pub struct Point {
    pub x: i32,
    pub y: i32,
}

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

pub fn triangle_area(a: Point, b: Point, c: Point) -> f32 {
    triangle_area_signed(a, b, c).abs()
}

fn triangle_area_signed(a: Point, b: Point, c: Point) -> f32 {
    let matrix = SquareMatrix::from_vec(&vec![
        a.x, a.y, 1,
        b.x, b.y, 1,
        c.x, c.y, 1,
    ]);

    matrix.determinant() as f32 / 2.
}

// The triangle_area function can be generalized to the volume of a tetrahedron, and further to the
// volume of a simplex defined by d+1 points in d dimensions.
pub fn simplex_volume(points: &Vec<Vec<i32>>) -> f32 {
    simplex_volume_signed(points).abs()
}

fn simplex_volume_signed(points: &Vec<Vec<i32>>) -> f32 {
    let d = points.len() - 1;

    let mut matrix_vec = Vec::with_capacity((d + 1) * (d + 1));
    for point in points {
        matrix_vec.extend_from_slice(&point);
        matrix_vec.push(1);
    }

    let matrix = SquareMatrix::from_vec(&matrix_vec);
    matrix.determinant() as f32 / factorial(d) as f32
}

fn factorial(n: usize) -> usize {
    (2..n+1).fold(1, |f, i| f * i)
}

//
// Collinearity & coplanarity
//

pub fn collinear(a: Point, b: Point, c: Point) -> bool {
    triangle_area(a, b, c) == 0.
}

// Again, the collinear function can be generalized to determine if d+1 points are coplanar in d
// dimensions.
pub fn coplanar(points: &Vec<Vec<i32>>) -> bool {
    simplex_volume(points) == 0.
}

//
// Side of a point relative to a line or plane
//

#[derive(Debug, PartialEq)]
pub enum LineSide {
    Left,
    Right,
    On,
}

// Does c lie to the left, to the right, or on the directed line that passes through a before b?
// Note that "left" and "right" are not relative to the x-axis, but to the direction of the line.
pub fn line_side(a: Point, b: Point, c: Point) -> LineSide {
    match triangle_area_signed(a, b, c) {
        area if area > 0. => LineSide::Left,
        area if area < 0. => LineSide::Right,
        _ => LineSide::On,
    }
}

#[derive(Debug, PartialEq)]
pub enum PlaneSide {
    A,
    B,
    On,
}

// The line_side function can be generalized to answering if a point lies on one side, on the other
// side, or on an oriented plane defined by d points in d dimensions.
pub fn plane_side(plane: &Vec<Vec<i32>>, point: &Vec<i32>) -> PlaneSide {
    let mut points = plane.clone();
    points.push(point.clone());

    match simplex_volume_signed(&points) {
        area if area > 0. => PlaneSide::A,
        area if area < 0. => PlaneSide::B,
        _ => PlaneSide::On,
    }
}


//
// Side of a point relative to a circle
//

#[derive(Debug, PartialEq)]
pub enum CircleSide {
    Inside,
    Outside,
    On,
}

pub fn circle_side(circle: [Point; 3], point: Point) -> CircleSide {
    let [c0, c1, c2] = circle;

    let matrix = SquareMatrix::from_vec(&vec![
        c0.x, c0.y, c0.x.pow(2) + c0.y.pow(2), 1,
        c1.x, c1.y, c1.x.pow(2) + c1.y.pow(2), 1,
        c2.x, c2.y, c2.x.pow(2) + c2.y.pow(2), 1,
        point.x, point.y, point.x.pow(2) + point.y.pow(2), 1,
    ]);

    match matrix.determinant() {
        d if d > 0 => CircleSide::Inside,
        d if d < 0 => CircleSide::Outside,
        _ => CircleSide::On,
    }
}

//
// Intersection between line and line segment
//

pub fn intersects(line: [Point; 2], segment: [Point; 2]) -> bool {
    line_side(line[0], line[1], segment[0]) != line_side(line[0], line[1], segment[1])
}
