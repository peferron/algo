# Transitive closure

[https://en.wikipedia.org/wiki/Transitive_closure](https://en.wikipedia.org/wiki/Transitive_closure)

The algorithm implemented here performs a depth-first search from each vertex (a breadth-first-search would also work), and adds an edge from the starting vertex to all other vertices visited during the search.

The time complexity is O(n(n + m)), where n is the number of vertices and m the number of edges of the graph.
