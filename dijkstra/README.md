# Dijkstra's algorithm

[http://en.wikipedia.org/wiki/Dijkstra's_algorithm](http://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)

* Suitable for finding shortest paths in directed or undirected weighted graphs with positive weights only.
* Time complexity: O(n²), where n is the number of vertices. Can be optimized with a min-priority queue with fast decrease-key operation (such as a Fibonacci heap, although a pairing heap might be faster in practice) to run in O(m + n log n), where m is the number of edges.
* Space complexity: O(n²).

To find shortest paths in weighted directed acyclic graphs with positive or negative weights, see the module [dag_shortest_path](../dag_shortest_path).

To find shortest paths in directed or undirected weighted graphs with positive or negative edge weights but no negative cycles, see the module [floyd-warshall](../floyd-warshall).
