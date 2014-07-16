package quicksort

import "math/rand"

func Sort(a []int) {
	// fmt.Printf("Sort: %v\n", a)

	if len(a) < 2 {
		return
	}

	p := partition(a)
	Sort(a[:p])
	Sort(a[p+1:])
}

func partition(a []int) int {
	p := medianPivot(a)
	// fmt.Printf("partition: %v, pivot: %d (value %d)\n", a, p, a[p])

	l := len(a) - 1
	swap(a, p, l)

	firstHigh := 0
	for i := 0; i < l; i++ {
		v := a[i]
		if v < a[l] {
			swap(a, i, firstHigh)
			firstHigh++
		}
	}
	swap(a, l, firstHigh)

	return firstHigh
}

func swap(a []int, i, j int) {
	// fmt.Printf("swap: %v indexes %d and %d\n", a, i, j)

	t := a[i]
	a[i] = a[j]
	a[j] = t
}

func randomPivot(a []int) int {
	return rand.Intn(len(a) - 1)
}

func medianPivot(a []int) int {
	x := 0
	y := len(a) / 2
	z := len(a) - 1

	switch {
	case between(a[x], a[y], a[z]):
		return x
	case between(a[y], a[x], a[z]):
		return y
	default:
		return z
	}
}

func between(a, x, y int) bool {
	return x <= a && a <= y || y <= a && a <= x
}
