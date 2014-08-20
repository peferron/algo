package suffix_array

import "sort"

type SuffixArray struct {
	s string
	a []int
}

func NewSuffixArray(s string) *SuffixArray {
	a := SuffixArray{s, []int{}}
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
		a.a = append(a.a, index)
	}
	return &a
}

func (a *SuffixArray) FirstOccurrence(sub string) int {
	suffixIndex := a.searchLow(sub)
	start := a.a[suffixIndex]
	length := start + len(sub)
	if length <= len(a.s) && a.s[start:length] == sub {
		return start
	}
	return -1
}

func (a *SuffixArray) AllOccurrences(sub string) []int {
	o := []int{}
	lowSuffixIndex := a.searchLow(sub)
	highSuffixIndex := a.searchHigh(sub)
	for i := lowSuffixIndex; i <= highSuffixIndex; i++ {
		start := a.a[i]
		length := start + len(sub)
		if length <= len(a.s) && a.s[start:length] == sub {
			o = append(o, start)
		}
	}
	return o
}

func (a *SuffixArray) searchLow(sub string) int {
	low := 0
	high := len(a.a) - 1
	for low < high {
		// low <= mid < high
		mid := (high + low) / 2
		suffixStart := a.a[mid]
		l := suffixStart + len(sub)
		if l > len(a.s) {
			l = len(a.s)
		}
		suffix := a.s[suffixStart:l]
		if sub > suffix {
			low = mid + 1
		} else {
			high = mid
		}
	}
	return low
}

func (a *SuffixArray) searchHigh(sub string) int {
	low := 0
	high := len(a.a) - 1
	for low < high {
		// low < mid <= high
		mid := (high + low + 1) / 2
		suffixStart := a.a[mid]
		l := suffixStart + len(sub)
		if l > len(a.s) {
			l = len(a.s)
		}
		suffix := a.s[suffixStart:l]
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
