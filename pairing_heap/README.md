# Pairing heap

[http://en.wikipedia.org/wiki/Pairing_heap](http://en.wikipedia.org/wiki/Pairing_heap)

* Space complexity: O(n).
* Time complexity:
    * Insert: O(1).
    * Find-min: O(1).
    * Delete-min: amortized O(log n).
    * Decrease-key: amortized O(2^(2*sqrt(log log n)). Very good in practice.
    * Merge: O(1).
