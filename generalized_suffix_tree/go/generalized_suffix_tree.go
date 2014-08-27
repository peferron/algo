package generalized_suffix_tree

type Tree struct {
	root *Node
}

type Node struct {
	Start    int
	Children map[string]*Node
}

const Terminators = "$#%"

func NewGST(a ...string) *Tree {
	root := &Node{
		-1,
		map[string]*Node{},
	}
	for i, s := range a {
		terminator := Terminators[i : i+1]
		insertString(root, s+terminator, i)
	}
	return &Tree{root}
}

func insertString(n *Node, s string, index int) {
	for i := range s {
		insertSuffix(n, s[i:], index, i)
	}
}

func insertSuffix(n *Node, suffix string, index, start int) {
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
			insertSuffix(child, suffix[p:], index, start)
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
		insertSuffix(mid, suffix[p:], index, start)
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

// func (t *Tree) Log() {
// 	log(t.root, 0)
// }

// func log(n *Node, indent int) {
// 	fmt.Printf("%s(%d)\n", strings.Repeat(" ", indent), n.Start)
// 	for edge, child := range n.Children {
// 		fmt.Printf("%s%s\n", strings.Repeat(" ", indent+2), edge)
// 		log(child, indent+4)
// 	}
// }
