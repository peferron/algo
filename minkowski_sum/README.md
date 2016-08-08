# Minkowski sum

[https://en.wikipedia.org/wiki/Minkowski_addition](https://en.wikipedia.org/wiki/Minkowski_addition)

The algorithm implemented here computes the Minkowski sum of two convex polygons in O(n + m) time, where n and m are the number of vertices of the polygons.

To compute the Minkowski sum of two non-convex polygons A and B, triangulate both polygons first, then compute the Minkowski sum of each triangle of A against each triangle of B. See the [triangulation](../triangulation) module.
