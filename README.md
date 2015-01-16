# algo [![Build Status](https://drone.io/github.com/peferron/algo/status.png)](https://drone.io/github.com/peferron/algo/latest)

This is just me fooling around and implementing various algorithms and data structures in JavaScript and [Go](http://golang.org). [Swift](https://developer.apple.com/swift) might join the list if it becomes cross-platform enough.

Modules do not share code and use built-in language features only. This makes each module easiest to reason about individually.

**Warning!** The code in this repository is:

- Not optimized for performance;
- Not particularly well-tested;
- Not intended for production use.

### Testing a JavaScript module

Some JavaScript modules use [ECMAScript 6 features](https://github.com/lukehoban/es6features). As of 2015/1/3, [Node.js](http://nodejs.org) cannot run these modules directly. Install [Traceur](https://github.com/google/traceur-compiler):

```shell
$ npm install -g traceur
```

Then run the test using `traceur` instead of `node`:

```shell
$ traceur --require true mergesort/javascript/*_test.js
```

### Testing a Go module

```shell
$ go test ./mergesort/go
```

### Testing all modules and languages

```shell
$ ./test
```

### Retesting a module automatically after a relevant file changes

```shell
$ ./watch mergesort
```
