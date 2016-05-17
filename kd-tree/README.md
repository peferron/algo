# kd-tree

[https://en.wikipedia.org/wiki/K-d_tree](https://en.wikipedia.org/wiki/K-d_tree)

Average time complexities, where k is the number of dimensions and n the number of points:

* Construction:
    * O(n log² n) if a O(n log n) sorting algorithm is used to find the median at each level of the tree. For simplicity, that's what we use here.
    * O(kn log n) if a O(n log n) sorting algorithm is used to sort the points in each dimension prior to building the tree.
    * **O(n log n)** if a O(n) median of medians algorithm is used to find the median at each level of the tree. See the [quickselect](../quickselect) module.
* Insertion: **O(log n)** average case, O(n) worst case. Inserting many points can unbalance the tree, leading to worst case operations.
* Deletion: **O(log n)** average case, O(n) worst case.
* Nearest neighbor search: **O(log n)** average case, O(n) worst case.
