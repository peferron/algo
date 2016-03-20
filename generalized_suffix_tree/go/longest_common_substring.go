package generalized_suffix_tree

func LongestCommonSubstring(a []string) string {
	t := NewGST(a...)
	longest := ""

	t.Root.DepthFirstSearch("", func(prefix string, starts map[int][]int) {
		if len(prefix) > len(longest) && len(starts) == len(a) {
			longest = prefix
		}
	})

	return longest
}
