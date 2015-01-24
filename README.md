# algo [![Build Status](https://drone.io/github.com/peferron/algo/status.png)](https://drone.io/github.com/peferron/algo/latest)

This is just me fooling around and implementing various algorithms and data structures in [Go](http://golang.org), JavaScript, and [TypeScript](http://www.typescriptlang.org). [Swift](https://developer.apple.com/swift) might join the list if it becomes cross-platform enough.

Modules do not share code and use built-in language features only. This makes each module easiest to reason about individually.

**Warning!** The code in this repository is:

- Not optimized for performance;
- Not particularly well-tested;
- Not intended for production use.

### Testing a Go module

Install [Go](http://golang.org), then run:

```shell
$ ./test_go mergesort
```

### Testing a JavaScript module

Install [Node.js](http://nodejs.org) and [Traceur](https://github.com/google/traceur-compiler), then run:

```shell
$ ./test_javascript mergesort
```

The requirement for Traceur might be lifted if Node.js or [io.js](https://iojs.org) get enough support for ECMAScript 6+.

### Testing a TypeScript module

Install [Node.js](http://nodejs.org/) and the [TypeScript compiler](http://www.typescriptlang.org), then run:

```shell
$ ./test_typescript biconnected_components
```

### Testing all modules and languages

Install all of the per-language requirements above, then run:

```shell
$ ./test
```

### Retesting a module automatically after a source file changes

Install [rerun](https://github.com/alexch/rerun) and all of the per-language requirements above, then run:

```shell
$ ./watch mergesort
```
