package generalized_suffix_tree

type Tree struct {
	root *node
}

type node struct {
	label    label
	children map[string]*node
}

func LongestCommonSubstring(a []string) string {
	t := newGST(a)
	longest := ""
	depthFirstSearch(t.root, "", func(n *node, prefix string) {
		if n.label == t.root.label && len(prefix) > len(longest) {
			longest = prefix
		}
	})
	return longest
}

func LongestPalindrome(s string) string {
	t := newGST([]string{s, reverse(s)})
	longest := ""
	depthFirstSearch(t.root, "", func(n *node, prefix string) {
		if n.label == t.root.label && len(prefix) > len(longest) {
			longest = prefix
		}
	})
	return longest
}

func newGST(a []string) *Tree {
	root := &node{emptyLabel, map[string]*node{}}
	for i, s := range a {
		l := labellize(uint(i))
		insertString(root, s, l)
	}
	return &Tree{root}
}

func insertString(n *node, s string, l label) {
	for i := range s {
		insertSuffix(n, s[i:], l)
	}
}

func insertSuffix(n *node, suffix string, l label) {
	n.label = join(n.label, l)

	if len(suffix) == 0 {
		return
	}

	for edge, child := range n.children {
		p := commonPrefixLen(edge, suffix)

		if p == 0 {
			continue
		}

		if p == len(edge) {
			// The suffix contains the entire edge.
			// Insert the trimmed suffix one level down.
			insertSuffix(child, suffix[p:], l)
			return
		}

		// There is a partial match between the edge and the suffix.
		// Split the edge in two.
		mid := &node{child.label, map[string]*node{}}
		mid.children[edge[p:]] = child
		delete(n.children, edge)
		n.children[edge[:p]] = mid

		// Insert the trimmed suffix one level down.
		insertSuffix(mid, suffix[p:], l)
		return
	}

	newNode := &node{l, map[string]*node{}}
	n.children[suffix] = newNode
}

func commonPrefixLen(a, b string) int {
	i := 0
	for i < len(a) && i < len(b) && a[i] == b[i] {
		i++
	}
	return i
}

func depthFirstSearch(n *node, prefix string, f func(*node, string)) {
	f(n, prefix)
	for edge, child := range n.children {
		depthFirstSearch(child, prefix+edge, f)
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

// func (t *Tree) Log() {
// 	labelLen := len(fmt.Sprintf("%b", t.root.label))
// 	log(t.root, labelLen, 0)
// }

// func log(n *node, labelLen, indent int) {
// 	fmt.Printf("%s(%0"+strconv.Itoa(labelLen)+"b)\n", strings.Repeat(" ", indent), n.label)
// 	for edge, child := range n.children {
// 		fmt.Printf("%s%s\n", strings.Repeat(" ", indent+2), edge)
// 		log(child, labelLen, indent+4)
// 	}
// }
