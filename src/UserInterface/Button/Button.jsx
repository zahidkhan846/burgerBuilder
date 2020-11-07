import React from "react";
import styles from "./Button.module.css";

function Button(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onButtonClick}
      className={[styles.Button, styles[props.buttonType]].join(" ")}
    >
      {props.children}
    </button>
  );
}

export default Button;
