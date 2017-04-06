mod applications;
mod determinant;
mod fraction;
mod square_matrix;

use square_matrix::SquareMatrix;
use applications::*;

#[test]
fn test_determinant() {
    assert_eq!(SquareMatrix::from_vec(&vec![
        1, 2,
        3, 4
    ]).determinant(), -2);

    assert_eq!(SquareMatrix::from_vec(&vec![
        3, 6, 5,
        6, 2, 9,
        4, 7, 3,
    ]).determinant(), 107);

    assert_eq!(SquareMatrix::from_vec(&vec![
        6,   0, 12, 0,
        0,   3, 5,  3,
        -12, 2, -4, 0,
        0,   1, 0,  0,
    ]).determinant(), -360);

    assert_eq!(SquareMatrix::from_vec(&vec![
        3, 2, 1, 1,
        1, 2, 4, 1,
        4, 0, 3, 1,
        1, 1, 7, 1,
    ]).determinant(), -5);
}

#[test]
fn test_triangle_area() {
    assert_eq!(triangle_area(
        Point { x: 0, y: 0 },
        Point { x: 1, y: 0 },
        Point { x: 0, y: 1 },
    ), 0.5);

    assert_eq!(triangle_area(
         Point { x: -1, y: -2 },
         Point { x: 14, y: -2 },
         Point { x: 11, y: 2 },
    ), 30.);

    assert_eq!(triangle_area(
         Point { x: 10, y: 20 },
         Point { x: 10, y: 29 },
         Point { x: 16, y: 20 },
    ), 27.);
}

#[test]
fn test_simplex_volume() {
    assert_eq!(simplex_volume(&vec![
        vec![0, 0],
        vec![1, 0],
        vec![0, 1],
    ]), 0.5);

    assert_eq!(simplex_volume(&vec![
        vec![-1, -2],
        vec![14, -2],
        vec![11, 2],
    ]), 30.);

    assert_eq!(simplex_volume(&vec![
        vec![10, 20],
        vec![10, 29],
        vec![16, 20],
    ]), 27.);

    assert_eq!(simplex_volume(&vec![
        vec![3, 2, 1],
        vec![1, 2, 4],
        vec![4, 0, 3],
        vec![1, 1, 7],
    ]), 5./6.);
}

#[test]
fn test_singular() {
    assert_eq!(SquareMatrix::from_vec(&vec![
        1, 1,
        0, 0,
    ]).is_singular(), true);

    assert_eq!(SquareMatrix::from_vec(&vec![
        1, 1,
        1, 0,
    ]).is_singular(), false);
}

#[test]
fn test_collinear() {
    assert_eq!(collinear(
         Point { x: 0, y: 0 },
         Point { x: 1, y: 0 },
         Point { x: 0, y: 1 },
    ), false);

     assert_eq!(collinear(
         Point { x: 0, y: 1 },
         Point { x: 2, y: 2 },
         Point { x: 6, y: 4 },
    ), true);
}

#[test]
fn test_coplanar() {
    assert_eq!(coplanar(&vec![
        vec![0, 0],
        vec![1, 0],
        vec![0, 1],
    ]), false);

    assert_eq!(coplanar(&vec![
        vec![0, 1],
        vec![2, 2],
        vec![6, 4],
    ]), true);

    assert_eq!(coplanar(&vec![
        vec![0, 1, 2],
        vec![0, 2, 9],
        vec![0, 12, -3],
        vec![0, 0, 1],
    ]), true);

    assert_eq!(coplanar(&vec![
        vec![0, 1, 2],
        vec![0, 2, 9],
        vec![5, 12, -3],
        vec![0, 0, 1],
    ]), false);
}

#[test]
fn test_line_side() {
    assert_eq!(line_side(
         Point { x: 1, y: 1 },
         Point { x: 2, y: 2 },
         Point { x: 0, y: 1 },
    ), LineSide::Left);

    assert_eq!(line_side(
         Point { x: 1, y: 1 },
         Point { x: 2, y: 2 },
         Point { x: 1, y: 0 },
    ), LineSide::Right);

    assert_eq!(line_side(
         Point { x: 1, y: 1 },
         Point { x: 2, y: 2 },
         Point { x: 3, y: 3 },
    ), LineSide::On);
}

#[test]
fn test_plane_side() {
    assert_eq!(plane_side(
        &vec![
            vec![0, 0, 0],
            vec![1, 0, 0],
            vec![0, 1, 0],
        ],
        &vec![2, 3, 5],
    ), PlaneSide::B);

    assert_eq!(plane_side(
        &vec![
            vec![0, 0, 0],
            vec![1, 0, 0],
            vec![0, 1, 0],
        ],
        &vec![2, 3, -5],
    ), PlaneSide::A);

    assert_eq!(plane_side(
        &vec![
            vec![0, 0, 0],
            vec![-1, 0, 0],
            vec![0, 1, 0],
        ],
        &vec![2, 3, 5],
    ), PlaneSide::A);

    assert_eq!(plane_side(
        &vec![
            vec![0, 0, 0],
            vec![1, 0, 0],
            vec![0, -1, 0],
        ],
        &vec![2, 3, 5],
    ), PlaneSide::A);

        assert_eq!(plane_side(
        &vec![
            vec![0, 0, 0],
            vec![-1, 0, 0],
            vec![0, -1, 0],
        ],
        &vec![2, 3, 5],
    ), PlaneSide::B);

    assert_eq!(plane_side(
        &vec![
            vec![0, 0, 0],
            vec![0, 1, 0],
            vec![1, 0, 0],
        ],
        &vec![2, 3, 0],
    ), PlaneSide::On);
}

#[test]
fn test_circle_side() {
    assert_eq!(circle_side(
         [Point { x: 0, y: 0 }, Point { x: 1, y: 1 }, Point { x: 0, y: 2 }],
         Point{ x: 0, y: 1 },
    ), CircleSide::Inside);

    assert_eq!(circle_side(
         [Point { x: 0, y: 0 }, Point { x: 1, y: 1 }, Point { x: 0, y: 2 }],
         Point{ x: 0, y: 3 },
    ), CircleSide::Outside);

    assert_eq!(circle_side(
         [Point { x: 0, y: 0 }, Point { x: 1, y: 1 }, Point { x: 0, y: 2 }],
         Point{ x: -1, y: 1 },
    ), CircleSide::On);
}

#[test]
fn test_intersects() {
    assert_eq!(intersects(
         [Point { x: 0, y: 0 }, Point { x: 1, y: 1 }],
         [Point { x: 2, y: 0 }, Point { x: 0, y: 2 }],
    ), true);

    assert_eq!(intersects(
         [Point { x: 0, y: 0 }, Point { x: 1, y: 1 }],
         [Point { x: 2, y: 0 }, Point { x: 2, y: 2 }],
    ), true);

    assert_eq!(intersects(
         [Point { x: 0, y: 0 }, Point { x: 1, y: 1 }],
         [Point { x: 2, y: 0 }, Point { x: 2, y: 1 }],
    ), false);

    assert_eq!(intersects(
         [Point { x: 0, y: 0 }, Point { x: 1, y: 1 }],
         [Point { x: 1, y: 1 }, Point { x: 2, y: 2 }],
    ), false);

    assert_eq!(intersects(
         [Point { x: 0, y: 0 }, Point { x: 1, y: 1 }],
         [Point { x: 2, y: 2 }, Point { x: 2, y: 2 }],
    ), false);
}
