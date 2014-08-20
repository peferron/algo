package suffix_array

import "sort"

func FirstOccurrence(s, sub string) int {
	a := newSuffixArray(s)
	suffixIndex := searchLow(a, s, sub)
	start := a[suffixIndex]
	length := start + len(sub)
	if length <= len(s) && s[start:length] == sub {
		return start
	}
	return -1
}

func AllOccurrences(s, sub string) []int {
	o := []int{}
	a := newSuffixArray(s)
	lowSuffixIndex := searchLow(a, s, sub)
	highSuffixIndex := searchHigh(a, s, sub)
	for i := lowSuffixIndex; i <= highSuffixIndex; i++ {
		start := a[i]
		length := start + len(sub)
		if length <= len(s) && s[start:length] == sub {
			o = append(o, start)
		}
	}
	return o
}

type suffixArray []int

func newSuffixArray(s string) suffixArray {
	a := suffixArray{}
	suffixes := []string{}
	indexes := map[string]int{}
	for i := 0; i <= len(s); i++ {
		suffix := s[i:]
		suffixes = append(suffixes, suffix)
		indexes[suffix] = i
	}
	sort.Strings(suffixes)
	for _, suffix := range suffixes {
		index := indexes[suffix]
		a = append(a, index)
	}
	return a
}

func searchLow(a suffixArray, s, sub string) int {
	low := 0
	high := len(a) - 1
	for low < high {
		// low <= mid < high
		mid := (high + low) / 2
		suffixStart := a[mid]
		l := suffixStart + len(sub)
		if l > len(s) {
			l = len(s)
		}
		suffix := s[suffixStart:l]
		if sub > suffix {
			low = mid + 1
		} else {
			high = mid
		}
	}
	return low
}

func searchHigh(a suffixArray, s, sub string) int {
	low := 0
	high := len(a) - 1
	for low < high {
		// low < mid <= high
		mid := (high + low + 1) / 2
		suffixStart := a[mid]
		l := suffixStart + len(sub)
		if l > len(s) {
			l = len(s)
		}
		suffix := s[suffixStart:l]
		if sub < suffix {
			high = mid - 1
		} else {
			low = mid
		}
	}
	return low
}

// func log(a suffixArray, s string) {
// 	fmt.Println("[")
// 	for i, suffixStart := range a {
// 		suffix := s[suffixStart:]
// 		fmt.Printf("  %d %d %q\n", i, suffixStart, suffix)
// 	}
// 	fmt.Println("]")
// }
