package integer_partition_generation

type partition []int

func Partitions(n int) []partition {
	partitions := []partition{}

	// The first partition of n in lexicographically decreasing order is {n} itself.
	p := partition{n}

	for p != nil {
		partitions = append(partitions, p)
		p = next(p)
	}

	return partitions
}

func next(p partition) partition {
	g := indexLastGreaterThan1(p)
	if g < 0 {
		// Root case: p is made entirely of 1s. There is no next partition.
		return nil
	}

	// To generate a new partition that is after p in lexicographically decreasing order, we remove
	// 1 from the last element greater than 1, then append it back at the end of the partition.
	// Example: {3, 1, 1} -> {2, 1, 1, 1}.
	c := clone(p)
	c[g]--
	c = append(c, 1)

	// This new partition is after p in lexicographically decreasing order, however it is not
	// necessarily *immediately* after p. To fix that, we must "collect" all the 1s that follow g.
	// Example: {2, 1, 1, 1} -> {2, 2, 1}.
	// Note that in the above example, we must be careful not to "overcollect" the 1s into {2, 3},
	// because that's the same partition as {3, 2}, which has already been generated since it's
	// before p in lexicographically decreasing order. The "collection" must stop when it reaches
	// the value of p[g].
	return collect(c, g)
}

func indexLastGreaterThan1(p partition) int {
	for i := len(p) - 1; i >= 0; i-- {
		if v := p[i]; v > 1 {
			return i
		}
	}
	return -1
}

func clone(p partition) partition {
	c := make(partition, len(p))
	copy(c, p)
	return c
}

func collect(p partition, g int) partition {
	max := p[g]
	for i := g + 1; i < len(p); i++ {
		// Collect the last element of p into p[i] until there's nothing left to collect or p[i]
		// reaches the max.
		for len(p)-1 > i && p[i] < max {
			p[i]++
			p = p[:len(p)-1]
		}
	}
	return p
}
