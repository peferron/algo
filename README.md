# algo

This is just me fooling around and implementing various algorithms and data structures in languages I am interested in.

The code in this repo is **not optimized for performance at all**, is not particularly well-tested either, and is not intended for production use.

To make each module easy to reason about individually, there is purposely no code reuse between modules, and modules are written using native language features only.

To test a Go module, for example `mergesort`:
```shell
$ go test ./mergesort/go
```

To test a JavaScript module:
```shell
$ node mergesort/javascript/mergesort_test.js
```
