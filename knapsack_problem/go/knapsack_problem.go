package knapsack_problem

type Item struct {
	weight int
	value  int
}

func Solve(items []Item, w int) []Item {
	n := len(items)
	if n == 0 {
		return items
	}

	m := solve(items, n, w)
	return reconstruct(m, items, n, w)
}

// matrix returns a zero-filled matrix of ints with r rows and c columns.
func matrix(r, c int) [][]int {
	m := make([][]int, r+1)
	for i := range m {
		m[i] = make([]int, c+1)
	}
	return m
}

// solve returns a matrix m with n+1 rows and w+1 columns, where each cell m[i][j] contains the
// highest value achievable using items 0 to i-1 while keeping a total weight <= j.
func solve(items []Item, n, w int) [][]int {
	// Note: The matrix could be built row by row as we iterate through i in the loop below.
	// However, it's clearer to fully build it from the beginning, and doing so only takes O(n) time
	// while the loop below is O(nw) anyway.
	m := matrix(n+1, w+1)

	for i := 1; i <= n; i++ {
		for j := 1; j <= w; j++ {
			item := items[i-1]
			maxValueWithoutItem := m[i-1][j]

			if item.weight > j {
				// The current item weighs too much.
				m[i][j] = maxValueWithoutItem
				continue
			}

			maxValueWithItem := m[i-1][j-item.weight] + item.value
			m[i][j] = max(maxValueWithItem, maxValueWithoutItem)
		}
	}

	return m
}

// reconstruct returns the list of items used to achieve the value at position m[i][j], sorted by
// increasing item index.
func reconstruct(m [][]int, items []Item, i, j int) []Item {
	if i == 0 || j == 0 {
		return []Item{}
	}

	maxValueWithItem := m[i][j]
	maxValueWithoutItem := m[i-1][j]

	if maxValueWithItem == maxValueWithoutItem {
		// The current item is not needed in the set.
		return reconstruct(m, items, i-1, j)
	}

	// The current item is needed in the set.
	item := items[i-1]
	return append(reconstruct(m, items, i-1, j-item.weight), item)
}

func max(x, y int) int {
	if x >= y {
		return x
	}
	return y
}
