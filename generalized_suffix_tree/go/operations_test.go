package generalized_suffix_tree

import (
	"reflect"
	"sort"
	"testing"
)

func TestAllOccurrences(t *testing.T) {
	var tests = []struct {
		inStr string
		inSub string
		out   []int
	}{
		{"aba ghhg defabax", "bad", []int{}},
		{"aba ghhg defabax", "ba", []int{1, 13}},
	}

	for _, test := range tests {
		out := AllOccurrences(test.inStr, test.inSub)

		// AllOccurrences doesn't guarantee the output order, so it must be sorted before comparing.
		sort.Ints(out)

		if !reflect.DeepEqual(out, test.out) {
			t.Errorf("For input string %q, expected all occurrences of %q to be %v, was %v",
				test.inStr, test.inSub, test.out, out)
		}
	}
}

func TestLongestCommonSubstring(t *testing.T) {
	var tests = []struct {
		in  []string
		out string
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
			[]string{"abc0123def", "123ghi", "jkl012"},
			"12",
		},
	}

	for _, test := range tests {
		if out := LongestCommonSubstring(test.in); out != test.out {
			t.Errorf("For input strings %q, expected longest common substring to be %q, was %q",
				test.in, test.out, out)
		}
	}
}

func TestLongestPalindrome(t *testing.T) {
	var tests = []struct {
		in  string
		out string
	}{
		{"aba bcdcba", "bcdcb"},
		{"abcddxcba", "dd"},
	}

	for _, test := range tests {
		if out := LongestPalindrome(test.in); out != test.out {
			t.Errorf("For input string %q, expected longest palindrome to be %q, was %q",
				test.in, test.out, out)
		}
	}
}
