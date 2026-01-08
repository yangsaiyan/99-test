var sum_to_n_a = function (n: number): number {
  let acc = 0;
  for (let i = 1; i <= n; i++) {
    acc += i;
  }
  return acc;
};

var sum_to_n_b = function (n: number): number {
  return new Array(n).fill(0).reduce((acc: number, _: number, index: number) => acc + index + 1, 0);
};

var sum_to_n_c = function (n: number): number {
  let acc = 0;
  while (n >= 1) {
    acc += n;
    n--;
  }
  return acc;
};

export { sum_to_n_a, sum_to_n_b, sum_to_n_c };
