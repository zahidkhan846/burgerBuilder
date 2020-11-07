import React from "react";
import Burger from "./../../Burger/Burger";
import Button from "../../../UserInterface/Button/Button";
import styles from "./CheckoutSummery.module.css";

const CheckoutSummery = (props) => {
  return (
    <div className={styles.CheckoutSummery}>
      <h1>Hope you like it!</h1>
      <div style={{ margin: "auto", width: "100%", height: "300px" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <div style={{ marginTop: "100px" }}>
        <Button onButtonClick={props.onCancel} buttonType="Danger">
          Cancel Order
        </Button>
        <Button onButtonClick={props.onBuy} buttonType="Success">
          Buy Order
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummery;
