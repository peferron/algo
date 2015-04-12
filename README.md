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

(Replace `mergesort` by the module of your choice.)

### Testing a JavaScript module

Install [Node.js](http://nodejs.org) and [Babel](https://github.com/babel/babel), then run:

```shell
$ ./test_javascript mergesort
```

The requirement for Babel might be lifted if Node.js or [io.js](https://iojs.org) get enough support for ECMAScript 6+.

### Testing a TypeScript module

Install [Node.js](http://nodejs.org/), [TypeScript compiler](http://www.typescriptlang.org) version `1.5.0-alpha` or higher, and [Babel](https://github.com/babel/babel), then run:

```shell
$ ./test_typescript biconnected_components
```

### Testing all modules and languages

Install all the language-specific requirements above, then run:

```shell
$ ./test
```

### Retesting a module automatically after a source file changes

Install [rerun](https://github.com/alexch/rerun) and all the language-specific requirements above, then run:

```shell
$ ./watch mergesort
```
