import { React, Fragment } from "react";
import mealsImage from "../../assets/meals4.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1 style={{ fontFamily: "Smooch", fontSize: "40px" }}>
          Sasha's Sushis
        </h1>
        <HeaderCartButton onClick={props.onClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of good food"></img>
      </div>
    </Fragment>
  );
};

export default Header;
