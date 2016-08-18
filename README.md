# algo [![Build Status](https://travis-ci.org/peferron/algo.svg?branch=master)](https://travis-ci.org/peferron/algo)

This is just me fooling around and implementing various algorithms and data structures in [Go](http://golang.org), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [TypeScript](http://www.typescriptlang.org), [Rust](http://www.rust-lang.org), and [Swift](https://swift.org).

Many of these problems appear in Steven Skiena's [Algorithm Design Manual](http://www.amazon.com/Algorithm-Design-Manual-Steven-Skiena/dp/1849967202), which I heartily recommend.

Modules do not share code and use built-in language features only. This makes each module easiest to understand individually.

### Disclaimers

- These modules are not optimized for performance.
- These modules are not very well-tested, and *definitely* not intended for production use. If you do it anyway, please share your post-mortem :)
- I don't have much experience with Rust, so there might be simpler and cleaner ways to do things.
- Some older JS modules are written in ES 5.
- Some older TS modules do not use features introduced in TS 1.6+.
- Generics are avoided in favor of concrete types for simplicity.

### Test a Go module

[Install Go](http://golang.org/doc/install). Then run:

```shell
$ ./test_go mergesort
```

(Replace `mergesort` with the name of the module of your choice.)

### Test a JavaScript module

[Install Node.js](http://nodejs.org) and run `npm install`. Then run:

```shell
$ ./test_javascript mergesort
```

### Test a TypeScript module

[Install Node.js](http://nodejs.org) and run `npm install`. Then run:

```shell
$ ./test_typescript biconnected_components
```

### Test a Rust module

[Install Rust](http://www.rust-lang.org). Then run:

```shell
$ ./test_rust edge_connectivity
```

### Test a Swift module

[Install Swift](https://swift.org/getting-started/#installing-swift). Then run:

```shell
$ ./test_swift rotating_calipers
```

### Test all modules and languages

Install all the language-specific requirements above. Then run:

```shell
$ ./test
```

### Test a module automatically after each source code change

Install all the language-specific requirements above and [install rerun](https://github.com/alexch/rerun). Then run:

```shell
$ ./watch mergesort
```

### Contribute

Pull requests are welcome. Improvements to existing modules will be merged as soon as possible. Completely new modules will take longer—this repo is a learning exercise, so I'll try to solve the problem on my own before merging.
