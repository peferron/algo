# A*

[https://en.wikipedia.org/wiki/A*_search_algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm)

* Suitable for finding single-source shortest paths on directed or undirected weighted graphs with no negative edges, when a heuristic is available to estimate the distance from any vertex to the target.
* If the heuristic is admissible, which means that it never overestimates the distance to the target, then A* is guaranteed to return optimal shortest paths.
* Time complexity: depends on the heuristic.
* Space complexity: O(|V|).

Other shortest path algorithms are available in this repo:

* Single-source shortest paths on unweighted graphs: [breadth-first search](../adjacency_list).
* Single-source shortest paths on directed acyclic graphs: [shortest path via topological sort](../dag_shortest_path).
* Single-source shortest paths on weighted graphs with no negative edges: [Dijkstra](../dijkstra).
* All-pairs shortest paths on graphs with no negative cycles: [Floyd–Warshall](../floyd-warshall).
