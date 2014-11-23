# Integer partition generation

This algorithm is implemented following Steven Skiena's book [The Algorithm Design Manual](http://amzn.com/1848000693). Relevant excerpt:

> The easiest way to generate integer partitions is to construct them in lexicographically decreasing order. The first partition is {n} itself. The general rule is to subtract 1 from the smallest part that is > 1 and then collect all the 1's so as to match the next smallest part > 1. For example, the partition following {4, 3, 3, 3, 1, 1, 1, 1} is {4, 3, 3, 2, 2, 2, 1}, since the five 1's left after 3 - 1 = 2 becomes the smallest part are best packaged as 2, 2, 1. When the partition is all 1's, we have completed one pass through all the partitions.

This excerpt describes well the *how*, but not quite the *why*, so for a slighly different explanation please refer to the comments in the code.
