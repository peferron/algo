package generalized_suffix_tree

import "strings"

func AllOccurrences(s, sub string) []int {
	t := NewGST(s)

	n := find(t.Root, sub)
	if n == nil {
		return []int{}
	}

	return n.DepthFirstSearch("", nil)[0]
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
