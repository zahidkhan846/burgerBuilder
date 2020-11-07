import React from "react";
import Button from "../../../UserInterface/Button/Button";

function OrderSummary(props) {
  const totalIngredients = Object.keys(props.ingredients).map((ingkey) => (
    <li key={ingkey}>
      <span style={{ textTransform: "capitalize" }}>{ingkey}: </span>
      {props.ingredients[ingkey]}
    </li>
  ));

  return (
    <div>
      <h3>Your Order</h3>
      <p>A delicious burger with the fallowing ingredients:</p>
      <ul>{totalIngredients}</ul>
      <p>
        Please! continue to checkout, your total order is of{" "}
        <strong>${props.price.toFixed(2)}</strong>
      </p>
      <Button onButtonClick={props.cancelOrder} buttonType={"Danger"}>
        Cancel
      </Button>
      <Button onButtonClick={props.continueOrder} buttonType={"Success"}>
        Continue
      </Button>
    </div>
  );
}

export default OrderSummary;
