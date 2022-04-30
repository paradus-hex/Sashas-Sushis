import React from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext } from "react";
import CartContext from "../../store/CartContext";
import { useState, useEffect } from "react";
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnIsBumped, setbtnIsBumped] = useState(false);
  const { items } = cartCtx;
  const numberofCartItems = cartCtx.items.reduce((curSum, item) => {
    return curSum + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsBumped ? classes.bump : ""} `;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setbtnIsBumped(true);

    const timer = setTimeout(() => {
      setbtnIsBumped(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberofCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
