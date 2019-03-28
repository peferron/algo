# Radix sort

[http://en.wikipedia.org/wiki/Radix_sort](http://en.wikipedia.org/wiki/Radix_sort)

* Time complexity: worst case O(kn), where k is the maximum number of digits.
* Space complexity: O(k + n).
* Stable.

The implementation in this module has the following limitations:

* Any base is accepted as input. This is likely slower than using a restricted set of computer-friendly bases, such as
1 digit = 1 byte.
* Negative values are handled via incrementing the entire array to make all values positive, which is prone to overflow.
Other potential approaches are performing an additional counting sort pass over the sign of the values, or partitioning
the array by sign and then sorting negative and positive values separately.
