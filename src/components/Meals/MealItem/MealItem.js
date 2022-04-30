import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/CartContext";
import { useContext } from "react";
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.foodPrice.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.foodName,
      amount: amount,
      price: props.foodPrice,
    });
    console.log(cartCtx);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h1>{props.foodName}</h1>
        <div className={classes.description}>{props.foodDescription}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
