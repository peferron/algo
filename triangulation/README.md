# Point set triangulation

[https://en.wikipedia.org/wiki/Point_set_triangulation](https://en.wikipedia.org/wiki/Point_set_triangulation)

Two algorithms are implemented here:

* An algorithm adapted from the [monotone chain](https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain) algorithm (see the [convex_hull](../convex_hull) module), that triangulates a set of points in O(n log n) time. 

* A [triangle flipping](https://en.wikipedia.org/wiki/Delaunay_triangulation#Flip_algorithms) algorithm, that converts any triangulation into a [Delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation) in O(n²) time.

Incremental algorithms exist that build Delaunay triangulations in O(n log n) time, but they are not implemented here.
