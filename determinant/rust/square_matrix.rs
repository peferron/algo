use std::fmt::{Debug, Formatter, Result};
use std::ops::{Index, IndexMut};

#[derive(Clone)]
pub struct SquareMatrix<T> {
    pub order: usize,
    pub data: Vec<T>,
}

impl<T> SquareMatrix<T> where T: Clone {
    pub fn from_vec(data: &Vec<T>) -> Self {
        SquareMatrix {
            order: (data.len() as f64).sqrt() as usize,
            data: data.clone(),
        }
    }
}

impl<T> Debug for SquareMatrix<T> where T: Debug {
    fn fmt(&self, f: &mut Formatter) -> Result {
        for i in 0..self.order {
            let _ = write!(f, "\n[");
            for j in 0..self.order {
                let _ = write!(f, " {:?}", self[(i, j)]);
            }
            let _ = write!(f, " ]");
        }
        write!(f, "")
    }
}

impl<T> Index<(usize, usize)> for SquareMatrix<T> {
    type Output = T;

    fn index(&self, (row, column): (usize, usize)) -> &T {
        &self.data[row * self.order + column]
    }
}

impl<T> IndexMut<(usize, usize)> for SquareMatrix<T> {
    fn index_mut<'a>(&'a mut self, (row, column): (usize, usize)) -> &'a mut T {
        &mut self.data[row * self.order + column]
    }
}
