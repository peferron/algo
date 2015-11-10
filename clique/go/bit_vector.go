package clique

import "fmt"

type BitVector uint64

func (b *BitVector) Set(i int) {
	checkBitIndex(i)
	*b |= (1 << uint(i))
}

func (b BitVector) Has(i int) bool {
	checkBitIndex(i)
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

func checkBitIndex(i int) {
	if i < 0 || i >= 64 {
		panic(fmt.Sprintf("Invalid bit index: %d, must be between 0 and 63", i))
	}
}
