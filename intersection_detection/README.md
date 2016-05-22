# Intersection detection

[https://en.wikipedia.org/wiki/Line_segment_intersection](https://en.wikipedia.org/wiki/Line_segment_intersection)

Two algorithms are implemented here:

* An algorithm that returns the intersection point of two line segments.
* The [Bentley–Ottmann algorithm](https://en.wikipedia.org/wiki/Bentley%E2%80%93Ottmann_algorithm), which returns all k intersections of a set of n line segments in O((n + k) log n) time.

Note: for simplicity, the binary search tree implemented here to track the segments intersecting the sweep line (in the Bentley–Ottmann algorithm) is not self-balancing, but ideally it should be.
