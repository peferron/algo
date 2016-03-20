# Generalized suffix tree

[http://en.wikipedia.org/wiki/Generalized_suffix_tree](http://en.wikipedia.org/wiki/Generalized_suffix_tree)

* Space complexity: O(n).
* Time complexity:
    * Construction: O(n).
    * Find all z occurrences of a substring k: O(|k| + z).
    * Find the longest common substring: O(n), where n is the cumulated length of the strings.
    * Find the longest palindromic substring: O(n).
    * Find the shortest common superstring (greedy heuristic, problem is NP-complete): O(kn), where k is the number of strings and n the cumulated length of the strings.

Implementation details and limitations:

* The generalized suffix tree is naïvely constructed in O(n²) time.
* Lowest common ancestor (LCA) queries are not pre-processed.
* The string terminators are the digits from 0 to 9.
* Unicode is not properly supported.
