import Darwin

let tests = [
    (list: [0], isPalindrome: true),
    (list: [0, 1], isPalindrome: false),
    (list: [0, 0], isPalindrome: true),
    (list: [1, 2, 1], isPalindrome: true),
    (list: [1, 2, 2], isPalindrome: false),
    (list: [1, 5, 2, 2, 5, 1], isPalindrome: true),
    (list: [1, 5, 2, 3, 5, 1], isPalindrome: false),
    (list: [0, 1, 0, 3, 1, 1, 0], isPalindrome: false),
    (list: [0, 1, 0, 3, 0, 1, 0], isPalindrome: true),
]

func toList(_ values: [Int]) -> Node {
    let nodes = values.map(Node.init)
    for i in 0..<values.count - 1 {
        nodes[i].next = nodes[i + 1]
    }
    return nodes[0]
}

func toArray(_ list: Node) -> [Int] {
    var curr: Node? = list;
    var array = [Int]()
    while let c = curr {
        array.append(c.value)
        curr = c.next
    }
    return array
}

for test in tests {
    let list = toList(test.list)
    let isPalindrome = list.isPalindrome()

    guard isPalindrome == test.isPalindrome else {
        print("For list \(test.list), expected isPalindrome to be \(test.isPalindrome), " +
            "but was \(isPalindrome)")
        exit(1)
    }

    let values = toArray(list);

    guard values == test.list else {
        print("For list \(test.list), expected final list to be unchanged, but was \(values)")
        exit(1)
    }
}
