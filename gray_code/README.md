# Gray code

[http://en.wikipedia.org/wiki/Gray_code](http://en.wikipedia.org/wiki/Gray_code)

Here, Gray code is used to generate all subsets of the integers {1, ..., n}.

The special property of subsets generated with Gray code is that from one subset to the next, only one item is added or removed. Example with n = 2:
```
{}
{1}
{1, 2}
{2}
```

If this property is not required, then binary counting is easier to implement: count from 0 to 2^n - 1, and for each value, check which bits are set to 1. Example with n = 2:
```
i = 0 (%00): {}
i = 1 (%01): {1}
i = 2 (%10): {2}
i = 3 (%11): {2, 1}
```

(Note how from `{1}` to `{2}`, one item is removed *and* one item is added.)
