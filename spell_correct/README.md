# Spelling corrector

Reimplementation of Peter Norvig's classic [spelling corrector](http://norvig.com/spell-correct.html).

This implementation is not trying to be fast, and involves some code golfing. :)

It does not access strings by index, which means it supports Unicode. Here's an emoticon spelling corrector:

```js
const emoticonCorrector = new SpellingCorrector('()/\\_¯¯°━┻╯□ツ︵）💕', 2);
emoticonCorrector.train('¯\\_(ツ)_/¯');
emoticonCorrector.train('i💕u');

emoticonCorrector.correct('¯\_()_/¯');
'¯\\_(ツ)_/¯'

emoticonCorrector.correct('i<3u');
'i💕u'
```
