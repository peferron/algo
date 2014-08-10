package hash_table

type HashTable struct {
	a []*[]element
}

type element struct {
	key   string
	value interface{}
}

func NewHashTable(size int) *HashTable {
	// fmt.Printf("NewHashTable: size %d\n", size)

	a := make([]*[]element, size)
	return &HashTable{a}
}

func (t *HashTable) Get(key string) (value interface{}, ok bool) {
	h := hashMod(key, len(t.a))
	elements := t.a[h]

	if i := indexOf(elements, key); i < 0 {
		ok = false
	} else {
		value = (*elements)[i].value
		ok = true
	}

	// fmt.Printf("get: %q -> %d, %t\n", key, value, ok)
	return
}

func (t *HashTable) Set(key string, value interface{}) {
	// fmt.Printf("set: %q, %d\n", k, v)

	h := hashMod(key, len(t.a))
	elements := t.a[h]
	newElement := element{key, value}

	if elements == nil {
		t.a[h] = &[]element{newElement}
		return
	}
	if i := indexOf(elements, key); i < 0 {
		*elements = append(*elements, newElement)
	} else {
		(*elements)[i] = newElement
	}
}

func (t *HashTable) Del(key string) {
	// fmt.Printf("del: %q\n", k)

	h := hashMod(key, len(t.a))
	elements := t.a[h]

	if i := indexOf(elements, key); i >= 0 {
		del(elements, i)
	}
}

func indexOf(a *[]element, key string) int {
	if a == nil {
		return -1
	}
	for i, element := range *a {
		if element.key == key {
			return i
		}
	}
	return -1
}

func del(a *[]element, i int) {
	last := len(*a) - 1
	if i < last {
		(*a)[i] = (*a)[last]
	}
	(*a) = (*a)[:last]
}
