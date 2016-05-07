use std::cmp::PartialEq;
use std::fmt::{Debug, Formatter, Result};
use std::num::Zero;
use std::ops::{Div, Mul, Neg, Rem, Sub};

#[derive(Copy, Clone)]
pub struct Fraction {
    numerator: i32,
    denominator: i32,
}

impl Fraction {
    pub fn from_i32(value: i32) -> Self {
        Fraction {
            numerator: value,
            denominator: 1,
        }
    }

    fn from_i32s(numerator: i32, denominator: i32) -> Self {
        let gcd = greatest_common_denominator(numerator, denominator);
        Fraction {
            numerator: numerator / gcd,
            denominator: denominator / gcd,
        }
    }

    pub fn to_i32(self) -> i32 {
        self.numerator / self.denominator
    }
}

fn greatest_common_denominator(a: i32, b: i32) -> i32 {
    if b == 0 {
        a
    } else {
        greatest_common_denominator(b, a % b)
    }
}

impl Debug for Fraction {
    fn fmt(&self, f: &mut Formatter) -> Result {
        write!(f, "{:?}/{:?}", self.numerator, self.denominator)
    }
}

impl Div for Fraction {
    type Output = Fraction;

    fn div(self, rhs: Fraction) -> Self {
        Fraction::from_i32s(
            self.numerator * rhs.denominator,
            self.denominator * rhs.numerator,
        )
    }
}

impl Mul for Fraction {
    type Output = Fraction;

    fn mul(self, rhs: Fraction) -> Self {
        Fraction::from_i32s(
            self.numerator * rhs.numerator,
            self.denominator * rhs.denominator,
        )
    }
}

impl Neg for Fraction {
    type Output = Fraction;

    fn neg(self) -> Self {
        Fraction::from_i32s(-self.numerator, self.denominator)
    }
}

impl PartialEq for Fraction {
    fn eq(&self, rhs: &Fraction) -> bool {
        self.numerator * rhs.denominator == self.denominator * rhs.numerator
    }
}

impl Rem for Fraction {
    type Output = Fraction;

    fn rem(self, rhs: Fraction) -> Self {
        let common_denominator = self.denominator * rhs.denominator;
        let self_numerator_scaled = self.numerator * rhs.denominator;
        let rhs_numerator_scaled = rhs.numerator * self.denominator;

        Fraction::from_i32s(self_numerator_scaled % rhs_numerator_scaled, common_denominator)
    }
}

impl Sub for Fraction {
    type Output = Fraction;

    fn sub(self, rhs: Fraction) -> Self {
        let common_denominator = self.denominator * rhs.denominator;
        let self_numerator_scaled = self.numerator * rhs.denominator;
        let rhs_numerator_scaled = rhs.numerator * self.denominator;

        Fraction::from_i32s(self_numerator_scaled - rhs_numerator_scaled, common_denominator)
    }
}

impl Zero for Fraction {
    fn zero() -> Self {
        Fraction::from_i32(0)
    }
}
