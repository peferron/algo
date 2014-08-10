package insertion_sort

func Sort(a []int) {
	for i := 1; i < len(a); i++ {
		insertLast(a[:i+1])
	}
}

func insertLast(a []int) {
	for i := len(a) - 1; i > 0 && a[i] < a[i-1]; i-- {
		swap(a, i, i-1)
	}
}

func swap(a []int, i, j int) {
	t := a[i]
	a[i] = a[j]
	a[j] = t
}
