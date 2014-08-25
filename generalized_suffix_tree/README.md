# Generalized suffix tree

[http://http://en.wikipedia.org/wiki/Generalized_suffix_tree](http://http://en.wikipedia.org/wiki/Generalized_suffix_tree)

* Space complexity: O(n).
* Time complexity:
    * Construction: O(n).
    * Find the longest common substring: O(n).

The generalized suffix trees implemented here are implemented with a naïve construction taking O(n²) time. Also, instead of using unique string terminators, each node is labelled with the strings it appears in, using a bit vector.
