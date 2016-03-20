package generalized_suffix_tree

import "strings"

type Tree struct {
	Root *Node
}

type Node struct {
	Start    int
	Children map[string]*Node
}

const Terminators = "0123456789" // Can be any characters in any order.

// Construction

func NewGST(a ...string) *Tree {
	root := &Node{
		-1,
		map[string]*Node{},
	}
	for i, s := range a {
		terminator := Terminators[i : i+1]
		insertString(root, s+terminator)
	}
	return &Tree{root}
}

func insertString(n *Node, s string) {
	for i := range s {
		insertSuffix(n, s[i:], i)
	}
}

func insertSuffix(n *Node, suffix string, start int) {
	if len(suffix) == 0 {
		return
	}

	for edge, child := range n.Children {
		p := commonPrefixLen(edge, suffix)

		if p == 0 {
			continue
		}

		if p == len(edge) {
			// The suffix contains the entire edge.
			// Insert the trimmed suffix one level down.
			insertSuffix(child, suffix[p:], start)
			return
		}

		// There is a partial match between the edge and the suffix.
		// Split the edge in two.
		mid := &Node{
			-1,
			map[string]*Node{},
		}
		mid.Children[edge[p:]] = child
		delete(n.Children, edge)
		n.Children[edge[:p]] = mid

		// Insert the trimmed suffix one level down.
		insertSuffix(mid, suffix[p:], start)
		return
	}

	newNode := &Node{
		start,
		map[string]*Node{},
	}
	n.Children[suffix] = newNode
}

func commonPrefixLen(a, b string) int {
	i := 0
	for i < len(a) && i < len(b) && a[i] == b[i] {
		i++
	}
	return i
}

// Operations

type Callback func(string, map[int][]int)

func (n *Node) DepthFirstSearch(prefix string, f Callback) map[int][]int {
	starts := map[int][]int{}

	if len(n.Children) == 0 {
		// Leaf node.
		terminator := prefix[len(prefix)-1:]
		index := strings.Index(Terminators, terminator)
		starts[index] = []int{n.Start}
	} else {
		// Non-leaf node.
		for edge, child := range n.Children {
			childStarts := child.DepthFirstSearch(prefix+edge, f)
			merge(starts, childStarts)
		}
	}

	if f != nil {
		f(prefix, starts)
	}

	return starts
}

func merge(dst, src map[int][]int) {
	for k, v := range src {
		dst[k] = append(dst[k], v...)
	}
}

// Debugging

// func (t *Tree) Log() {
// 	log(t.Root, 0)
// }

// func log(n *Node, indent int) {
// 	fmt.Printf("%s(%d)\n", strings.Repeat(" ", indent), n.Start)
// 	for edge, child := range n.Children {
// 		fmt.Printf("%s%s\n", strings.Repeat(" ", indent+2), edge)
// 		log(child, indent+4)
// 	}
// }
