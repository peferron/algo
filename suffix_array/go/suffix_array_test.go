package suffix_array

import (
	"reflect"
	"testing"
)

func TestFirstOccurrence(t *testing.T) {
	a := NewSuffixArray("aba ghhg defabax")

	if o := a.FirstOccurrence("bad"); o != -1 {
		t.Errorf("Expected first occurrence of \"bad\" to be -1, was %d", o)
	}

	if o := a.FirstOccurrence("ba"); o != 1 {
		t.Errorf("Expected first occurrence of \"ba\" to be 1, was %d", o)
	}
}

func TestAllOccurrences(t *testing.T) {
	a := NewSuffixArray("aba ghhg defabax")

	if o := a.AllOccurrences("bad"); !reflect.DeepEqual(o, []int{}) {
		t.Errorf("Expected occurrences of \"ba\" to be [], was %v", o)
	}

	if o := a.AllOccurrences("ba"); !reflect.DeepEqual(o, []int{1, 13}) {
		t.Errorf("Expected occurrences of \"ba\" to be [1, 13], was %v", o)
	}
}
