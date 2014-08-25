package generalized_suffix_tree

type label int

const emptyLabel label = 0

func labellize(index uint) label {
	return emptyLabel | 1<<index
}

func join(a, b label) label {
	return a | b
}
