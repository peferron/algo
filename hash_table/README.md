# Hash table

[http://en.wikipedia.org/wiki/Hash_table](http://en.wikipedia.org/wiki/Hash_table)

* Space complexity: O(n).
* Time complexity (not including hashing, which is usually O(key length)):
    * Search: worst case O(n), average O(1).
    * Insert: worst case O(n), average O(1).
    * Delete: worst case O(n), average O(1).
* Cannot return a list of the elements in sorted order.

The hash tables implemented here use a simple multiplicative hash with [101 as factor](http://www.strchr.com/hash_functions). Collisions are resolved by chaining.
