// swiftlint:disable variable_name

import Darwin

let tests = [
    (
        a: [0],
        b: [0],
        merged: [0, 0]
    ),
    (
        a: [0],
        b: [1],
        merged: [0, 1]
    ),
    (
        a: [0, 1, 3, 4, 5, 12],
        b: [2, 4, 4, 6, 20],
        merged: [0, 1, 2, 3, 4, 4, 4, 5, 6, 12, 20]
    ),
]

func toList(values: [Int]) -> Node {
    let first = Node(value: values.first!)
    var previous = first

    for value in values.dropFirst(1) {
        let current = Node(value: value)
        previous.next = current
        previous = current
    }

    return first
}

func toArray(head: Node) -> [Int] {
    var values = [Int]()
    var current: Node? = head

    while let c = current {
        values.append(c.value)
        current = c.next
    }

    return values
}

for test in tests {
    let actual = toArray(merge(toList(test.a), toList(test.b)))
    guard actual == test.merged else {
        print("For a \(test.a) and b \(test.b), expected merged to be \(test.merged), " +
            "but was \(actual)")
        exit(1)
    }
}
