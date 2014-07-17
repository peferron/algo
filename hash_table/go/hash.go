package hash_table

func hash(s string) uint32 {
	var h uint32
	for _, r := range s {
		// Simple multiplicative hash. The constant 101 works well, see
		// http://www.strchr.com/hash_functions
		h = 101*h + uint32(r)
	}
	return h
}

func hashMod(s string, mod int) int {
	return int(hash(s) % uint32(mod))
}
