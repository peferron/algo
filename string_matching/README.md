# String matching

[https://en.wikipedia.org/wiki/String_searching_algorithm](https://en.wikipedia.org/wiki/String_searching_algorithm)

The algorithm implemented here is [Knuth–Morris–Pratt](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm).

Time complexity: O(m + n), where m is the length of the pattern and n the length of the searchable text.

See also the modules [suffix_array](.//suffix_array) and [generalized_suffix_tree](../generalized_suffix_tree), which offer great performance for various string searching operations, such as searching the same string multiple times with different patterns.
