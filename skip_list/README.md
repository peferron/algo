# Skip list

[http://en.wikipedia.org/wiki/Skip_list](http://en.wikipedia.org/wiki/Skip_list)

* Space complexity: average O(n), worst case O(n log n).
* Time complexity:
    * Search: O(log n), worst case O(n).
    * Insert: O(log n), worst case O(n).
    * Delete: O(log n), worst case O(n).

Skip lists are great for concurrent access because insertion and deletion only affect the immediately surrounding elements, keeping locking localized to small portions of the list. In comparison, insertion and deletion in a red-black tree can affect big portions of the tree.
