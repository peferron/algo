# Suffix array

[http://en.wikipedia.org/wiki/Suffix_array](http://en.wikipedia.org/wiki/Suffix_array)

* Space complexity: O(n).
* Time complexity:
    * Construction: O(n).
    * Find the longest palindrome: O(1).
    * Find the first occurrence of a substring k: O(|k| + log n).
    * Find all z occurrences of a substring k: O(|k| + z + log n).
    * Find the longest substring common to a set of strings: construction O(n1 + n2 + ... + nk), then O(1).

The suffix arrays implemented here are naïve and have worse time complexity:
* Construction: O(n² log n).
* Find the first occurrence of a substring k: O(|k| log n).
