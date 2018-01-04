var cache = ISBNCache(capacity: 5)

assert(cache.lookup("123") == nil, "cache.lookup(\"123\") == nil #1")

cache.insert("123", price: 123)

assert(cache.lookup("123")! == 123, "cache.lookup(\"123\")! == 123 #1")

cache.remove("123")

assert(cache.lookup("123") == nil, "cache.lookup(\"123\") == nil #2")

cache.insert("123", price: 123)

assert(cache.lookup("123")! == 123, "cache.lookup(\"123\")! == 123 #2")

cache.insert("234", price: 234)
cache.insert("345", price: 345)
cache.insert("456", price: 456)
cache.insert("123", price: 123)
cache.insert("567", price: 567)
cache.insert("678", price: 678)

assert(cache.lookup("123")! == 123, "cache.lookup(\"123\")! == 123 #3")
assert(cache.lookup("234") == nil, "cache.lookup(\"234\") == nil")

cache.insert("789", price: 789)

assert(cache.lookup("345") == nil, "cache.lookup(\"345\") == nil")

cache.insert("456", price: 456)
cache.insert("567", price: 567)
cache.insert("678", price: 678)

assert(cache.lookup("123")! == 123, "cache.lookup(\"123\")! == 123 #4")
assert(cache.lookup("456")! == 456, "cache.lookup(\"456\")! == 456")
assert(cache.lookup("567")! == 567, "cache.lookup(\"567\")! == 567")
assert(cache.lookup("678")! == 678, "cache.lookup(\"678\")! == 678")
assert(cache.lookup("789")! == 789, "cache.lookup(\"789\")! == 789")
