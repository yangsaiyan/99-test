var sum_to_n_a = function (n: number[]): number {
    // your code here
    if (n?.length === 0) return 0
    return n?.reduce((acc: number, cur: number) => cur += acc, 0)
};

var sum_to_n_b = function (n: number[]): number {
    // your code here
    if (n?.length === 0) return 0
    let acc = 0
    n?.forEach((item: number) => {
        acc += item
    })
    return acc
};

var sum_to_n_c = function (n: number[]): number {
    // your code here
    if (n?.length === 0) return 0
    let acc = 0
    for (const i of n) acc += i
    return acc
};

export { sum_to_n_a, sum_to_n_b, sum_to_n_c }