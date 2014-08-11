# Trie

[http://en.wikipedia.org/wiki/Trie](http://en.wikipedia.org/wiki/Trie)

* Space complexity: O(alphabet size * average key length * n).
* Time complexity:
    * Search: O(key length).
    * Insert: O(key length).
    * Delete: O(key length).
* Pre-order traversal returns a list of the elements in lexicographical order.

The tries implemented here are not compact; each edge carries a single character.
