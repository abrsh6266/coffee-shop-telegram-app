export const getMenu = () => [
  { id: 1, name: "Espresso", price: 3.0 },
  { id: 2, name: "Cappuccino", price: 3.5 },
  { id: 3, name: "Latte", price: 4.0 },
];

export const processOrder = (order: string) =>
  `Your order for ${order} is confirmed!`;
