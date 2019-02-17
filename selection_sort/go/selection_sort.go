package selection_sort

func Sort(a []int) {
	if a == nil {
		return
	}
	for i := 0; i < len(a)-1; i++ {
		j := smallest(a, i)
		swap(a, i, j)
	}
}

func smallest(a []int, start int) int {
	s := start
	for i := start + 1; i < len(a); i++ {
		if a[i] < a[s] {
			s = i
		}
	}
	return s
}

func swap(a []int, i, j int) {
	a[i], a[j] = a[j], a[i]
}
