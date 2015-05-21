# algo [![Build Status](https://drone.io/github.com/peferron/algo/status.png)](https://drone.io/github.com/peferron/algo/latest)

This is just me fooling around and implementing various algorithms and data structures in [Go](http://golang.org), JavaScript, [TypeScript](http://www.typescriptlang.org), and [Rust](http://www.rust-lang.org).

Modules do not share code and use built-in language features only. This makes each module easiest to reason about individually.

**Warning!** The code in this repository is:

- Not optimized for performance;
- Not particularly well-tested;
- Not intended for production use.

### Testing a Go module

[Install Go](http://golang.org/doc/install). Then run:

```shell
$ ./test_go mergesort
```

(Replace `mergesort` by the module of your choice.)

### Testing a JavaScript module

[Install Node.js](http://nodejs.org) and run `npm install`. Then run:

```shell
$ ./test_javascript mergesort
```

### Testing a TypeScript module

[Install Node.js](http://nodejs.org) and run `npm install`. Then run:

```shell
$ ./test_typescript biconnected_components
```

### Testing a Rust module

[Install Rust](http://www.rust-lang.org). Then run:

```shell
$ ./test_rust edge_connectivity
```

### Testing all modules and languages

Install all the language-specific requirements above. Then run:

```shell
$ ./test
```

### Retesting a module automatically after a source file changes

Install all the language-specific requirements above and [install rerun](https://github.com/alexch/rerun). Then run:

```shell
$ ./watch mergesort
```
