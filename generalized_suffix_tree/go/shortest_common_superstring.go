package generalized_suffix_tree

func ShortestCommonSuperstring(a []string) string {
	b := make([]string, len(a))
	copy(b, a)
	a = b

	for len(a) > 1 {
		startsWithOverlap, endsWithOverlap, overlapLen := longestOverlappingPair(a)

		merged := a[endsWithOverlap] + a[startsWithOverlap][overlapLen:]

		// Remove the pair of strings from a and insert the merged string instead.
		a[startsWithOverlap] = merged
		a = append(a[:endsWithOverlap], a[endsWithOverlap+1:]...)
	}

	return a[0]
}

// longestOverlappingPair returns the pair of distinct string indexes in a that have the longest
// overlap, and the length of their overlap. The first string starts with the overlap and the second
// string ends with the overlap.
func longestOverlappingPair(a []string) (startsWithOverlap, endsWithOverlap, overlapLen int) {
	var longestOverlapLen int
	var longestStartsWithOverlap, longestEndsWithOverlap int

	t := NewGST(a...)
	t.Root.DepthFirstSearch("", func(prefix string, starts map[int][]int) {
		if len(starts) < 2 || len(prefix) < longestOverlapLen {
			return
		}

		startsWithOverlap, endsWithOverlap := overlappingPair(a, prefix, starts)
		if startsWithOverlap < 0 {
			return
		}

		longestOverlapLen = len(prefix)
		longestStartsWithOverlap = startsWithOverlap
		longestEndsWithOverlap = endsWithOverlap
	})

	return longestStartsWithOverlap, longestEndsWithOverlap, longestOverlapLen
}

// prefix _bc, starts map[0:[1] 1:[3]]
// overlap _bc, startWithOverlap [], endWithOverlap [0]
// prefix _, starts map[0:[1] 1:[3 7]]
// overlap _, startWithOverlap [], endWithOverlap []
// prefix bc, starts map[0:[2] 1:[4 0]]
// overlap bc, startWithOverlap [], endWithOverlap [0]
// prefix c, starts map[0:[3] 1:[1 5]]
// overlap c, startWithOverlap [], endWithOverlap [0]
// prefix , starts map[0:[0 1 2 3 4] 1:[2 6 8 9 3 7 4 0 1 5]]
// overlap , startWithOverlap [0], endWithOverlap [0]
// a [a_bc bcd_bcd_e], startsWithOverlap 0, endsWithOverlap 0, overlapLen 0

// overlappingPair returns a pair of distinct string indexes in a where the first string starts with
// overlap and the second string ends with overlap, or (-1, -1) if no such pair can be found.
func overlappingPair(a []string, overlap string, starts map[int][]int) (int, int) {
	var startWithOverlap, endWithOverlap []int

	for strIndex, strStarts := range starts {
		for _, strStart := range strStarts {
			if strStart == 0 {
				startWithOverlap = append(startWithOverlap, strIndex)
			}
			if strStart+len(overlap) == len(a[strIndex]) {
				endWithOverlap = append(endWithOverlap, strIndex)
			}
		}
	}

	for _, i := range startWithOverlap {
		for _, j := range endWithOverlap {
			if i != j {
				return i, j
			}
		}
	}

	return -1, -1
}
