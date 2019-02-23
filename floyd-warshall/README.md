# Floyd–Warshall algorithm

[http://en.wikipedia.org/wiki/Floyd–Warshall_algorithm](http://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm)

* Suitable for finding all-pairs shortest paths in directed or undirected weighted graphs with positive or negative edge weights but no negative cycles.
* Time complexity: O(|V|³).
* Space complexity: O(|V|²).

Other shortest path algorithms are available in this repo:

* Single-source shortest paths on unweighted graphs: [breadth-first search](../adjacency_list).
* Single-source shortest paths on directed acyclic graphs: [shortest path via topological sort](../dag_shortest_path).
* Single-source shortest paths on weighted graphs with no negative edges: [Dijkstra](../dijkstra).
* Single-source shortest paths on weighted graphs with no negative edges, plus a heuristic to estimate the distance from any vertex to the target: [A*](../A*).
