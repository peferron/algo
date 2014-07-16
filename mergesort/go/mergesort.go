package mergesort

func Sort(a []int) {
	// fmt.Printf("Sort: %v\n", a)

	if len(a) < 2 {
		return
	}

	mid := len(a) / 2

	Sort(a[:mid])
	Sort(a[mid:])
	merge(a, mid)
}

func merge(a []int, mid int) {
	// fmt.Printf("merge: %v with mid: %d\n", a, mid)

	merged := []int{}

	left := 0
	right := mid
	for left < mid || right < len(a) {
		if right >= len(a) || left < mid && a[left] < a[right] {
			merged = append(merged, a[left])
			left++
		} else {
			merged = append(merged, a[right])
			right++
		}
	}

	copy(a, merged)
}
