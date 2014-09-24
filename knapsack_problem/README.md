# Knapsack problem

[http://en.wikipedia.org/wiki/Knapsack_problem](http://en.wikipedia.org/wiki/Knapsack_problem)

The knapsack problem formulation solved here is the 0/1 knapsack problem. It is solved using dynamic programming.
* Space complexity: O(nw), where n is the number or items and w the maximum weight.
* Time complexity: O(nw).

The space complexity can be reduced to O(w), but then the list of items used in the solution set cannot be reconstructed anymore; only the total value of the solution set can be returned.
