export function formatBalance(balance: number) {
  if (balance > 1000000000000) {
    return (balance / 1000000000000).toFixed(3) + "T";
  } else if (balance > 1000000000) {
    return (balance / 1000000000).toFixed(3) + "B";
  } else if (balance > 1000000) {
    return (balance / 1000000).toFixed(3) + "M";
  } else if (balance > 1000) {
    return (balance / 1000).toFixed(3) + "k";
  } else {
    return balance.toFixed(3);
  }
}
