package insertion_sort

func Sort(a []int) {
	// fmt.Printf("Sort: %v\n", a)

	for i := 1; i < len(a); i++ {
		insert(a, i)
	}
}

func insert(a []int, i int) {
	// fmt.Printf("insert: %v index %d\n", a, i)

	for j := i; j > 0 && a[j] < a[j-1]; j-- {
		swap(a, j, j-1)
	}
}

func swap(a []int, i, j int) {
	// fmt.Printf("swap: %v indexes %d and %d\n", a, i, j)

	t := a[i]
	a[i] = a[j]
	a[j] = t
}
