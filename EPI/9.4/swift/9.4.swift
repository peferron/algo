public func normalize(path: String) -> String {
    let items = path.characters.split("/", allowEmptySlices: true).map(String.init)
    var normalizedItems = [String]()

    for (index, item) in items.enumerate() {
        switch item {
            case "":
                if index == 0 || index == items.count - 1 {
                    normalizedItems.append(item)
                }

            case ".":
                break

            case "..":
                if let last = normalizedItems.last where last != ".." {
                    normalizedItems.removeLast()
                } else {
                    normalizedItems.append(item)
                }

            default:
                normalizedItems.append(item)
        }
    }

    return normalizedItems.isEmpty ? "." : String(normalizedItems.joinWithSeparator("/"))
}
