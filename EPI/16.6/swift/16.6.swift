public func matchedParens(pairs: Int) -> [String] {
    return matchedParens(remaining: pairs * 2, opened: 0)
}

private func matchedParens(remaining: Int, opened: Int) -> [String] {
    if remaining <= 0 {
        return [""]
    }

    var results = [String]()

    if remaining > opened {
        // We can open a new pair of parens and still have enough remaining space to close it later.
        results += matchedParens(remaining: remaining - 1, opened: opened + 1).map { "(" + $0 }
    }

    if opened > 0 {
        // We can close an opened pair of parens.
        results += matchedParens(remaining: remaining - 1, opened: opened - 1).map { ")" + $0 }
    }

    return results
}
