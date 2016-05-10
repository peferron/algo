import Darwin

let fns = [profitBruteforce, profitLinear]

let tests: [(prices: [Int], profit: Int)] = [
    (
        prices: [1],
        profit: 0
    ),
    (
        prices: [1, 2],
        profit: 1
    ),
    (
        prices: [2, 1],
        profit: 0
    ),
    (
        prices: [3, 5, 1, 4],
        profit: 3
    ),
    (
        prices: [0, 5, 1, 4],
        profit: 5
    ),
    (
        prices: [0, 4, 1, 5],
        profit: 5
    ),
    (
        prices: [310, 315, 275, 295, 260, 270, 290, 230, 255, 250],
        profit: 30
    ),
]

for fn in fns {
    for test in tests {
        var actual = fn(test.prices)
        guard actual == test.profit else {
            print("For prices \(test.prices), expected profit to be \(test.profit), " +
                "but was \(actual)")
            exit(1)
        }
    }
}
