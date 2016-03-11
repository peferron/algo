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
				textIndex += 1
				patternIndex = 0
			} else {
				// Keep growing the current match.
				patternIndex += 1
			}
		} else if patternIndex == 0 {
			// The current match failed on the first check.
			// Look for a match starting at the next text index.
			textIndex += 1
		} else {
			// The current match failed after some successful checks.
			// Use the table to find out if there is a smaller match already underway that we should
			// keep growing (smallerMatchLength > 0), or if we should just start from scratch at the
			// position that just failed the check (smallerMatchLength == 0).
			smallerMatchLength := patternTable[patternIndex]
			textIndex += patternIndex - smallerMatchLength
			patternIndex = smallerMatchLength
		}
	}

	return matches
}

// table returns the partial match table of the string represented by runes.
func table(runes []Rune) []int {
	table := make([]int, len(runes))

	for i := range table {
		switch i {
		case 0, 1:
			// table[i] is the length of the partial match that can be achieved using runes from 0
			// to i-1. A partial match requires at least 2 runes (for example, 'AA'), so for i < 2
			// there's no partial match possible.
			// Note that the main algorithm doesn't even try accessing table[0], so any value would
			// work there. We need to use 0 for table[1] though.
			table[i] = 0
		default:
			// There is already a match of length table[i-1] underway, and that's without using the
			// rune at index i-1. The match is between these two substrings:
			// - The substring [0...matchLength-1]
			// - The substring [somewhere...i-2] (somewhere = i-1-matchLength, but we don't care)
			// We can only grow the match if the runes following each of these substrings, i.e. the
			// runes at indexes matchLength and i-1, are equal.
			matchLength := table[i-1]
			rune1 := runes[matchLength]
			rune2 := runes[i-1]
			if rune1.value == rune2.value {
				table[i] = matchLength + 1
			} else {
				table[i] = 0
			}
		}
	}

	return table
}
