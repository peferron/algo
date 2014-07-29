package hash_table

type item struct {
	k string
	v int
}

type HashTable []*[]item

func NewHashTable(size int) *HashTable {
	// fmt.Printf("NewHashTable: size %d\n", size)

	t := make(HashTable, size)
	return &t
}

func (t *HashTable) get(k string) (v int, ok bool) {
	h := hashMod(k, len(*t))
	items := (*t)[h]

	if i := indexOf(items, k); i < 0 {
		ok = false
	} else {
		v = (*items)[i].v
		ok = true
	}

	// fmt.Printf("get: %q -> %d, %t\n", k, v, ok)
	return
}

func (t *HashTable) set(k string, v int) {
	// fmt.Printf("set: %q, %d\n", k, v)

	h := hashMod(k, len(*t))
	items := (*t)[h]
	newItem := item{k, v}

	if items == nil {
		(*t)[h] = &[]item{newItem}
		return
	}
	if i := indexOf(items, k); i < 0 {
		*items = append(*items, newItem)
	} else {
		(*items)[i] = newItem
	}
}

func (t *HashTable) del(k string) {
	// fmt.Printf("del: %q\n", k)

	h := hashMod(k, len(*t))
	items := (*t)[h]

	if i := indexOf(items, k); i >= 0 {
		del(items, i)
	}
}

func indexOf(a *[]item, k string) int {
	if a == nil {
		return -1
	}
	for i, item := range *a {
		if item.k == k {
			return i
		}
	}
	return -1
}

func del(a *[]item, i int) {
	last := len(*a) - 1
	if i < last {
		(*a)[i] = (*a)[last]
	}
	(*a) = (*a)[:last]
}
