package generalized_suffix_tree

func LongestPalindrome(s string) string {
	t := NewGST(s, reverse(s))
	longest := ""

	t.Root.DepthFirstSearch("", func(prefix string, starts map[int][]int) {
		if len(prefix) > len(longest) && isPalindrome(starts[0], starts[1], len(s), len(prefix)) {
			longest = prefix
		}
	})

	return longest
}

func reverse(s string) string {
	runes := []rune{}
	for _, r := range s {
		runes = append(runes, r)
	}
	l := len(runes)
	for i := 0; i < l/2; i++ {
		runes[i], runes[l-i-1] = runes[l-i-1], runes[i]
	}
	return string(runes)
}

func isPalindrome(forwardStarts, reverseStarts []int, strLen, prefixLen int) bool {
	for _, forwardStart := range forwardStarts {
		for _, reverseStart := range reverseStarts {
			// Finding one overlapping position is enough.
			if forwardStart+prefixLen == strLen-reverseStart {
				return true
			}
		}
	}
	return false
}
