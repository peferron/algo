package string_matching

// Indexes returns the indexes of all occurrences of pattern in text.
func Indexes(text, pattern string) []int {
	return indexes(Runes(text), Runes(pattern))
}

func indexes(text, pattern []Rune) []int {
	patternTable := table(pattern)
	matches := []int{}

	for textIndex, patternIndex := 0, 0; textIndex+patternIndex < len(text); {
		textRune := text[textIndex+patternIndex]
		patternRune := pattern[patternIndex]

		if textRune.value == patternRune.value {
			if patternIndex == len(pattern)-1 {
				// The current match is complete!
				firstMatchingRune := text[textIndex]
				matches = append(matches, firstMatchingRune.index)
				// Look for another match starting at the next text index.
				textIndex++
				patternIndex = 0
			} else {
				// Keep growing the current match.
				patternIndex++
			}
		} else if patternIndex == 0 {
			// The current match failed on the first check.
			// Look for a match starting at the next text index.
			textIndex++
		} else {
			// The current match failed after some successful checks.
			// Use the table to find out if there is a shorter match already underway that we should
			// keep growing (shorterMatchLength > 0), or if we should just start from scratch at the
			// position that just failed the check (shorterMatchLength == 0).
			shorterMatchLength := patternTable[patternIndex]
			textIndex += patternIndex - shorterMatchLength
			patternIndex = shorterMatchLength
		}
	}

	return matches
}

// table returns the partial match table of the string represented by runes.
func table(runes []Rune) []int {
	table := make([]int, len(runes))

	for i, matchLength := 0, 0; i < len(runes); {
		switch {
		// table[i] is the length of the longest partial match using the substring [0...i-1].
		// Let's take the string ABABCD as an example. To calculate table[4], we look at the
		// substring [0...3]: ABAB. The proper prefixes of ABAB are A, AB and ABA (a proper prefix
		// cannot use the last rune). The proper suffixes of ABAB are B, AB, and BAB (similarly, a
		// proper suffix cannot use the first rune). What is the longest match here? AB, which
		// exists as both a proper prefix and a proper suffix. So table[4] = length(AB) = 2.
		//
		// Obviously, we can only have a match length > 0 if the substring is at least 2 characters
		// long (e.g. AA). For that we need i >= 2. So for i < 2 we just set table[i] to 0. Note
		// that the main algorithm doesn't even try accessing table[0], so any value would work
		// there, but we must use 0 for table[1] though.
		case i < 2:
			table[i] = 0
			i++

		// There is already a match of length table[i-1] underway, and that's without using the rune
		// at index i-1. The match is between:
		// - The prefix [0...matchLength-1]
		// - The suffix [somewhere...i-2] (where somewhere = i-1-matchLength, but we don't care)
		// We can only grow the match if the runes following each of these substrings, i.e. the
		// runes at indexes matchLength and i-1, are equal.
		case runes[i-1].value == runes[matchLength].value:
			table[i] = matchLength + 1
			matchLength++
			i++

		// The runes didn't match, which means we cannot extend the current match. However, there
		// might be a shorter match that we can extend! Example:
		// - Pattern: ABACABABD
		// - Indices: 012345678
		// - Table:   000101232
		// When we calculate table[8], we first try to extend the match "ABA" ([0...2] and [4...6]).
		// But the rune at index 3 "C" does not match the rune at index 7 "B", so we cannot extend
		// the match. However, this doesn't mean that the match length should be resetted to 0.
		// There is a shorter match "A" ([0..0] and [6...6]) that we can try to extend as well.
		// We can do that quite simply: keep i unchanged, set matchLength to 1, and the next
		// iteration will try again to calculate table[8], but by extending the small match instead
		// of the long match.
		//
		// How can we calculate this shorter match length though? It's obviously 1 in the example
		// above, but we need a systematic way to calculate it. Observe that the long match uses the
		// substring [0...matchLength-1], and that the short match is contained in the long match.
		// What is the length of the longest partial match we can achieve using the substring
		// [0...matchLength-1]? By definition, it's table[matchLength].
		case matchLength > 0:
			matchLength = table[matchLength]

		// The runes didn't match, which means we cannot extend the current match. We also cannot
		// try a shorter match because the current match length is already 0. Let's just start a new
		// match from scratch on the next rune. Note that we don't need to reset matchLength to 0
		// here because it's already 0, otherwise it would have matched the previous case.
		default:
			table[i] = 0
			i++
		}
	}

	return table
}
