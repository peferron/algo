({
    var a = Node(value: 5, next: nil)
    let head = a.sort()
    assert(head === a)
    assert(head.next === nil)
}())

({
    var b = Node(value: 5, next: nil)
    var a = Node(value: 3, next: b)
    let head = a.sort()
    assert(head === a)
    assert(head.next! === b)
    assert(head.next!.next === nil)
}())

({
    var b = Node(value: 3, next: nil)
    var a = Node(value: 5, next: b)
    let head = a.sort()
    assert(head === b)
    assert(head.next! === a)
    assert(head.next!.next === nil)
}())

({
    var d = Node(value: 4, next: nil)
    var c = Node(value: 3, next: d)
    var b = Node(value: 4, next: c)
    var a = Node(value: 5, next: b)
    let head = a.sort()
    assert(head === c)
    assert(head.next! === b)
    assert(head.next!.next! === d)
    assert(head.next!.next!.next! === a)
    assert(head.next!.next!.next!.next === nil)
}())
