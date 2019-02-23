# Bellman–Ford algorithm

[https://en.wikipedia.org/wiki/Bellman–Ford_algorithm](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm)

* Suitable for finding single-source shortest paths in directed or undirected weighted graphs with positive or negative edge weights but no negative cycles.
* Time complexity: O(|V| |E|).
* Space complexity: O(|V|).

Other shortest path algorithms are available in this repo:

* Single-source shortest paths on unweighted graphs: [breadth-first search](../adjacency_list).
* Single-source shortest paths on directed acyclic graphs: [shortest path via topological sort](../dag_shortest_path).
* Single-source shortest paths on weighted graphs with no negative edges: [Dijkstra](../dijkstra).
* Single-source shortest paths on weighted graphs with no negative edges, plus a heuristic to estimate the distance from any vertex to the target: [A*](../A*).
* All-pairs shortest paths on graphs with no negative cycles: [Floyd–Warshall](../floyd-warshall).
