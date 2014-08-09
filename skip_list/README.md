# Skip list

[http://en.wikipedia.org/wiki/Skip_list](http://en.wikipedia.org/wiki/Skip_list)

* Space complexity: worst case O(n log n), average O(n).
* Time complexity:
    * Search: worst case O(n), average O(log n).
    * Insert: worst case O(n), average O(log n).
    * Delete: worst case O(n), average O(log n).
* Easily returns a list of the elements in sorted order.
* Great for concurrent access because insertion and deletion only affect the immediately surrounding elements. This prevents the locking issues experienced by e.g. red-black trees, where insertion and deletion can affect large portions of the tree.
