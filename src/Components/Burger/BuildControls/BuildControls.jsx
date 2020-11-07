import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <div className={styles.BulidControls}>
      <p style={{ color: "#f15510", fontSize: "20px" }}>
        Total Price : {props.price.toFixed(2)} USD
      </p>
      {controls.map((control) => {
        return (
          <BuildControl
            label={control.label}
            key={control.label}
            addIng={() => props.addIngredients(control.type)}
            remIng={() => props.removeIngredients(control.type)}
            disableBtn={props.disableBtn[control.type]}
            disableAddBtn={props.disableAddBtn[control.type]}
            price={props.price}
          />
        );
      })}
      <button
        onClick={props.onPurchase}
        disabled={!props.purchasable}
        className={styles.OrderButton}
      >
        {props.isAuth ? "Buy Now" : "Sign In"}
      </button>
    </div>
  );
};

export default buildControls;
