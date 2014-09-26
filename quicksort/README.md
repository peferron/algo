# Quicksort

[http://en.wikipedia.org/wiki/Quicksort](http://en.wikipedia.org/wiki/Quicksort)

* Time complexity: worst case O(n²), average case O(n log n).
* Space complexity: O(log n).
* Not stable, but stable versions exist.

The naïve implementation used here has a worst case space complexity of O(n). This space complexity comes from the call stack depth. By always performing recursion on the smaller portion first, and then using tail call optimization (or iteration if TCO is not available) on the larger portion, the worst case space complexity can be reduced to O(log n).
