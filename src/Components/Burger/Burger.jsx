import React from "react";
import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <BurgerIngredient key={ingKey + i} type={ingKey} />;
      });
    })
    .reduce((oldArray, newArray) => {
      return oldArray.concat(newArray);
    }, []);
  // map object element within a state into array .map((ingKey) => {...}
  // map each element of an object (state) into an array so we can calculate their value .map((_, i) => {...}
  // transforms array within array into one array .reduce((oldArray, newArray) => {...}

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add some ingredients!</p>;
  }
  // console.log(transformedIngredients);
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
