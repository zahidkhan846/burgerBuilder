import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  let inputEl = null;
  const inputStyles = [styles.InputEl];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputStyles.push(styles.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputEl = (
        <input
          onChange={props.changeInput}
          className={inputStyles.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputEl = (
        <textare
          onChange={props.changeInput}
          className={inputStyles.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputEl = (
        <select onChange={props.changeInput} className={inputStyles.join(" ")}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
          value={props.value}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          onChange={props.changeInput}
          className={inputStyles.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputEl}
    </div>
  );
};

export default Input;
