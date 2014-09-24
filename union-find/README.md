# Union-find

[http://en.wikipedia.org/wiki/Disjoint-set_data_structure](http://en.wikipedia.org/wiki/Disjoint-set_data_structure)

* Space complexity: O(n).
* Time complexity:
    * Union: amortized O(1) in practice.
    * Find: amortized O(1) in practice.

The union-find data structures implemented here use linking by rank and perform path compression on each find.

For more details about linking by rank, linking by size, path compression, and time complexity analysis — it's not exactly O(1) —, see [http://www.csd.uwo.ca/~eschost/Teaching/07-08/CS445a/p245-tarjan.pdf](http://www.csd.uwo.ca/~eschost/Teaching/07-08/CS445a/p245-tarjan.pdf).
