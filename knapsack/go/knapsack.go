package knapsack

type Item struct {
	size int
}

func Pack(items []Item, capacity int) []Item {
	if len(items) == 0 {
		return items
	}

	a := make([]int, capacity)
	fill(a, -1)

	top := -1
	for itemIndex, item := range items {
		for i := 0; i < capacity; i++ {
			if a[i] >= 0 {
				continue
			}
			if d := i - item.size; d < 0 || a[d] >= 0 && a[d] != itemIndex {
				a[i] = itemIndex
				if i > top {
					top = i
				}
			}
		}
	}

	if top < 0 {
		return []Item{}
	}

	set := []Item{}
	for top >= 0 {
		set = append(set, items[a[top]])
		top -= items[a[top]].size
	}
	return set
}

func fill(a []int, v int) {
	for i := range a {
		a[i] = v
	}
}
