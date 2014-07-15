package selection_sort

func Sort(a []int) {
	// fmt.Printf("Sort: %v\n", a)

	if a == nil {
		return
	}

	for i := 0; i < len(a)-1; i++ {
		j := smallest(a, i)
		swap(a, i, j)
	}
}

func smallest(a []int, start int) int {
	// fmt.Printf("smallest: %v starting from index %d\n", a, start)

	s := start
	for i := start; i < len(a); i++ {
		if a[i] < a[s] {
			s = i
		}
	}
	return s
}

func swap(a []int, i, j int) {
	// fmt.Printf("swap: %v indexes %d and %d\n", a, i, j)

	t := a[i]
	a[i] = a[j]
	a[j] = t
}
