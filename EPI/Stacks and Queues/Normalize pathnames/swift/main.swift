public func normalize(path: String) -> String {
    let items = path.split(separator: "/", omittingEmptySubsequences: false).map(String.init)
    var normalizedItems = [String]()

    for (index, item) in items.enumerated() {
        switch item {
            case "":
                if index == 0 || index == items.count - 1 {
                    normalizedItems.append(item)
                }

            case ".":
                break

            case "..":
                if let last = normalizedItems.last, last != ".." {
                    normalizedItems.removeLast()
                } else {
                    normalizedItems.append(item)
                }

            default:
                normalizedItems.append(item)
        }
    }

    return normalizedItems.isEmpty ? "." : String(normalizedItems.joined(separator: "/"))
}
