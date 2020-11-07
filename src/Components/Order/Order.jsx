import React from "react";
import styles from "./Order.module.css";

const Order = (props) => {
  const ingredients = [];
  for (let eachIngredient in props.ingredients) {
    ingredients.push({
      ingName: eachIngredient,
      amount: props.ingredients[eachIngredient],
    });
  }
  const orderedIngredients = ingredients.map((ing, index) => {
    return (
      <span
        key={index}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ing.ingName}({ing.amount})
      </span>
    );
  });
  return (
    <div className={styles.Order}>
      <p>Ingredients: {orderedIngredients}</p>
      <p>
        Total Price:
        <strong>$ {Number.parseFloat(props.totalPrice).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
