var sum_to_n_a = function (n: number): number {
  let acc = 0;
  for (let i = 1; i <= n; i++) {
    acc += i;
  }
  return acc;
};

var sum_to_n_b = function (n: number): number {
  return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b, 0);
};

var sum_to_n_c = function (n: number): number {
  if(n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};

export { sum_to_n_a, sum_to_n_b, sum_to_n_c };
