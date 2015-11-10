package clique

type BitVector uint64

func (b *BitVector) Set(i int) {
	*b |= (1 << uint(i))
}

func (b BitVector) Has(i int) bool {
	return b&(1<<uint(i)) != 0
}

func (b BitVector) Intersect(c BitVector) BitVector {
	return b & c
}

func (b BitVector) Slice() []int {
	s := []int{}
	for i := 0; i < 64; i++ {
		if b.Has(i) {
			s = append(s, i)
		}
	}
	return s
}
