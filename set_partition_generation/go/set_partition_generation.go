package set_partition_generation

type restrictedGrowthFunction []int

type Partition []Block
type Block []int

// Partitions returns the set partitions of the integers from 1 to n, sorted in lexicographically
// increasing order.
func Partitions(n int) []Partition {
	partitions := []Partition{}

	// The first restricted growth function in lexicographically increasing order is the one filled
	// with zeros: {0, 0, 0...} (n times).
	// Note that in Go, the default int value is 0, so there's no need to initialize each element.
	for f := make(restrictedGrowthFunction, n); f != nil; f = next(f) {
		partitions = append(partitions, getPartition(f))
	}

	return partitions
}

// getPartition returns the partition corresponding to f.
func getPartition(f restrictedGrowthFunction) Partition {
	// Due to the definition of restricted growth functions, the block with index k is always
	// encountered before the block with index k+1. Thanks to that, there's no need to pre-allocate
	// the partition blocks; new blocks can simply be appended to the partition one at a time when
	// encountered.
	p := Partition{}
	for i, blockIndex := range f {
		if blockIndex == len(p) {
			p = append(p, Block{})
		}
		// Careful about off-by-one errors: i ranges from 0 to n-1, but the partition is done over
		// integers from 1 to n.
		p[blockIndex] = append(p[blockIndex], i+1)
	}
	return p
}

// next returns the restricted growth function immediately following f in lexicographically
// increasing order.
func next(f restrictedGrowthFunction) restrictedGrowthFunction {
	g := clone(f)

	// Incrementing the last element yields the smallest lexicographic order increase. If it cannot
	// be done without breaking the restricted growth function rule, then the next best thing is to
	// set it to 0 and try to increment the previous element.
	for i := len(g) - 1; i > 0; i-- {
		if g[i] < max(g[:i])+1 {
			g[i]++
			return g
		}
		g[i] = 0
	}

	return nil
}

// clone returns a copy of f.
func clone(f restrictedGrowthFunction) restrictedGrowthFunction {
	g := make(restrictedGrowthFunction, len(f))
	copy(g, f)
	return g
}

// max returns the maximum value of all elements in f.
func max(f restrictedGrowthFunction) int {
	max := 0
	for _, v := range f {
		if v > max {
			max = v
		}
	}
	return max
}
