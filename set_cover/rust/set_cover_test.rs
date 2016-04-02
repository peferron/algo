mod bit_vector;
mod set_cover;

use set_cover::minimum_set_cover;

#[test]
fn test_disjoint() {
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
fn test_one() {
    test(
        vec![
            vec![0, 1, 2],
            vec![0],
            vec![1],
            vec![2],
        ],
        vec![0],
    );
}

#[test]
fn test_two() {
    test(
        vec![
            vec![0, 1],
            vec![1, 2],
            vec![2, 3],
        ],
        vec![0, 2],
    );
}

fn test(subsets: Vec<Vec<u8>>, expected_cover: Vec<usize>) {
    let mut actual_cover = minimum_set_cover(&subsets);
    actual_cover.sort();
    assert_eq!(expected_cover, actual_cover);
}
