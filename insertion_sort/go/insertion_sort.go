package insertion_sort

func Sort(a []int) {
	// fmt.Printf("Sort: %v\n", a)

	for i := 1; i < len(a); i++ {
		insertLast(a[:i+1])
	}
}

func insertLast(a []int) {
	// fmt.Printf("insertLast: %v\n", a)

	for i := len(a) - 1; i > 0 && a[i] < a[i-1]; i-- {
		swap(a, i, i-1)
	}
}

func swap(a []int, i, j int) {
	// fmt.Printf("swap: %v indexes %d and %d\n", a, i, j)

	t := a[i]
	a[i] = a[j]
	a[j] = t
}
