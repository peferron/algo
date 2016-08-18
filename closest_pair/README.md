# Closest pair of points

[https://en.wikipedia.org/wiki/Closest_pair_of_points_problem](https://en.wikipedia.org/wiki/Closest_pair_of_points_problem)

Two algorithms are implemented here:

- A brute-force algorithm, that compares every possible pair of points in O(dn²) time, where n is the number of points and d the number of dimensions.

- A divide-and-conquer algorithm, that splits the points along a median hyperplane, then recursively computes the closest pairs of both halves plus a median "slab". This algorithm runs in O(n(log n)^(d-1)) time. Smartly selecting the median hyperplane can reduce the time complexity to O(n log n), but this has not been implemented here. See [https://www.cs.ucsb.edu/~suri/cs235/ClosestPair.pdf](https://www.cs.ucsb.edu/~suri/cs235/ClosestPair.pdf).
