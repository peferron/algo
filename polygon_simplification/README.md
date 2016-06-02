# Polygon simplification

The algorithm implemented here is the [Ramer–Douglas–Peucker](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm). It simplifies polygonal chains in O(n) time, where n is the number of points.

This implementation could be optimized further: currently, the first and last points in the chain are always included in the output, which may make sense for open polygonal chains (i.e. paths) but not so much for closed polygonal chains (i.e. polygons). Working with squared distances would also be less expensive than calculating square roots.
