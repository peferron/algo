package heapsort

func Sort(a []int) {
	// fmt.Printf("Sort: %v\n", a)

	h := FasterNewHeap(a)

	for i := range a {
		a[i] = h.RemoveRoot()
	}
}
