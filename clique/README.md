# Maximal and maximum clique

[https://en.wikipedia.org/wiki/Clique_problem](https://en.wikipedia.org/wiki/Clique_problem)

Two algorithms are implemented here:

* An algorithm to find a maximal clique. A maximal clique is a clique that cannot be extended by adding any additional vertex. This algorithm runs in O(|V| + |E|) time.
* A very simple heuristic to find a maximum clique. A maximum clique is a clique such that there is no clique with more vertices. Finding a maximum clique is NP-complete. This heuristic runs in O(|V| log |V| + |E|) time.

The clique problem and the independent set problem are complementary: a clique in G is an independent set in the complement graph of G and vice versa. Therefore, the algorithms implemented here are extremely similar to the algorithms implemented in the [independent_set](../independent_set) module.
