import classes from "./Checkout.module.css";
import { useRef } from "react";
import { useState } from "react";

//helper functions
const isNotEmpty = (value) => value.trim() !== "";
const is11Chars = (value) => value.trim().length === 11;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    address: true,
    city: true,
    phone: true,
  });
  const nameInput = useRef();
  const addressInput = useRef();
  const cityInput = useRef();
  const phoneInput = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredAddress = addressInput.current.value;
    const enteredCity = cityInput.current.value;
    const enteredPhone = phoneInput.current.value;

    const enteredNameIsValid = isNotEmpty(enteredName);
    const enteredAddressIsValid = isNotEmpty(enteredAddress);
    const enteredCityIsValid = isNotEmpty(enteredCity);
    const enteredPhoneIsValid = is11Chars(enteredPhone);

    setFormInputsValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      city: enteredCityIsValid,
      phone: enteredPhoneIsValid,
    });

    const formIsvalid =
      enteredAddressIsValid &&
      enteredNameIsValid &&
      enteredPhoneIsValid &&
      enteredCityIsValid;

    if (!formIsvalid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      phone: enteredPhone,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const addressControlClasses = `${classes.control} ${
    formInputsValidity.address ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputsValidity.phone ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Name</label>
        {!formInputsValidity.name && (
          <p style={{ color: "#ca3e51" }}>Enter a valid name!</p>
        )}
        <input type="text" id="name" ref={nameInput} />
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">Address</label>
        {!formInputsValidity.address && (
          <p style={{ color: "#ca3e51" }}>Enter a valid address!</p>
        )}
        <input type="text" id="address" ref={addressInput} />
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        {!formInputsValidity.city && (
          <p style={{ color: "#ca3e51" }}>Enter a valid City!</p>
        )}
        <input type="text" id="city" ref={cityInput} />
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor="phone">Phone</label>
        {!formInputsValidity.phone && (
          <p style={{ color: "#ca3e51" }}>Enter a valid Phone Number!</p>
        )}
        <input type="tel" id="phone" ref={phoneInput} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
