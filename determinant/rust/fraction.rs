use std::cmp::PartialEq;
use std::fmt::{Debug, Formatter, Result};
use std::ops::{Div, Mul, Neg, Rem, Sub};
use std::num::{One, Zero};

pub trait Number<T> : Copy + Debug + Div<Output = T> + Mul<Output = T> +
    Neg<Output = T> + One + PartialEq + Rem<Output = T> + Sub<Output = T> + Zero {}
impl<T> Number<T> for T where T: Copy + Debug + Div<Output = T> + Mul<Output = T> +
    Neg<Output = T> + One + PartialEq + Rem<Output = T> + Sub<Output = T> + Zero {}

#[derive(Copy, Clone)]
pub struct Fraction<T> {
    numerator: T,
    denominator: T,
}

impl<T> Fraction<T> where T: Number<T> {
    pub fn new(value: T) -> Self {
        Fraction {
            numerator: value,
            denominator: T::one(),
        }
    }

    fn new_simplified(numerator: T, denominator: T) -> Self {
        let gcd = greatest_common_denominator(numerator, denominator);
        Fraction {
            numerator: numerator / gcd,
            denominator: denominator / gcd,
        }
    }

    pub fn to_raw<U>(&self) -> U where U: Div<Output = U> + From<T> {
        U::from(self.numerator) / U::from(self.denominator)
    }
}

fn greatest_common_denominator<T>(a: T, b: T) -> T where T: Number<T> {
    if b == T::zero() {
        a
    } else {
        greatest_common_denominator(b, a % b)
    }
}

impl<T> Debug for Fraction<T> where T: Number<T> {
    fn fmt(&self, f: &mut Formatter) -> Result {
        write!(f, "{:?}/{:?}", self.numerator, self.denominator)
    }
}

impl<T> Div for Fraction<T> where T: Number<T> {
    type Output = Fraction<T>;

    fn div(self, rhs: Fraction<T>) -> Self {
        Fraction::new_simplified(
            self.numerator * rhs.denominator,
            self.denominator * rhs.numerator,
        )
    }
}

impl<T> Mul for Fraction<T> where T: Number<T> {
    type Output = Fraction<T>;

    fn mul(self, rhs: Fraction<T>) -> Self {
        Fraction::new_simplified(
            self.numerator * rhs.numerator,
            self.denominator * rhs.denominator,
        )
    }
}

impl<T> Neg for Fraction<T> where T: Number<T> {
    type Output = Fraction<T>;

    fn neg(self) -> Self {
        Fraction::new_simplified(-self.numerator, self.denominator)
    }
}

impl<T> One for Fraction<T> where T: Number<T> {
    fn one() -> Self {
        Fraction::new(T::one())
    }
}

impl<T> PartialEq for Fraction<T> where T: Number<T> {
    fn eq(&self, rhs: &Fraction<T>) -> bool {
        self.numerator * rhs.denominator == self.denominator * rhs.numerator
    }
}

impl<T> Rem for Fraction<T> where T: Number<T> {
    type Output = Fraction<T>;

    fn rem(self, rhs: Fraction<T>) -> Self {
        let common_denominator = self.denominator * rhs.denominator;
        let self_numerator_scaled = self.numerator * rhs.denominator;
        let rhs_numerator_scaled = rhs.numerator * self.denominator;

        Fraction::new_simplified(self_numerator_scaled % rhs_numerator_scaled, common_denominator)
    }
}

impl<T> Sub for Fraction<T> where T: Number<T> {
    type Output = Fraction<T>;

    fn sub(self, rhs: Fraction<T>) -> Self {
        let common_denominator = self.denominator * rhs.denominator;
        let self_numerator_scaled = self.numerator * rhs.denominator;
        let rhs_numerator_scaled = rhs.numerator * self.denominator;

        Fraction::new_simplified(self_numerator_scaled - rhs_numerator_scaled, common_denominator)
    }
}

impl<T> Zero for Fraction<T> where T: Number<T> {
    fn zero() -> Self {
        Fraction::new(T::zero())
    }
}
