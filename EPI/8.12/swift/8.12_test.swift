import Darwin

let tests = [
    (list: [0], isPalindrome: true),
    (list: [0, 1], isPalindrome: false),
    (list: [0, 0], isPalindrome: true),
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

for test in tests {
    let actual = toList(test.list).isPalindrome()
    guard actual == test.isPalindrome else {
        print("For list \(test.list), expected isPalindrome to be \(test.isPalindrome), " +
            "but was \(actual)")
        exit(1)
    }
}
