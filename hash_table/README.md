# Hash table

[http://en.wikipedia.org/wiki/Hash_table](http://en.wikipedia.org/wiki/Hash_table)

* Space complexity: O(n).
* Time complexity:
    * Search: worst case O(n), average O(1).
    * Insert: worst case O(n), average O(1).
    * Delete: worst case O(n), average O(1).

The hash tables implemented here use a simple multiplicative hash with [101 as factor](http://www.strchr.com/hash_functions). Collisions are resolved by chaining.