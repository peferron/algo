package radix_sort

// Sorted returns a copy of a sorted in increasing order, using a radix sort with base b.
func Sorted(a []int, b int) []int {
	result := make([]int, len(a))
	copy(result, a)
	Sort(result, b)
	return result
}

// Sort sorts a in-place in increasing order, using a radix sort with base b.
func Sort(a []int, b int) {
	if len(a) == 0 {
		return
	}

	min, max := extremes(a)

	if (min < 0) {
		add(a, -min)
		max -= min
	}

	for divisor := 1; max/divisor > 0; divisor *= b {
		countingSort(a, b, divisor)
	}

	if (min < 0) {
		add(a, min)
	}
}

// countingSort sorts a in-place in increasing order of the nth digit in base b, where divisor = b^n.
func countingSort(a []int, b, divisor int) {
	result := make([]int, len(a))
	counts := make([]int, b)

	// Step 1: count occurrences.
	for _, v := range a {
		d := v / divisor % b
		counts[d]++
	}

	// Step 2: transform counts into a running sum.
	for i := 1; i < len(counts); i++ {
		counts[i] += counts[i-1]
	}

	// Step 3: move values to their sorted position.
	for i := len(a) - 1; i >= 0; i-- {
		v := a[i]
		d := v / divisor % b
		counts[d]--
		position := counts[d]
		result[position] = v
	}

	copy(a, result)
}

// extremes returns the minimum and maximum values in a.
func extremes(a []int) (min, max int) {
	min = a[0]
	max = a[0]

	for _, v := range a {
		if v < min {
			min = v
		}
		if v > max {
			max = v
		}
	}

	return
}

// add adds v to all values in a.
func add(a []int, v int) {
	for i := range a {
		a[i] += v
	}
}
