# Shortest path in a directed acyclic graph (DAG)

[http://www.stoimen.com/blog/2012/10/28/computer-algorithms-shortest-path-in-a-directed-acyclic-graph/](http://www.stoimen.com/blog/2012/10/28/computer-algorithms-shortest-path-in-a-directed-acyclic-graph/)

* Suitable for finding single-source shortest paths in weighted directed acyclic graphs with positive or negative weights.
* Time complexity: O(|V| + |E|).

Other shortest path algorithms are available in this repo:

* Single-source shortest paths on unweighted graphs: [breadth-first search](../adjacency_list).
* Single-source shortest paths on weighted graphs with no negative edges: [Dijkstra](../dijkstra).
* Single-source shortest paths on weighted graphs with no negative edges, plus a heuristic to estimate the distance from any vertex to the target: [A*](../A*).
* All-pairs shortest paths on graphs with no negative cycles: [Floyd–Warshall](../floyd-warshall).
