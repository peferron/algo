package hash_table

func hash(s string) uint64 {
	var h uint64
	for _, r := range s {
		h = 101*h + uint64(r)
	}
	return h
}

func hashMod(s string, mod int) int {
	return int(hash(s) % uint64(mod))
}
