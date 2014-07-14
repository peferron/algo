package mergesort

func Sort(a []int) {
	// fmt.Printf("Sort: %v\n", a)

	if len(a) == 0 {
		return
	}

	mergesort(a, 0, len(a)-1)
}

func mergesort(a []int, start, end int) {
	// fmt.Printf("mergesort: %v\n", a[start:end+1])

	if end < start+1 {
		return
	}

	mid := (start + end) / 2
	mergesort(a, start, mid)
	mergesort(a, mid+1, end)
	merge(a, start, mid, end)
}

func merge(a []int, start, mid, end int) {
	// fmt.Printf("merge: %v and %v\n", a[start:mid+1], a[mid+1:end+1])

	m := []int{}
	l := start
	r := mid + 1
	for l <= mid || r <= end {
		if r > end || l <= mid && a[l] < a[r] {
			m = append(m, a[l])
			l++
		} else {
			m = append(m, a[r])
			r++
		}
	}

	for i, v := range m {
		a[start+i] = v
	}
}
