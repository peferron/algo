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

    pub fn intersects(&self, other: &Self) -> bool {
        self.value & other.value != 0
    }
}
