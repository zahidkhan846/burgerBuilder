import React from "react";
import styles from "./Backdrop.module.css";

function Backdrop(props) {
  return props.show ? (
    <div onClick={props.closeBackdrop} className={styles.BackDrop}></div>
  ) : null;
}

export default Backdrop;
