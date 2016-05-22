# Bin packing

[https://en.wikipedia.org/wiki/Bin_packing_problem](https://en.wikipedia.org/wiki/Bin_packing_problem)

The algorithm implemented here is the *first-fit decreasing* heuristic:

* Processes items from biggest to smallest, placing each item in the first bin that can accomodate it.
* Uses at most 22% more bins than necessary.
* Runs in O(n log n + bn) time, where n is the number of items and b the number of bins used. A faster O(n log n) implementation is possible by using a binary tree to keep track of the space remaining in each bin.
