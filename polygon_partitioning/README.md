# Polygon partitioning

The algorithm implemented here partitions a polygon into convex pieces. It runs in two steps:

1. Triangulate the polygon in O(n²) time using the [ear clipping method](https://www.geometrictools.com/Documentation/TriangulationByEarClipping.pdf). Any arbitrary triangulation would do, and algorithms with better time complexity exist, but the ear clipping method is simple.

2. Apply the [Hertel-Mehlhorn](http://www.dma.fi.upm.es/recursos/aplicaciones/geometria_computacional_y_grafos/web/piezas_convexas/algoritmo_i_Partic.html) heuristic, which deletes in O(n²) time any diagonal (i.e. edge inserted during the triangulation) that leaves only convex pieces. At most 4 times more pieces than optimal will remain, and in practice often much fewer.
