# Generalized suffix tree

[http://http://en.wikipedia.org/wiki/Generalized_suffix_tree](http://http://en.wikipedia.org/wiki/Generalized_suffix_tree)

* Space complexity: O(n).
* Time complexity:
    * Construction: O(n).
    * Find all z occurrences of a substring k : O(|k| + z).
    * Find the longest common substring: O(n).
    * Find the longest palindromic substring: O(n).

The generalized suffix trees implemented here are naïvely constructed in O(n²) time, and do not preprocess lowest common ancestor (LCA) queries. Only three string terminators are configured: $, # and %.
