pub struct BitVector {
    value: u64,
}

impl BitVector {
    pub fn new() -> Self {
        BitVector { value: 0 }
    }

    pub fn from_vec(v: &Vec<u8>) -> Self {
        let mut b = BitVector::new();
        for &x in v {
            b.set(x);
        }
        b
    }

    pub fn set(&mut self, i: u8) {
        self.value |= 1 << i;
    }

    pub fn intersection(&self, other: &Self) -> Self {
        BitVector { value: self.value & other.value }
    }

    pub fn union(&self, other: &Self) -> Self {
        BitVector { value: self.value | other.value }
    }

    pub fn pop_count(&self) -> u8 {
        // Can be optimized. See https://en.wikipedia.org/wiki/Hamming_weight
        (0..64).fold(0, |count, i| count + (self.value >> i & 1) as u8)
    }
}
