// O(exponent).
public func powerBruteforce(base base: Double, exponent: Int) -> Double {
    if exponent < 0 {
        return powerBruteforce(base: 1 / base, exponent: -exponent)
    }

    var result: Double = 1

    for _ in 0..<exponent {
        result *= base
    }

    return result
}

// O(log exponent).
public func powerSmartRecursive(base base: Double, exponent: Int) -> Double {
    switch exponent {
    case Int.min..<0:
        return powerSmartRecursive(base: 1 / base, exponent: -exponent)

    case 0:
        return 1

    case 1:
        return base

    default:
        let half = powerSmartRecursive(base: base, exponent: exponent / 2)
        let remainder = powerSmartRecursive(base: base, exponent: exponent % 2)
        return half * half * remainder
    }
}

// O(log exponent).
public func powerSmartIterative(base base: Double, exponent: Int) -> Double {
    var b = base
    var e = exponent

    if e < 0 {
        b = 1 / b
        e = -e
    }

    var result: Double = 1

    while e != 0 {
        if e & 1 == 1 {
            result *= b
        }
        b *= b
        e >>= 1
    }

    return result
}
