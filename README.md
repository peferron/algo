# algo

This is just me fooling around and implementing various algorithms and data structures in languages I'm interested in.

The code in this repo is **not optimized for performance at all**, and is not intended for production use.

There is purposely no code reuse between modules. Each module is self-contained and can be tested on its own.

To test a JavaScript module, for example `mergesort`:
```shell
$ node mergesort/javascript/mergesort_test.js
```

To test a Go module:
```shell
$ go test ./mergesort/go
```
