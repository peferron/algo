package skip_list

import "math/rand"

type SkipList struct {
	head *element
}

type element struct {
	data Data
	next []*element
}

type Data struct {
	Key   string
	Value int
}

const p = 0.25

func NewSkipList() *SkipList {
	return &SkipList{&element{}}
}

func (l *SkipList) Get(key string) (value int, ok bool) {
	e := l.head
	layer := len(l.head.next) - 1
	for layer >= 0 {
		n := e.next[layer]
		if n == nil || n.data.Key > key {
			// Search the next lower layer.
			layer--
			continue
		}
		if n.data.Key == key {
			return n.data.Value, true
		}
		// Continue searching the current layer.
		e = n
	}
	return 0, false
}

func (l *SkipList) Set(key string, value int) {
	var prevs []*element
	e := l.head
	layer := len(l.head.next) - 1
	for layer >= 0 {
		n := e.next[layer]
		if n == nil || n.data.Key > key {
			// Keep a reference to the previous node; will be useful if it ends with an insertion.
			prevs = append(prevs, e)
			// Search the next lower layer.
			layer--
			continue
		}
		if n.data.Key == key {
			n.data.Value = value
			return
		}
		// Continue searching the current layer.
		e = n
	}
	newElement := &element{Data{key, value}, nil}
	insert(l.head, prevs, newElement)
}

func insert(head *element, prevs []*element, e *element) {
	for layer := 0; layer == 0 || coinflip(); layer++ {
		var prev *element
		if layer < len(prevs) {
			// The element will be inserted in a preexisting layer.
			// prevs was built in reverse order.
			prev = prevs[len(prevs)-1-layer]
		} else {
			// The element will be inserted in a new empty layer.
			head.next = append(head.next, nil)
			prev = head
		}
		e.next = append(e.next, prev.next[layer])
		prev.next[layer] = e
	}
}

func (l *SkipList) Del(key string) {
	e := l.head
	layer := len(l.head.next) - 1
	for layer >= 0 {
		n := e.next[layer]
		if n == nil || n.data.Key > key {
			// Search the next lower layer.
			layer--
			continue
		}
		if n.data.Key == key {
			e.next[layer] = n.next[layer]
			if l.head.next[layer] == nil {
				// Delete empty layer.
				l.head.next = l.head.next[:len(l.head.next)-1]
			}
			// Continue deletion at the next lower layer.
			layer--
			continue
		}
		// Continue searching the current layer.
		e = n
	}
}

func (l *SkipList) All() []Data {
	a := []Data{}
	if len(l.head.next) < 1 {
		return a
	}
	for e := l.head.next[0]; e != nil; e = e.next[0] {
		a = append(a, e.data)
	}
	return a
}

func coinflip() bool {
	return rand.Float32() < p
}
