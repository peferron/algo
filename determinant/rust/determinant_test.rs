#![feature(zero_one)]

mod area;
mod determinant;
mod fraction;
mod singular;
mod square_matrix;

use square_matrix::SquareMatrix;
use area::{triangle_area, simplex_volume};

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
        0, 0,
        1, 0,
        0, 1,
    ), 0.5);

    assert_eq!(triangle_area(
        -1, -2,
        14, -2,
        11, 2,
    ), 30.);

    assert_eq!(triangle_area(
        10, 20,
        10, 29,
        16, 20,
    ), 27.);
}

#[test]
fn test_simplex_volume() {
    assert_eq!(simplex_volume(vec![
        vec![0, 0],
        vec![1, 0],
        vec![0, 1],
    ]), 0.5);

    assert_eq!(simplex_volume(vec![
        vec![-1, -2],
        vec![14, -2],
        vec![11, 2],
    ]), 30.);

    assert_eq!(simplex_volume(vec![
        vec![10, 20],
        vec![10, 29],
        vec![16, 20],
    ]), 27.);

    assert_eq!(simplex_volume(vec![
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
