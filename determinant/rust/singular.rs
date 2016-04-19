use fraction::Number;
use square_matrix::SquareMatrix;

impl<T> SquareMatrix<T> where T: Number<T> {
    pub fn is_singular(&self) -> bool {
        self.determinant() == T::zero()
    }
}
