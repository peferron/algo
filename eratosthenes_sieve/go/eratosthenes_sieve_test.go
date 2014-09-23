package eratosthenes_sieve

import (
	"testing"
)

var primes = []int{2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47}

func TestNext(t *testing.T) {
	s := NewSieve()
	for i, expected := range primes {
		if actual := s.Next(); actual != expected {
			t.Errorf("Expected prime #%d to be %d, was %d", i, expected, actual)
		}
	}
}
