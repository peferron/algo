package bin_packing

import "sort"

func Pack(itemSizes []int, binSize int) [][]int {
	decreasingItemSizes := make([]int, len(itemSizes))
	copy(decreasingItemSizes, itemSizes)
	sort.Sort(sort.Reverse(sort.IntSlice(decreasingItemSizes)))

	availableBinSizes := []int{}
	packing := [][]int{}

	for _, itemSize := range decreasingItemSizes {
		if i := firstAvailableBin(availableBinSizes, itemSize); i >= 0 {
			// The i-th bin has enough space for this item.
			availableBinSizes[i] -= itemSize
			packing[i] = append(packing[i], itemSize)
		} else {
			// A new bin is required.
			availableBinSizes = append(availableBinSizes, binSize-itemSize)
			packing = append(packing, []int{itemSize})
		}
	}

	return packing
}

func firstAvailableBin(availableBinSizes []int, itemSize int) int {
	for i, availableBinSize := range availableBinSizes {
		if availableBinSize >= itemSize {
			return i
		}
	}
	return -1
}
