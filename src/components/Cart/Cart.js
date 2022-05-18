import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import { Fragment, useContext } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useState } from "react";

const Cart = (props) => {
  //States
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  //Context
  const cartCtx = useContext(CartContext);

  const hasItems = cartCtx.items.length > 0;

  const totalAmount = cartCtx.totalAmount.toFixed(2);

  //Handler Functions
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const showCheckoutHandler = () => {
    setShowCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setOrderSubmitting(true);
    await fetch(
      "https://food-order-app-a8939-default-rtdb.asia-southeast1.firebasedatabase.app/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setOrderSubmitting(false);
    setOrderSubmitted(true);
    cartCtx.clearCart();
  };

  //Ready Cart Item
  const CartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  //Cart Modal Order or Close
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClick}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={showCheckoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  //Render which content to Show
  const cartModal = (
    <Fragment>
      {CartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>
          {"$"}
          {Math.abs(totalAmount)}
        </span>
      </div>
      {showCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClick} />
      )}
      {!showCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending Order data...</p>;
  const didSubmitModalContent = (
    <Fragment>
      <p>Succesfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClick}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClick={props.onClick}>
      {!orderSubmitting && !orderSubmitted && cartModal}
      {orderSubmitting && isSubmittingModalContent}
      {orderSubmitted && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
