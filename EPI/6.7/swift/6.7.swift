public func profitBruteforce(prices: [Int]) -> Int {
    var profit = 0

    for i in 0..<prices.count {
        for j in i + 1..<prices.count {
            profit = max(profit, prices[j] - prices[i])
        }
    }

    return profit
}

public func profitLinear(prices: [Int]) -> Int {
    var lowestPrice = Int.max
    var profit = 0

    for price in prices {
        lowestPrice = min(lowestPrice, price)
        profit = max(profit, price - lowestPrice)
    }

    return profit
}
