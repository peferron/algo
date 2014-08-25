package generalized_suffix_tree

import "testing"

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
			[]string{"ab", "xaby"},
			"ab",
		},
		{
			[]string{"abc0123def", "123ghi", "jkl012"},
			"12",
		},
	}

	for _, test := range tests {
		a := NewGST(test.in...)
		if out := a.LongestCommonSubstring(); out != test.out {
			t.Errorf("For input strings %q, expected longest common substring to be %q, was %q",
				test.in, test.out, out)
		}
	}
}
