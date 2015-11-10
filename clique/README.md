# Maximal and maximum clique

[https://en.wikipedia.org/wiki/Clique_problem](https://en.wikipedia.org/wiki/Clique_problem)

Two algorithms are implemented here:

* An algorithm to find a maximal clique. A maximal clique is a clique that cannot be extended by adding any additional vertex. This algorithm runs in O(n + m) time, where n is the number of vertices and m the number of edges.
* A very simple heuristic to find a maximum clique. A maximum clique is a clique such that there is no clique with more vertices. Finding a maximum clique is NP-complete. This heuristic runs in O(n log n + m) time.
