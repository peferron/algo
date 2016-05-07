use std::num::Zero;
use fraction::Fraction;
use square_matrix::SquareMatrix;

impl SquareMatrix<i32> {
    pub fn determinant(&self) -> i32 {
        let (upper, swaps) = self.to_fractions().lu_decomposition_upper();
        let product = upper.diagonal_product().to_i32();

        if swaps % 2 == 0 {
            product
        } else {
            -product
        }
    }

    fn to_fractions(&self) -> SquareMatrix<Fraction> {
        let fractions = self.data.iter().map(|&v| Fraction::from_i32(v)).collect();
        SquareMatrix::from_vec(&fractions)
    }
}

impl SquareMatrix<Fraction> {
    fn lu_decomposition_upper(&self) -> (SquareMatrix<Fraction>, usize) {
        let mut upper = self.clone();
        let mut swaps = 0;

        for j in 0..upper.order {
            swaps += upper.eliminate_column(j);
        }

        (upper, swaps)
    }

    fn eliminate_column(&mut self, column: usize) -> usize {
        // Eliminate elements in the column-th column, below the column-th row
        let mut swaps = 0;
        for i in (column + 1)..self.order {
            if self[(i, column)] == Fraction::zero() {
                continue;
            }

            if self[(column, column)] == Fraction::zero() {
                self.swap_rows(column, i);
                swaps += 1;
                continue;
            }

            // Use the value at (column, column) to cancel the value at (i, column).
            let factor = self[(i, column)] / self[(column, column)];
            for j in column..self.order {
                self[(i, j)] = self[(i, j)] - factor * self[(column, j)];
            }
        }
        swaps
    }

    fn swap_rows(&mut self, row_a: usize, row_b: usize) {
        for j in 0..self.order {
            self.data.swap(row_a * self.order + j, row_b * self.order + j);
        }
    }

    fn diagonal_product(&self) -> Fraction {
        let mut product = self[(0, 0)]; // Let's assume that order > 0.
        for i in 1..self.order {
            product = product * self[(i, i)];
        }
        product
    }
}
