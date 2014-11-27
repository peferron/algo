package integer_partition_generation

type partition []int

// Partitions returns the integer partitions of n, sorted in lexicographically decreasing order.
func Partitions(n int) []partition {
	partitions := []partition{}

	// The first partition of n in lexicographically decreasing order is {n} itself.
	for p := (partition{n}); p != nil; p = next(p) {
		partitions = append(partitions, p)
	}

	return partitions
}

// next returns the partition immediately following a in lexicographically decreasing order.
func next(p partition) partition {
	g := indexLastGreaterThan1(p)
	if g < 0 {
		// Base case: p is made entirely of 1s. There is no next partition.
		return nil
	}

	// To generate a new partition q that is after p in lexicographically decreasing order, remove 1
	// from the last element greater than 1, then append it back at the end of the partition.
	// Example: {3, 1, 1} -> {2, 1, 1, 1}.
	q := clone(p)
	q[g]--
	q = append(q, 1)

	// q is after p in lexicographically decreasing order, but not necessarily *immediately* after.
	// To fix that, the 1s that follow q must be "collected".
	// Example: {2, 1, 1, 1} -> {2, 2, 1}.
	// Note that in the above example, the 1s must not be "overcollected" into {2, 3}, because
	// that's the same partition as {3, 2}, which has already been generated since it's before q in
	// lexicographically decreasing order. The "collection" must stop when the receiving element
	// reaches the value of q[g].
	for i := g + 1; i < len(q); i++ {
		// Collect the last element of q into q[i] until there's nothing left to collect or q[i]
		// reaches the max.
		for len(q)-1 > i && q[i] < q[g] {
			q[i]++
			q = q[:len(q)-1]
		}
	}

	return q
}

// indexLastGreaterThan1 returns the index of the last element greater than 1 in p, or -1 if none.
func indexLastGreaterThan1(p partition) int {
	for i := len(p) - 1; i >= 0; i-- {
		if v := p[i]; v > 1 {
			return i
		}
	}
	return -1
}

// clone returns a copy of a.
func clone(p partition) partition {
	q := make(partition, len(p))
	copy(q, p)
	return q
}
