# Medial-axis transform

[https://en.wikipedia.org/wiki/Medial_axis](https://en.wikipedia.org/wiki/Medial_axis)

Two algorithms are implemented here:

* A [grassfire transform](https://en.wikipedia.org/wiki/Grassfire_transform) algorithm, which maps pixels to their distance to the border of a region. The distance is defined as the [Manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry). This algorithm runs in linear time relatively to the number of pixels.
* A [skeleton](https://en.wikipedia.org/wiki/Topological_skeleton) algorithm, which draws a thin version of a shape. The implementation is based on naïve [ridge detection](https://en.wikipedia.org/wiki/Ridge_detection) ([paper](http://paper.ijcsns.org/07_book/200707/20070729.pdf)) on the result of the grassfire transform. It also runs in linear time.
