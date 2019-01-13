import * as assert from 'assert';
import SpellingCorrector from './spelling_corrector';

const latinCorrector = new SpellingCorrector('abcdefghijklmnopqrstuvwxyz', 2);

assert.strictEqual(latinCorrector.correct('speling'), 'speling');
latinCorrector.train('spelling');
assert.strictEqual(latinCorrector.correct('speling'), 'spelling');

assert.strictEqual(latinCorrector.correct('korrectud'), 'korrectud');
latinCorrector.train('corrected');
assert.strictEqual(latinCorrector.correct('korrectud'), 'corrected');

const emoticonCorrector = new SpellingCorrector('()/\\_¯¯°━┻╯□ツ︵）💕', 2);

emoticonCorrector.train('¯\\_(ツ)_/¯');
emoticonCorrector.train('i💕u');

assert.strictEqual(emoticonCorrector.correct('¯\_()_/¯'), '¯\\_(ツ)_/¯');
assert.strictEqual(emoticonCorrector.correct('i<3u'), 'i💕u');
