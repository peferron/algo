#![feature(zero_one)]

mod determinant;
mod fraction;
mod square_matrix;

use square_matrix::SquareMatrix;

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
