# Rotating calipers

[https://en.wikipedia.org/wiki/Rotating_calipers](https://en.wikipedia.org/wiki/Rotating_calipers)

The algorithm implemented here returns all [antipodal pairs](https://en.wikipedia.org/wiki/Antipodal_point) of a convex polygon. It runs in O(n) time, where n is the number of points in the polygon.

This algorithm is then applied to find the diameter of a convex polygon, in again O(n) time.

If the input is a set of points rather than a convex polygon, or if the polygon cannot be provided in standard form (i.e. counter-clockwise order, distinct vertices, and no collinear vertices), the solution is to first construct the [convex hull](https://en.wikipedia.org/wiki/Convex_hull) of this set of points, and then run the rotating calipers algorithm on this convex hull. The *monotone chain* convex hull algorithm is particularly suitable, since it returns the lower and upper parts of the convex hull, which are used by the rotating calipers algorithm implemented here. See the [convex_hull](../convex_hull) module.

