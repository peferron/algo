package string_matching

import (
	"reflect"
	"testing"
)

var tests = []struct {
	text    string
	pattern string
	indexes []int
}{
	{"abcdabc", "abcdabd", []int{}},
	{"abcdabc", "ef", []int{}},
	{"abcdabc", "cd", []int{2}},
	{"abcdabc", "bc", []int{1, 5}},
	{"aaaaaa", "aaa", []int{0, 1, 2, 3}},
	{"abcdabc", "b", []int{1, 5}},
	{"aeaeax", "aeax", []int{2}},
	{"abababc", "abc", []int{4}},
	{"abababadc", "ababad", []int{2}},
	{"just testing table generation", "participate in parachute", []int{}},
	// The index is expressed in bytes, following Go's standard library conventions.
	{"小猫🐱小狗🐶大猪🐷", "小", []int{0, 10}},
}

func Test(t *testing.T) {
	for i, test := range tests {
		if indexes := Indexes(test.text, test.pattern); !reflect.DeepEqual(indexes, test.indexes) {
			t.Errorf("In test #%d with input text '%v' and pattern '%v', expected indexes to be "+
				"%v, was %v", i, test.text, test.pattern, test.indexes, indexes)
		}
	}
}
