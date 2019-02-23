# Adjacency list

[http://en.wikipedia.org/wiki/Adjacency_list](http://en.wikipedia.org/wiki/Adjacency_list)

* Space complexity: O(|V| + |E|).
* Time complexity:
    * Test if an edge (x, y) is in the graph: O(d), where d is the degree of x or y.
    * Find the degree of x: O(1).
    * Insert or delete an edge: O(d).
    * Traverse the graph: O(|V| + |E|).

The adjacency lists implemented here use arrays instead of linked lists.
