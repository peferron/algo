# Dijkstra's algorithm

[http://en.wikipedia.org/wiki/Dijkstra's_algorithm](http://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)

* Suitable for finding shortest paths in directed or undirected weighted graphs with positive weights only.
* Time complexity: O(n²), where n is the number of vertices. Can run faster using a min-priority queue; [research](https://www3.cs.stonybrook.edu/~rezaul/papers/TR-07-54.pdf) indicates that a simple binary heap without decrease-key performs very well in practice, despite having worse asymptotic bounds than fancier priority queues with fast decrease-key such as Fibonacci heaps.
* Space complexity: O(n²).

To find shortest paths in weighted directed acyclic graphs with positive or negative weights, see module [dag_shortest_path](../dag_shortest_path).

To find shortest paths in directed or undirected weighted graphs with positive or negative edge weights but no negative cycles, see module [floyd-warshall](../floyd-warshall).
