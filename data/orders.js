export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  //unshift is like push but from front
  orders.unshift(order);
  saveToStorage();
}
function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
