mod bit_vector;
mod set_packing;

use set_packing::maximum_set_packing;

#[test]
fn test_simple() {
    test(
        vec![
            vec![0],
            vec![1],
            vec![2],
        ],
        vec![0, 1, 2],
    );
}

#[test]
fn test_overlap() {
    test(
        vec![
            vec![0, 1, 2],
            vec![0],
            vec![1],
            vec![2],
        ],
        vec![1, 2, 3],
    );
}

fn test(subsets: Vec<Vec<u8>>, expected_packing: Vec<usize>) {
    let mut actual_packing = maximum_set_packing(&subsets);
    actual_packing.sort();
    assert_eq!(expected_packing, actual_packing);
}
