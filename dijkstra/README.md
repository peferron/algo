# Dijkstra's algorithm

[http://en.wikipedia.org/wiki/Dijkstra's_algorithm](http://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)

* Suitable for finding single-source shortest paths in directed or undirected weighted graphs with positive weights only.
* Time complexity: O(|V|²) when naïvely implemented as in this repo. Time complexity can be improved with a min-priority queue; [research](https://www3.cs.stonybrook.edu/~rezaul/papers/TR-07-54.pdf) indicates that a simple binary heap without decrease-key performs very well in practice, despite having worse asymptotic bounds than more sophisticated priority queues with fast decrease-key such as Fibonacci heaps.
* Space complexity: O(|V|).

Other shortest path algorithms are available in this repo:

* Single-source shortest paths on unweighted graphs: [breadth-first search](../adjacency_list).
* Single-source shortest paths on directed acyclic graphs: [shortest path via topological sort](../dag_shortest_path).
* Single-source shortest paths on weighted graphs with no negative edges, plus a heuristic to estimate the distance from any vertex to the target: [A*](../A*).
* Single-source shortest paths on graphs with no negative cycles: [Bellman–Ford](../bellman-ford).
* All-pairs shortest paths on graphs with no negative cycles: [Floyd–Warshall](../floyd-warshall).
