import React from "react";
import styles from "./SideDrawer.module.css";

const SideDrawerMenu = (props) => {
  return (
    <div className={styles.Container} onClick={props.showSide}>
      <div className={styles.Bar1}></div>
      <div className={styles.Bar2}></div>
      <div className={styles.Bar3}></div>
    </div>
  );
};

export default SideDrawerMenu;
