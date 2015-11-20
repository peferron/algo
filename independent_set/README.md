# Maximal and maximum independent set

[https://en.wikipedia.org/wiki/Independent_set_(graph_theory)](https://en.wikipedia.org/wiki/Independent_set_%28graph_theory%29)

Two algorithms are implemented here:

* An algorithm to find a maximal independent set. A maximal independent set is an independent set that cannot be extended by adding any additional vertex. This algorithm runs in O(n + m) time, where n is the number of vertices and m the number of edges.
* A very simple heuristic to find a maximum independent set. A maximum independent set is an independent set such that there is no independent set with more vertices. Finding a maximum independent set is NP-complete. This heuristic runs in O(n log n + m) time.

The independent set problem and the clique problem are complementary: an independent set in G is a clique in the complement graph of G and vice versa. Therefore, the algorithms implemented here are extremely similar to the algorithms implemented in the [clique](../clique) module.
