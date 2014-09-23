package eratosthenes_sieve

// http://stackoverflow.com/a/568618

type Sieve struct {
	// The last returned prime.
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

		if _, ok := s.sieve[s.i]; !ok {
			// i is a prime.
			// All multiples i*j with j < i have already been marked when j has been processed, so
			// the first multiple that needs to be marked is i*i.
			s.sieve[s.i*s.i] = []int{s.i}
			return s.i
		}

		// i is a composite.
		for _, p := range s.sieve[s.i] {
			// i is a multiple of p: i = n*p.
			// Now, the next multiple of p needs to be marked: m = (n+1)*p = i+p.
			m := s.i + p
			s.sieve[m] = append(s.sieve[m], p)
		}
		// i won't be needed in the sieve anymore.
		delete(s.sieve, s.i)
	}
}
