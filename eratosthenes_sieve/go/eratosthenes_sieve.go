package eratosthenes_sieve

type Sieve struct {
	i      int
	primes []int
}

func NewSieve() *Sieve {
	return &Sieve{0, []int{}}
}

func (s *Sieve) Next() int {
	s.i++
	for divisible(s.i, s.primes) {
		s.i++
	}
	if s.i != 1 {
		s.primes = append(s.primes, s.i)
	}
	return s.i
}

func divisible(n int, by []int) bool {
	for _, b := range by {
		if n%b == 0 {
			return true
		}
	}
	return false
}
