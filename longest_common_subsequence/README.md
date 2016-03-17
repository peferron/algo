# Longest common subsequence

[https://en.wikipedia.org/wiki/Longest_common_subsequence_problem](https://en.wikipedia.org/wiki/Longest_common_subsequence_problem)

The algorithm implemented here returns the longest common subsequence of two sequences in O(mn) space and O(mn) time, where m and n are the lengths of the sequences.

The module [levenshtein_distance](../levenshtein_distance) uses a very similar algorithm to measure the edit distance between two sequences.

# Shortest common supersequence

[https://en.wikipedia.org/wiki/Shortest_common_supersequence_problem](https://en.wikipedia.org/wiki/Shortest_common_supersequence_problem)

An algorithm that returns the shortest common supersequence of two sequences is also implemented here, as it can be easily obtained from their longest common subsequence, in O(m + n) additional time. This solution doesn't scale to more than two sequences though.
