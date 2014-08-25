package quicksort

func Sort(a []int) {
	if len(a) < 2 {
		return
	}
	p := partition(a)
	Sort(a[:p])
	Sort(a[p+1:])
}

func partition(a []int) int {
	p := medianPivot(a)
	last := len(a) - 1
	swap(a, p, last)

	firstHigh := 0
	for i := 0; i < last; i++ {
		v := a[i]
		if v < a[last] {
			swap(a, i, firstHigh)
			firstHigh++
		}
	}
	swap(a, last, firstHigh)

	return firstHigh
}

func swap(a []int, i, j int) {
	a[i], a[j] = a[j], a[i]
}

func medianPivot(a []int) int {
	mid := len(a) / 2
	end := len(a) - 1

	switch {
	case between(a[0], a[mid], a[end]):
		return 0
	case between(a[mid], a[0], a[end]):
		return mid
	default:
		return end
	}
}

func between(a, x, y int) bool {
	return x <= a && a <= y || y <= a && a <= x
}

/* randomPivot is an alternative to medianPivot, but mediaPivot is recommended.
func randomPivot(a []int) int {
	return rand.Intn(len(a))
}
*/
