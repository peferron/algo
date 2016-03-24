use bit_vector::BitVector;

pub fn maximum_set_packing(subsets: &Vec<Vec<u8>>) -> Vec<usize> {
    let bit_vectors = subsets.iter().map(BitVector::from_vec).collect::<Vec<_>>();

    let mut packing = vec![];
    let mut available_subsets_indexes = (0..subsets.len()).collect::<Vec<_>>();

    loop {
        // To find a minimum set packing, simply replace `min_by_key` with `max_by_key`.
        match available_subsets_indexes.iter().min_by_key(|i| subsets[**i].len()) {
            None => {
                return packing;
            }

            Some(&smallest_available_subset_index) => {
                packing.push(smallest_available_subset_index);

                let bit_vector = &bit_vectors[smallest_available_subset_index];
                available_subsets_indexes.retain(|i| !bit_vector.intersects(&bit_vectors[*i]));
            }
        }
    }
}
