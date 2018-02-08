public func squareRoot(_ value: Float, tolerance: Float) -> Float {
    let toleranceSquared = tolerance * tolerance
    var (low, high) = value < 1 ? (value, 1) : (1, value)

    while true {
        let mid = low + (high - low) / 2
        let midSquared = mid * mid

        if abs(midSquared - value) < toleranceSquared {
            return mid
        }

        if midSquared < value {
            low = mid
        } else {
            high = mid
        }
    }
}
