package hash_table

func hash(s string, mod int) int {
	return int(rawHash(s) % uint32(mod))
}

func rawHash(s string) uint32 {
	var h uint32
	for _, r := range s {
		h = 101*h + uint32(r)
	}
	return h
}
