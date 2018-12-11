// swiftlint:disable variable_name

public func product(_ a: [Int], _ b: [Int]) -> [Int] {
    let negative = a[0] * b[0] < 0

    // We do not know in advance how many digits product will have. At most, it will have as many
    // digits as the sum of the number of digits of a and b, but that's just an upper bound.
    // If the most significants digits are at the beginning of the product array (just like a and
    // b), then we might have to insert or remove multiple entries from the beginning of the product
    // array, which take O(n) time each. To avoid that, we fill the product array in reverse order
    // (least significant digits at the beginning of the array), and then reverse the array before
    // returning it.
    var product = [Int](repeating: 0, count: a.count + b.count)

    for ai in 0..<a.count {
        let av = abs(a[a.count - 1 - ai])
        for bi in 0..<b.count {
            let bv = abs(b[b.count - 1 - bi])
            let pi = ai + bi
            product[pi] += av * bv
            if product[pi] > 9 {
                // Carry over overflowing digits.
                product[pi + 1] += product[pi] / 10
                product[pi] %= 10
            }
        }
    }

    // Trim zeros. Keep at least one digit in the array, in case the product is actually 0.
    while product.count > 1 && product.last! == 0 {
        product.removeLast()
    }

    if negative {
        product[product.count - 1] *= -1
    }

    product.reverse()
    return product
}
