export function measureUp(money) {
  if (typeof money == "string") {
    return money.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else if (typeof money == "number") {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "";
}
