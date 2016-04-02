use bit_vector::BitVector;

pub fn minimum_set_cover(subsets: &Vec<Vec<u8>>) -> Vec<usize> {
    let bit_vectors = subsets.iter().map(BitVector::from_vec).collect::<Vec<_>>();

    let mut cover = vec![];
    let mut covered = BitVector::new();

    loop {
        // Select the subset that contains the largest number of uncovered elements.
        // This could be optimized by removing already-selected subsets from the list.
        let mut best_subset_index = 0;
        let mut best_subset_count = 0;
        for i in 0..subsets.len() {
            let bit_vector = &bit_vectors[i];
            let count = bit_vector.pop_count() - bit_vector.intersection(&covered).pop_count();
            if count > best_subset_count {
                best_subset_index = i;
                best_subset_count = count;
            }
        }

        if best_subset_count == 0 {
            return cover;
        }

        cover.push(best_subset_index);
        covered = bit_vectors[best_subset_index].union(&covered);
    }
}
