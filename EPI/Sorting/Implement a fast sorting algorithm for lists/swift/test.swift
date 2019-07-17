({
    let a = Node(value: 5, next: nil)
    let head = a.sort()
    assert(head === a)
    assert(head.next === nil)
}())

({
    let b = Node(value: 5, next: nil)
    let a = Node(value: 3, next: b)
    let head = a.sort()
    assert(head === a)
    assert(head.next! === b)
    assert(head.next!.next === nil)
}())

({
    let b = Node(value: 3, next: nil)
    let a = Node(value: 5, next: b)
    let head = a.sort()
    assert(head === b)
    assert(head.next! === a)
    assert(head.next!.next === nil)
}())

({
    let d = Node(value: 4, next: nil)
    let c = Node(value: 3, next: d)
    let b = Node(value: 4, next: c)
    let a = Node(value: 5, next: b)
    let head = a.sort()
    assert(head === c)
    assert(head.next! === b)
    assert(head.next!.next! === d)
    assert(head.next!.next!.next! === a)
    assert(head.next!.next!.next!.next === nil)
}())
