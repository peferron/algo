package string_matching

import "fmt"

// Instead of creating a slice of runes for the text and pattern, we could work directly with runes
// and use utf8.DecodeRuneInString(s). It would probably be faster. But creating these slices makes
// the main algorithm much more readable, while keeping the O(m + n) time complexity unchanged.

type Rune struct {
	value rune
	index int
}

func Runes(s string) []Rune {
	runes := []Rune{}
	for index, value := range s {
		runes = append(runes, Rune{value, index})
	}
	return runes
}

func (r Rune) String() string {
	return fmt.Sprintf("{%q, %d}", r.value, r.index)
}
