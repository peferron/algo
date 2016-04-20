# algo [![Build Status](https://travis-ci.org/peferron/algo.svg?branch=master)](https://travis-ci.org/peferron/algo)

This is just me fooling around and implementing various algorithms and data structures in [Go](http://golang.org), JavaScript, [TypeScript](http://www.typescriptlang.org), and [Rust](http://www.rust-lang.org).

Many of these problems appear in Steven Skiena's [Algorithm Design Manual](http://www.amazon.com/Algorithm-Design-Manual-Steven-Skiena/dp/1849967202), which I recommend.

Modules do not share code and use built-in language features only. This makes each module easiest to reason about individually.

### Disclaimers

- These modules are not optimized for performance;
- These modules are not very well-tested;
- These modules are *definitely* not intended for production use (if you do, please send me a link to your post-mortem);
- I don't have much experience with Rust, so there might be simpler & cleaner ways to do things;
- Some older JS modules are written in ES 5;
- Some older TS modules might not use features introduced in TS 1.6+.

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

### Watching a module for source code changes

Install all the language-specific requirements above and [install rerun](https://github.com/alexch/rerun). Then run:

```shell
$ ./watch mergesort
```
Tests will run automatically after each source code change.

### Contributing

Pull requests are welcome. Improvements to existing modules will be merged as soon as possible. Completely new modules will take longer—this repo is mostly a learning exercise, so I'll try to solve the problem on my own before merging.
