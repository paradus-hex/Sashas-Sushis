import React from "react";

const CartContext = React.createContext({
  items: [
    {
      id: 1,
      name: 1,
      amount: 1,
      price: 1,
    },
  ],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
