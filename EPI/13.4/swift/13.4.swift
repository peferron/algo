private struct CachedValue {
    let price: Int
    var olderISBN: String?
    var newerISBN: String?
}

public struct ISBNCache {
    public let capacity: Int
    private var cache: [String: CachedValue]
    private var oldestISBN: String?
    private var newestISBN: String?

    public init(capacity: Int) {
        self.capacity = capacity
        self.cache = [String: CachedValue](minimumCapacity: capacity)
    }

    public mutating func lookup(_ ISBN: String) -> Int? {
        if let price = cache[ISBN]?.price {
            // Removing then inserting is the easiest way to bump the ISBN to newest, but it also
            // performs unnecessary work and could be optimized.
            self.remove(ISBN)
            self.insert(ISBN, price: price)
            return price
        }

        return nil
    }

    public mutating func insert(_ ISBN: String, price: Int) {
        if cache[ISBN] != nil {
            return
        }

        // Remove oldest ISBN if necessary.
        if cache.count >= capacity {
            self.remove(self.oldestISBN!)
        }

        // Insert as newest ISBN.
        cache[ISBN] = CachedValue(price: price, olderISBN: self.newestISBN, newerISBN: nil)
        if let newestISBN = self.newestISBN {
            cache[newestISBN]!.newerISBN = ISBN
        }
        self.newestISBN = ISBN
        self.oldestISBN = self.oldestISBN ?? ISBN
    }

    public mutating func remove(_ ISBN: String) {
        if let value = cache[ISBN] {
            cache.removeValue(forKey: ISBN)

            if let olderISBN = value.olderISBN {
                cache[olderISBN]!.newerISBN = value.newerISBN
            }

            if let newerISBN = value.newerISBN {
                cache[newerISBN]!.olderISBN = value.olderISBN
            }

            if ISBN == self.oldestISBN {
                self.oldestISBN = value.newerISBN
            }

            if ISBN == self.newestISBN {
                self.newestISBN = value.olderISBN
            }
        }
    }
}
