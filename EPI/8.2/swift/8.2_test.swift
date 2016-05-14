import Darwin

func test1() {
    let a = Node()

    let reversedHead = reverse(a)

    guard reversedHead === a && a.next == nil else {
        print("Failed test1")
        exit(1)
    }
}

func test3() {
    let (a, b, c) = (Node(), Node(), Node())
    a.next = b
    b.next = c

    let reversedHead = reverse(a)

    guard reversedHead === c && c.next === b && b.next === a && a.next === nil else {
        print("Failed test3")
        exit(1)
    }
}

test1()
test3()
