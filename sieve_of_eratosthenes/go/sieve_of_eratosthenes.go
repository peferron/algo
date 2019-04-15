package eratosthenes_sieve

type Sieve struct {
	// The last tested number.
	i int

	// Maps each composite to a list of primes that divide it.
	sieve map[int][]int
}

func NewSieve() *Sieve {
	return &Sieve{
		1,
		map[int][]int{},
	}
}

func (s *Sieve) Next() int {
	for {
		s.i++
		primes, ok := s.sieve[s.i]
		delete(s.sieve, s.i)

		if !ok {
			// i is a prime.
			// All multiples i*j with j < i have already been marked when j has been processed, so
			// the first multiple that needs to be marked is i*i.
			s.sieve[s.i*s.i] = []int{s.i}
			return s.i
		}

		// i is a composite.
		for _, p := range primes {
			// i is a multiple of p: i = n*p.
			// Now, the next multiple of p needs to be marked: m = (n+1)*p = i+p.
			m := s.i + p
			s.sieve[m] = append(s.sieve[m], p)
		}
	}
}
