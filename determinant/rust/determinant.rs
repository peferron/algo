use fraction::{Fraction, Number};
use square_matrix::SquareMatrix;

impl<T> SquareMatrix<T> where T: Number<T> {
    pub fn determinant(&self) -> T {
        let (upper, swaps) = self.lu_decomposition_upper();

        let diag_fraction = upper.diagonal_product();
        let diag = diag_fraction.numerator / diag_fraction.denominator;

        if swaps % 2 == 0 {
            diag
        } else {
            -diag
        }
    }

    fn lu_decomposition_upper(&self) -> (SquareMatrix<Fraction<T>>, usize) {
        let mut upper = self.to_fractions();
        let mut swaps = 0;

        for j in 0..upper.order {
            swaps += upper.eliminate_column(j);
        }

        (upper, swaps)
    }

    fn to_fractions(&self) -> SquareMatrix<Fraction<T>> {
        let fractions = self.data.iter().map(|&v| Fraction::new(v)).collect();
        SquareMatrix::from_vec(&fractions)
    }
}

impl<T> SquareMatrix<Fraction<T>> where T: Number<T> {
    fn diagonal_product(&self) -> Fraction<T> {
        let mut product = self[(0, 0)]; // Let's assume that order > 0.
        for i in 1..self.order {
            product = product * self[(i, i)];
        }
        product
    }

    fn eliminate_column(&mut self, column: usize) -> usize {
        // Eliminate elements in the column-th column, below the column-th row
        let mut swaps = 0;
        for i in (column + 1)..self.order {
            if self[(i, column)].numerator == T::zero() {
                continue;
            }

            if self[(column, column)].numerator == T::zero() {
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
}
