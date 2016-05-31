package radix_sort

import "math"

func Sort(a []int) []int {
	negative, positive := splitSign(a)
	sortedNegative := reverse(sortAbs(negative))
	sortedPositive := sortAbs(positive)
	return append(sortedNegative, sortedPositive...)
}

// splitSign returns two slices: one slice containing all negative elements of a, and one slice
// containing all positive elements of a.
func splitSign(a []int) (negative, positive []int) {
	for _, v := range a {
		if v < 0 {
			negative = append(negative, v)
		} else {
			positive = append(positive, v)
		}
	}
	return
}

// reverse returns a reversed copy of a.
func reverse(a []int) []int {
	l := len(a)
	b := make([]int, l)
	for i, v := range a {
		b[l-i-1] = v
	}
	return b
}

// sortAbs returns a copy of a, sorted in increasing absolute value order.
func sortAbs(a []int) []int {
	base := 10 // Arbitrary.
	d := maxDigits(a, base)
	for n := 0; n < d; n++ {
		a = concat(buckets(a, base, n))
	}
	return a
}

// buckets returns a slice of b buckets, where the kth bucket contains all the elements of a whose
// nth digit in base-b representation is k.
func buckets(a []int, b, n int) [][]int {
	buckets := make([][]int, b)
	for _, v := range a {
		d := digit(v, b, n)
		buckets[d] = append(buckets[d], v)
	}
	return buckets
}

// concat returns the concatenation of all buckets.
func concat(buckets [][]int) []int {
	a := []int{}
	for _, bucket := range buckets {
		a = append(a, bucket...)
	}
	return a
}

// maxDigits returns the maximum number of digits of any element in a, in base-b representation.
func maxDigits(a []int, b int) int {
	max := 0
	for _, v := range a {
		if av := abs(v); av > max {
			max = av
		}
	}
	return digits(max, b)
}

// digits returns the number of digits of a, in base-b representation.
func digits(a, b int) int {
	return int(log(abs(a), b)) + 1
}

// digit returns the nth digit of a, in base-b representation.
func digit(a, b, n int) int {
	return int(abs(a) / pow(b, n) % b)
}

// log returns the logarithm of a in base b.
func log(a, b int) float64 {
	return math.Log(float64(a)) / math.Log(float64(b))
}

// pow returns the base-b exponential of n (often written as b**n or b^n).
func pow(b, n int) int {
	return int(math.Pow(float64(b), float64(n)))
}

// abs returns the absolute value of a.
func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
