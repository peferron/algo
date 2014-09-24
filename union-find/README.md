# Union-find

[http://en.wikipedia.org/wiki/Disjoint-set_data_structure](http://en.wikipedia.org/wiki/Disjoint-set_data_structure)

* Space complexity: O(n).
* Time complexity:
    * Union: amortized O(1) in practice (see [here](http://en.wikipedia.org/wiki/Disjoint-set_data_structure#Disjoint-set_forests) for details).
    * Find: amortized O(1) in practice.

The union-find data structures implemented here perform path compression on each find. Without path compression, the union and find time complexities would be O(log n).
