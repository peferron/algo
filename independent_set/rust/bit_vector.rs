pub struct BitVector {
    value: u64,
}

impl BitVector {
    pub fn new() -> Self {
        BitVector { value: 0 }
    }

    pub fn set(&mut self, i: usize) {
        self.value |= 1 << i;
    }

    pub fn has(&self, i: usize) -> bool {
        self.value & 1 << i != 0
    }

    pub fn intersect(&self, other: &Self) -> Self {
        BitVector { value: self.value & other.value }
    }

    pub fn is_empty(&self) -> bool {
        self.value == 0
    }

    pub fn to_vec(&self) -> Vec<usize> {
        (0..64).filter(|&i| self.has(i)).collect()
    }
}

impl Clone for BitVector {
    fn clone(&self) -> Self {
        BitVector { value: self.value }
    }
}
