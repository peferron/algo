# Minimum feedback edge set

[https://en.wikipedia.org/wiki/Feedback_arc_set#Minimum_feedback_arc_set](https://en.wikipedia.org/wiki/Feedback_arc_set#Minimum_feedback_arc_set)

Also called *minimum feedback arc set* problem, or *maximum acyclic subgraph* problem.

The heuristic implemented here runs in O(|V| + |E|) time.

To find a minimum feedback **vertex** set: find a minimum feedback edge set first, then find a vertex cover of this set. See the [vertex_cover](../vertex_cover) module.
