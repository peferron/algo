# algo [![Build Status](https://drone.io/github.com/peferron/algo/status.png)](https://drone.io/github.com/peferron/algo/latest)

This is just me fooling around and implementing various algorithms and data structures in languages I am interested in.

The code in this repository is **not optimized for performance at all, is not particularly well-tested either, and is not intended for production use**.

To make each module easiest to reason about individually, there is no code reuse between modules, and each module is written using built-in language features only.

Test all modules:

```shell
$ ./test
```

Test a specific Go module, for example `mergesort`:

```shell
$ go test ./mergesort/go
```

Test a specific JavaScript module:

```shell
$ node mergesort/javascript/*_test.js
```
