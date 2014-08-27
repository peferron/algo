package generalized_suffix_tree

import "strings"

type callback func(string, starts)
type starts map[int][]int

func AllOccurrences(s, sub string) []int {
	t := NewGST(s)
	n := find(t.root, sub)
	if n == nil {
		return []int{}
	}
	if starts := depthFirstSearch(n, "", nil); len(starts) > 0 {
		return starts[0]
	}
	return []int{}
}

func LongestCommonSubstring(a []string) string {
	t := NewGST(a...)
	longest := ""
	depthFirstSearch(t.root, "", func(prefix string, starts starts) {
		if len(prefix) > len(longest) && len(starts) == len(a) {
			longest = prefix
		}
	})
	return longest
}

func LongestPalindrome(s string) string {
	t := NewGST(s, reverse(s))
	longest := ""
	depthFirstSearch(t.root, "", func(prefix string, starts starts) {
		if len(prefix) > len(longest) && len(starts) == 2 &&
			centered(starts[0], starts[1], len(s), len(prefix)) {
			longest = prefix
		}
	})
	return longest
}

func find(n *Node, sub string) *Node {
	if len(sub) == 0 {
		return n
	}
	for edge, child := range n.Children {
		if strings.HasPrefix(sub, edge) {
			// sub contains the entire edge. Look one level down.
			return find(child, sub[len(edge):])
		}
		if strings.HasPrefix(edge, sub) {
			// sub ends in the middle of the edge. Return the child.
			return child
		}
	}
	return nil
}

func depthFirstSearch(n *Node, prefix string, f callback) starts {
	if n.Start >= 0 {
		// It's a leaf.
		if len(prefix) == 0 {
			return starts{}
		}
		terminator := prefix[len(prefix)-1:]
		index := strings.Index(Terminators, terminator)
		return starts{index: []int{n.Start}}
	}

	starts := starts{}
	for edge, child := range n.Children {
		childstarts := depthFirstSearch(child, prefix+edge, f)
		merge(starts, childstarts)
	}
	if f != nil {
		f(prefix, starts)
	}
	return starts
}

func merge(dst, src map[int][]int) {
	for k, v := range src {
		if _, ok := dst[k]; ok {
			dst[k] = append(dst[k], v...)
		} else {
			dst[k] = v
		}
	}
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

func centered(forwardStarts, reverseStarts []int, strLen, prefixLen int) bool {
	for _, forwardStart := range forwardStarts {
		for _, reverseStart := range reverseStarts {
			if forwardStart+prefixLen == strLen-reverseStart {
				return true
			}
		}
	}
	return false
}
