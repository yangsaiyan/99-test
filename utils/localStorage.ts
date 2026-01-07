export function getDelay() {
  return Number(localStorage.getItem("mockDelay")) || 0;
}
