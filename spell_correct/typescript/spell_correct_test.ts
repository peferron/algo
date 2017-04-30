import SpellingCorrector from './spell_correct';

declare function require(name: string): any;
const assert = require('assert');

const latinCorrector = new SpellingCorrector('abcdefghijklmnopqrstuvwxyz', 2);

assert.strictEqual(latinCorrector.correct('speling'), 'speling');
latinCorrector.train('spelling');
assert.strictEqual(latinCorrector.correct('speling'), 'spelling');

assert.strictEqual(latinCorrector.correct('korrectud'), 'korrectud');
latinCorrector.train('corrected');
assert.strictEqual(latinCorrector.correct('korrectud'), 'corrected');

const emoticonCorrector = new SpellingCorrector('()/\\_¯¯°━┻╯□ツ︵）💕', 2);

emoticonCorrector.train('¯\\_(ツ)_/¯')
emoticonCorrector.train('i💕u');

assert.strictEqual(emoticonCorrector.correct('¯\_()_/¯'), '¯\\_(ツ)_/¯');
assert.strictEqual(emoticonCorrector.correct('i<3u'), 'i💕u');
