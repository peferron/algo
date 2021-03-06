# Levenshtein distance

[https://en.wikipedia.org/wiki/Levenshtein_distance](https://en.wikipedia.org/wiki/Levenshtein_distance)

The algorithm implemented here is the [Wagner–Fischer](https://en.wikipedia.org/wiki/Wagner%E2%80%93Fischer_algorithm) algorithm. It measures the Levenshtein distance between two strings in O(mn) space and O(mn) time, where m and n are the lengths of the strings.

The module [longest_common_subsequence](../longest_common_subsequence) uses a very similar algorithm to find the longest common subsequence of two strings.

The TypeScript implementation accesses characters using `str[index]` and likely doesn't support Unicode properly.
