package generalized_suffix_tree

import (
	"reflect"
	"sort"
	"strings"
	"testing"
)

func TestAllOccurrences(t *testing.T) {
	var tests = []struct {
		s           string
		sub         string
		occurrences []int
	}{
		{"aba ghhg defabax", "bad", []int{}},
		{"aba ghhg defabax", "ba", []int{1, 13}},
	}

	for _, test := range tests {
		occurrences := AllOccurrences(test.s, test.sub)

		// AllOccurrences doesn't guarantee the output order, so it must be sorted before comparing.
		sort.Ints(occurrences)

		if !reflect.DeepEqual(occurrences, test.occurrences) {
			t.Errorf("For input string %q, expected all occurrences of %q to be %v, was %v",
				test.s, test.sub, test.occurrences, occurrences)
		}
	}
}

func TestLongestCommonSubstring(t *testing.T) {
	// func TestLongestCommonSubstring(t *testing.T) {
	var tests = []struct {
		a   []string
		lcs string
	}{
		{
			[]string{"a", "ab", "ab"},
			"a",
		},
		{
			[]string{"abc", "ddbc"},
			"bc",
		},
		{
			[]string{"ab", "xaby", "zaby"},
			"ab",
		},
		{
			[]string{"abcABCDdef", "BCDghi", "jklABC"},
			"BC",
		},
	}

	for _, test := range tests {
		if lcs := LongestCommonSubstring(test.a); lcs != test.lcs {
			t.Errorf("For input strings %q, expected longest common substring to be %q, was %q",
				test.a, test.lcs, lcs)
		}
	}
}

func TestLongestPalindrome(t *testing.T) {
	var tests = []struct {
		s  string
		lp string
	}{
		{"aba bcdcba", "bcdcb"},
		{"abcddxcba", "dd"},
	}

	for _, test := range tests {
		if lp := LongestPalindrome(test.s); lp != test.lp {
			t.Errorf("For input string %q, expected longest palindrome to be %q, was %q",
				test.s, test.lp, lp)
		}
	}
}

func TestShortestCommonSuperstring(t *testing.T) {
	// Note that in Go, the iteration order on maps is unspecified and can change between different
	// runs. (The Go authors actually randomized it to prevent users from relying on a particular
	// order.) Since our tree uses maps to represent edges, this results in different merging orders
	// and different final results between test runs.

	var tests = []struct {
		a         []string
		maxScsLen int
	}{
		{
			[]string{"abc", "bcd"},
			4, // abcd
		},
		{
			// Skiena. But the real shortest common superstring is not ABRACADABRA! I'm not the
			// first to find out: http://www3.cs.stonybrook.edu/~skiena/algorist/book/errata
			[]string{"ABRAC", "RACAD", "ACADA", "ADABR", "DABRA"},
			10, // RACADABRAC or ADABRACADA
		},
		{
			// The greedy heuristic can misfire quite badly on this one, depending on the merging
			// order. The SCS is length 5 (a_bcd_e), but the greedy heuristic can return length 11
			// (a_bcd_bcd_e) or even 15 (a_bcd_ecd_bcd_b and variants).
			[]string{"a_bc", "_bcd_", "bcd_b", "cd_bc", "bcd_e", "d_bcd", "d_e", "cd_e"},
			15,
		},
	}

	for _, test := range tests {
		scs := ShortestCommonSuperstring(test.a)

		if len(scs) > test.maxScsLen {
			t.Errorf("For input strings %q, expected shortest common substring to have "+
				"length <= %d, was %d (%q)", test.a, test.maxScsLen, len(scs), scs)
		}

		for _, s := range test.a {
			if !strings.Contains(scs, s) {
				t.Errorf("For input strings %q, shortest common substring %q does not contain "+
					" input string %q", test.a, scs, s)
			}
		}
	}
}
