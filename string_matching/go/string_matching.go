package string_matching

import (
	"fmt"
	"unicode/utf8"
)

func Search(text, pattern string) []int {
	table := createTable(pattern)

	matches := []int{}

	textPosition := 0
	patternPosition := 0

	for textPosition+patternPosition < len(text) {
		textRune, textRuneWidth := utf8.DecodeRuneInString(text[textPosition+patternPosition:])
		patternRune, _ := utf8.DecodeRuneInString(pattern[patternPosition:])

		if textRune == patternRune {
			if patternPosition == len(pattern)-textRuneWidth {
				// Match found!
				matches = append(matches, textPosition)
				textPosition += textRuneWidth
				patternPosition = 0
			} else {
				// Check the next rune
				patternPosition += textRuneWidth
			}
		} else {
			// For now, simulate a dumb table that always suggests going back to the beginning
			tableOffset := table[patternPosition]
			if tableOffset >= 0 {
				textPosition += patternPosition - tableOffset
				patternPosition = tableOffset
			} else {
				textPosition += textRuneWidth
				patternPosition = 0
			}
		}
	}

	return matches
}

func createTable(pattern string) map[int]int {
	runePositions := []int{}
	table := []int{}
	runeIndex := 0

	for runePosition := range pattern {
		switch runeIndex {
		case 0:
			table = append(table, -1)
		case 1:
			table = append(table, 0)
		default:
			previousRunePosition := runePositions[runeIndex-1]
			previousRune, _ := utf8.DecodeRuneInString(pattern[previousRunePosition:])
			previousTableValue := table[runeIndex-1]
			correspondingPatternRunePosition := runePositions[previousTableValue]
			correspondingPatternRune, _ := utf8.DecodeRuneInString(pattern[correspondingPatternRunePosition:])
			if correspondingPatternRune == previousRune {
				table = append(table, previousTableValue+1)
			} else {
				table = append(table, 0)
			}
		}

		runePositions = append(runePositions, runePosition)
		runeIndex++
	}

	fmt.Printf("Table for pattern %s: %+v", pattern, table)

	tableMap := map[int]int{}
	for runeIndex, tableValue := range table {
		runePosition := runePositions[runeIndex]
		tableMap[runePosition] = tableValue
	}
	return tableMap
}
